package com.qds.rates.web.rest;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.qds.rates.domain.PersistentToken;
import com.qds.rates.domain.User;
import com.qds.rates.domain.enumeration.OtpAction;
import com.qds.rates.repository.PersistentTokenRepository;
import com.qds.rates.repository.UserRepository;
import com.qds.rates.security.SecurityUtils;
import com.qds.rates.service.CustomerService;
import com.qds.rates.service.MailService;
import com.qds.rates.service.OtpService;
import com.qds.rates.service.PasswordValidator;
import com.qds.rates.service.UserService;
import com.qds.rates.service.dto.BVNCheckResponse;
import com.qds.rates.service.dto.CustomerDTO;
import com.qds.rates.service.dto.OtpAndPasswordVM;
import com.qds.rates.service.dto.OtpDTO;
import com.qds.rates.service.dto.PasswordChangeDTO;
import com.qds.rates.service.dto.UserDTO;
import com.qds.rates.service.dto.UsernameEmailValidationRespDto;
import com.qds.rates.web.rest.converter.CustomerVMMapper;
import com.qds.rates.web.rest.errors.EmailAlreadyUsedException;
import com.qds.rates.web.rest.errors.InvalidPasswordException;
import com.qds.rates.web.rest.errors.LoginAlreadyUsedException;
import com.qds.rates.web.rest.vm.KeyAndPasswordVM;
import com.qds.rates.web.rest.vm.ManagedCustomerVM;
import com.qds.rates.web.rest.vm.ManagedUserVM;

/**
 * REST controller for managing the current user's account.
 */
@RestController
@RequestMapping("/api")
public class AccountResource {

    private static class AccountResourceException extends RuntimeException {
        private AccountResourceException(String message) {
            super(message);
        }
    }

    private final Logger log = LoggerFactory.getLogger(AccountResource.class);

    private final UserRepository userRepository;

    private final UserService userService;

    private final CustomerService customerService;

    private final MailService mailService;

    private final PersistentTokenRepository persistentTokenRepository;

    private final CustomerVMMapper customerVMMapper;

    private final OtpService otpService;


    public AccountResource(UserRepository userRepository, UserService userService, CustomerService customerService, MailService mailService, PersistentTokenRepository persistentTokenRepository, CustomerVMMapper customerVMMapper, OtpService otpService) {

        this.userRepository = userRepository;
        this.userService = userService;
        this.customerService = customerService;
        this.mailService = mailService;
        this.persistentTokenRepository = persistentTokenRepository;
        this.customerVMMapper = customerVMMapper;
        this.otpService = otpService;
    }

    /**
     * {@code POST  /register} : register the user.
     *
     * @param managedUserVM the managed user View Model.
     *
     * @throws InvalidPasswordException  {@code 400 (Bad Request)} if the password is incorrect.
     * @throws EmailAlreadyUsedException {@code 400 (Bad Request)} if the email is already used.
     * @throws LoginAlreadyUsedException {@code 400 (Bad Request)} if the login is already used.
     */
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void registerAccount(@Valid @RequestBody ManagedUserVM managedUserVM) {
        if (!PasswordValidator.validatePassword(managedUserVM.getPassword())) {
            throw new InvalidPasswordException();
        }
        User user = userService.registerUser(managedUserVM, managedUserVM.getPassword());
        otpService.sendGeneratedOtpCodeToUser(user, OtpAction.ACTIVATION);
    }


    /**
     * {@code POST  /register/customer} : register the user.
     *
     * @param managedCustomerVM the managed customer View Model.
     *
     * @throws InvalidPasswordException  {@code 400 (Bad Request)} if the password is incorrect.
     * @throws EmailAlreadyUsedException {@code 400 (Bad Request)} if the email is already used.
     * @throws LoginAlreadyUsedException {@code 400 (Bad Request)} if the login is already used.
     */
    @PostMapping("/register/customer")
    @ResponseStatus(HttpStatus.CREATED)
    @Transactional
    public void registerCustomer(@Valid @RequestBody ManagedCustomerVM managedCustomerVM) {
        if (!PasswordValidator.validatePassword(managedCustomerVM.getPassword())) {
            throw new InvalidPasswordException();
        }
        User user = userService.registerUser(managedCustomerVM, managedCustomerVM.getPassword());
        final CustomerDTO customerDTO = customerVMMapper.toDto(managedCustomerVM);
        customerService.registerCustomer(customerDTO, user);
    }

    /**
     * {@code POST  /register/customer/validation} : validate that user email or password has is unique.
     *
     * @param userDto the managed user View Model.
     *
     * @return UsernameEmailValidationRespDto;
     *
     * @throws EmailAlreadyUsedException {@code 400 (Bad Request)} if the email is already used.
     * @throws LoginAlreadyUsedException {@code 400 (Bad Request)} if the login is already used.
     */
    @PostMapping("/register/customer/validation")
    @ResponseStatus(HttpStatus.OK)
    @Transactional
    public UsernameEmailValidationRespDto checkEmailUsernameExists(@RequestBody UserDTO userDto) {
        if (userDto.getEmail()
                   .isEmpty()) {
            throw new IllegalArgumentException("Email should not be empty");
        }
        if (userDto.getLogin()
                   .isEmpty()) {
            throw new IllegalArgumentException("Username should not be empty");
        }
        return userService.checkUsernameEmailConflict(userDto.getLogin(), userDto.getEmail());
    }

    /**
     * {@code GET  /activate} : activate the registered user.
     *
     * @param key the activation key.
     *
     * @throws RuntimeException {@code 500 (Internal Server Error)} if the user couldn't be activated.
     */
    @GetMapping("/activate")
    public void activateAccount(@RequestParam(value = "key") String key) {
        Optional<User> user = userService.activateRegistration(key);
        if (!user.isPresent()) {
            throw new AccountResourceException("No user was found for this activation key");
        }
    }

    @PostMapping("/activate/otp")
    public ResponseEntity activateAccountWithOtp(@Valid @RequestBody OtpDTO otpDTO) {
        if (otpService.useOtp(otpDTO)) {
            Optional<User> user = userService.activateRegistrationWithEmail(otpDTO.getEmail());
            if (user.isPresent()) {
                return ResponseEntity.ok()
                                     .build();
            }
        }
        return ResponseEntity.badRequest()
                             .build();
    }

    /**
     * {@code GET  /authenticate} : check if the user is authenticated, and return its login.
     *
     * @param request the HTTP request.
     *
     * @return the login if the user is authenticated.
     */
    @GetMapping("/authenticate")
    public String isAuthenticated(HttpServletRequest request) {
        log.debug("REST request to check if the current user is authenticated");
        return request.getRemoteUser();
    }

    /**
     * {@code GET  /account} : get the current user.
     *
     * @return the current user.
     *
     * @throws RuntimeException {@code 500 (Internal Server Error)} if the user couldn't be returned.
     */
    @GetMapping("/account")
    public UserDTO getAccount() {
        return userService.getUserWithAuthorities()
                          .map(UserDTO::new)
                          .orElseThrow(() -> new AccountResourceException("User could not be found"));
    }

    @GetMapping("/account/customer")
    public CustomerDTO getCustomerAccount() {
        return customerService.getCurrentCustomer()
                              .orElseThrow(() -> new AccountResourceException("Customer could not be found"));
    }

    /**
     * {@code POST  /account} : update the current user information.
     *
     * @param userDTO the current user information.
     *
     * @throws EmailAlreadyUsedException {@code 400 (Bad Request)} if the email is already used.
     * @throws RuntimeException          {@code 500 (Internal Server Error)} if the user login wasn't found.
     */
    @PostMapping("/account")
    public void saveAccount(@Valid @RequestBody UserDTO userDTO) {
        String userLogin = SecurityUtils.getCurrentUserLogin()
                                        .orElseThrow(() -> new AccountResourceException("Current user login not found"));
        Optional<User> existingUser = userRepository.findOneByEmailIgnoreCase(userDTO.getEmail());
        if (existingUser.isPresent() && (!existingUser.get()
                                                      .getLogin()
                                                      .equalsIgnoreCase(userLogin))) {
            throw new EmailAlreadyUsedException();
        }
        Optional<User> user = userRepository.findOneByLogin(userLogin);
        if (!user.isPresent()) {
            throw new AccountResourceException("User could not be found");
        }
        userService.updateUser(userDTO.getFirstName(), userDTO.getLastName(), userDTO.getEmail(), userDTO.getLangKey(), userDTO.getImageUrl());
    }

    /**
     * {@code POST  /account/change-password} : changes the current user's password.
     *
     * @param passwordChangeDto current and new password.
     *
     * @throws InvalidPasswordException {@code 400 (Bad Request)} if the new password is incorrect.
     */
    @PostMapping(path = "/account/change-password")
    public void changePassword(@RequestBody PasswordChangeDTO passwordChangeDto) {
        if (!PasswordValidator.validatePassword(passwordChangeDto.getNewPassword())) {
            throw new InvalidPasswordException();
        }
        userService.changePassword(passwordChangeDto.getCurrentPassword(), passwordChangeDto.getNewPassword());
    }

    /**
     * {@code GET  /account/sessions} : get the current open sessions.
     *
     * @return the current open sessions.
     *
     * @throws RuntimeException {@code 500 (Internal Server Error)} if the current open sessions couldn't be retrieved.
     */
    @GetMapping("/account/sessions")
    public List<PersistentToken> getCurrentSessions() {
        return persistentTokenRepository.findByUser(userRepository.findOneByLogin(SecurityUtils.getCurrentUserLogin()
                                                                                               .orElseThrow(() -> new AccountResourceException("Current user login not found")))
                                                                  .orElseThrow(() -> new AccountResourceException("User could not be found")));
    }

    /**
     * {@code DELETE  /account/sessions?series={series}} : invalidate an existing session.
     * <p>
     * - You can only delete your own sessions, not any other user's session
     * - If you delete one of your existing sessions, and that you are currently logged in on that session, you will
     * still be able to use that session, until you quit your browser: it does not work in real time (there is
     * no API for that), it only removes the "remember me" cookie
     * - This is also true if you invalidate your current session: you will still be able to use it until you close
     * your browser or that the session times out. But automatic login (the "remember me" cookie) will not work
     * anymore.
     * There is an API to invalidate the current session, but there is no API to check which session uses which
     * cookie.
     *
     * @param series the series of an existing session.
     *
     * @throws UnsupportedEncodingException if the series couldn't be URL decoded.
     */
    @DeleteMapping("/account/sessions/{series}")
    public void invalidateSession(@PathVariable String series) throws UnsupportedEncodingException {
        String decodedSeries = URLDecoder.decode(series, "UTF-8");
        SecurityUtils.getCurrentUserLogin()
                     .flatMap(userRepository::findOneByLogin)
                     .ifPresent(u -> persistentTokenRepository.findByUser(u)
                                                              .stream()
                                                              .filter(persistentToken -> StringUtils.equals(persistentToken.getSeries(), decodedSeries))
                                                              .findAny()
                                                              .ifPresent(t -> persistentTokenRepository.deleteById(decodedSeries)));
    }

    /**
     * {@code POST   /account/reset-password/init} : Send an email to reset the password of the user.
     *
     * @param mail the mail of the user.
     */
    @PostMapping(path = "/account/reset-password/init")
    public void requestPasswordReset(@RequestBody String mail) {
        Optional<User> user = userService.requestPasswordReset(mail);
        if (user.isPresent()) {
            mailService.sendPasswordResetMail(user.get());
        } else {
            // Pretend the request has been successful to prevent checking which emails really exist
            // but log that an invalid attempt has been made
            log.warn("Password reset requested for non existing mail "+mail);
        }
    }

    @PostMapping(path = "/account/reset-password/otp/init")
    public void requestPasswordResetOtp(@RequestBody OtpDTO otpDTO) {
        Optional<User> user = userService.requestPasswordResetWithOtp(otpDTO);
        if (!user.isPresent()) {
            // Pretend the request has been successful to prevent checking which emails really exist
            // but log that an invalid attempt has been made
            log.warn("Password reset requested for non existing mail "+otpDTO.getEmail());
        }
    }

    /**
     * {@code POST   /account/reset-password/finish} : Finish to reset the password of the user.
     *
     * @param keyAndPassword the generated key and the new password.
     *
     * @throws InvalidPasswordException {@code 400 (Bad Request)} if the password is incorrect.
     * @throws RuntimeException         {@code 500 (Internal Server Error)} if the password could not be reset.
     */
    @PostMapping(path = "/account/reset-password/finish")
    public void finishPasswordReset(@RequestBody KeyAndPasswordVM keyAndPassword) {
        if (!PasswordValidator.validatePassword(keyAndPassword.getNewPassword())) {
            throw new InvalidPasswordException();
        }
        Optional<User> user = userService.completePasswordReset(keyAndPassword.getNewPassword(), keyAndPassword.getKey());

        if (!user.isPresent()) {
            throw new AccountResourceException("No user was found for this reset key");
        }
    }

    @PostMapping(path = "/account/reset-password/otp/finish")
    public void finishPasswordResetWithOtp(@RequestBody OtpAndPasswordVM otpAndPasswordVM) {
        if (!PasswordValidator.validatePassword(otpAndPasswordVM.getNewPassword())) {
            throw new InvalidPasswordException();
        }

        if(!otpService.useOtp(otpAndPasswordVM)){
            throw new AccountResourceException("There is a mismatch");
        }

        Optional<User> user =
            userService.completePasswordResetWithEmail(otpAndPasswordVM.getNewPassword(), otpAndPasswordVM.getEmail());

        if (!user.isPresent()) {
            log.warn("No user was found for this email: "+otpAndPasswordVM.getEmail());
        }
    }

    @GetMapping("/account/bvn/{bvn}/validate")
    public ResponseEntity<BVNCheckResponse> checkBVNExists(@PathVariable("bvn") String bvn){
        return ResponseEntity.ok(customerService.checkBvnExists(bvn));
    }
}
