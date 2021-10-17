package com.qds.rates.web.rest;

import static com.qds.rates.web.rest.AccountResourceIT.TEST_USER_LOGIN;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Collections;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.apache.commons.lang3.RandomStringUtils;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import com.qds.rates.RatesApp;
import com.qds.rates.config.Constants;
import com.qds.rates.domain.Customer;
import com.qds.rates.domain.Otp;
import com.qds.rates.domain.PersistentToken;
import com.qds.rates.domain.User;
import com.qds.rates.domain.enumeration.OtpAction;
import com.qds.rates.repository.AuthorityRepository;
import com.qds.rates.repository.CustomerRepository;
import com.qds.rates.repository.OtpRepository;
import com.qds.rates.repository.PersistentTokenRepository;
import com.qds.rates.repository.UserRepository;
import com.qds.rates.security.AuthoritiesConstants;
import com.qds.rates.service.CustomerService;
import com.qds.rates.service.UserService;
import com.qds.rates.service.dto.CustomerDTO;
import com.qds.rates.service.dto.LocationDTO;
import com.qds.rates.service.dto.OtpAndPasswordVM;
import com.qds.rates.service.dto.OtpDTO;
import com.qds.rates.service.dto.PasswordChangeDTO;
import com.qds.rates.service.dto.UserDTO;
import com.qds.rates.service.dto.builders.CustomerDTOBuilder;
import com.qds.rates.service.dto.builders.ManagedCustomerVMBuilder;
import com.qds.rates.service.mapper.LocationMapper;
import com.qds.rates.service.mapper.OtpMapper;
import com.qds.rates.web.rest.vm.KeyAndPasswordVM;
import com.qds.rates.web.rest.vm.ManagedCustomerVM;
import com.qds.rates.web.rest.vm.ManagedUserVM;

/**
 * Integration tests for the {@link AccountResource} REST controller.
 */
@AutoConfigureMockMvc
@WithMockUser(value = TEST_USER_LOGIN)
@SpringBootTest(classes = RatesApp.class)
public class AccountResourceIT {
    static final String TEST_USER_LOGIN = "test";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private AuthorityRepository authorityRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private PersistentTokenRepository persistentTokenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private OtpRepository otpRepository;

    @Autowired
    private OtpMapper otpMapper;

    @Autowired
    private MockMvc restAccountMockMvc;

    @Autowired
    private LocationMapper locationMapper;

    @Autowired
    private EntityManager em;

    @Test
    @WithUnauthenticatedMockUser
    public void testNonAuthenticatedUser() throws Exception {
        restAccountMockMvc.perform(get("/api/authenticate").accept(MediaType.APPLICATION_JSON))
                          .andExpect(status().isOk())
                          .andExpect(content().string(""));
    }

    @Test
    public void testAuthenticatedUser() throws Exception {
        restAccountMockMvc.perform(get("/api/authenticate").with(request -> {
            request.setRemoteUser(TEST_USER_LOGIN);
            return request;
        })
                                                           .accept(MediaType.APPLICATION_JSON))
                          .andExpect(status().isOk())
                          .andExpect(content().string(TEST_USER_LOGIN));
    }

    @Test
    public void testGetExistingAccount() throws Exception {
        Set<String> authorities = new HashSet<>();
        authorities.add(AuthoritiesConstants.ADMIN);

        UserDTO user = new UserDTO();
        user.setLogin(TEST_USER_LOGIN);
        user.setFirstName("john");
        user.setLastName("doe");
        user.setEmail("john.doe@jhipster.com");
        user.setImageUrl("http://placehold.it/50x50");
        user.setLangKey("en");
        user.setAuthorities(authorities);
        userService.createUser(user);

        restAccountMockMvc.perform(get("/api/account").accept(MediaType.APPLICATION_JSON))
                          .andExpect(status().isOk())
                          .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
                          .andExpect(jsonPath("$.login").value(TEST_USER_LOGIN))
                          .andExpect(jsonPath("$.firstName").value("john"))
                          .andExpect(jsonPath("$.lastName").value("doe"))
                          .andExpect(jsonPath("$.email").value("john.doe@jhipster.com"))
                          .andExpect(jsonPath("$.imageUrl").value("http://placehold.it/50x50"))
                          .andExpect(jsonPath("$.langKey").value("en"))
                          .andExpect(jsonPath("$.authorities").value(AuthoritiesConstants.ADMIN));
    }

    @Test
    @WithMockUser(value = "customer1")
    @Transactional
    public void testGetExistingCustomerAccount() throws Exception {
        LocationDTO location = locationMapper.toDto(LocationResourceIT.createEntity(em));
        CustomerDTO customer = CustomerDTOBuilder.builder(userService, "customer1")
                                                 .withLocation(location)
                                                 .withEmail("test@temi.com")
                                                 .withBvn("12312389090")
                                                 .build();

        customerService.registerCustomer(customer);

        restAccountMockMvc.perform(get("/api/account/customer").accept(MediaType.APPLICATION_JSON))
                          .andExpect(status().isOk())
                          .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
                          .andExpect(jsonPath("$.[*].login").value("customer1"))
                          .andExpect(jsonPath("$.[*].firstName").value("john"))
                          .andExpect(jsonPath("$.[*].lastName").value("doe"))
                          .andExpect(jsonPath("$.[*].email").value("test@temi.com"))
                          .andExpect(jsonPath("$.[*].imageUrl").value("http://placehold.it/50x50"))
                          .andExpect(jsonPath("$.[*].langKey").value("en"))
                          .andExpect(jsonPath("$.bvn").value(customer.getBvn()))
                          .andExpect(jsonPath("$.mobile").value(customer.getMobile()))
                          .andExpect(jsonPath("$.walletId").exists());
    }

    @Test
    public void testGetUnknownAccount() throws Exception {
        restAccountMockMvc.perform(get("/api/account").accept(MediaType.APPLICATION_PROBLEM_JSON))
                          .andExpect(status().isInternalServerError());
    }

    @Test
    @Transactional
    @WithAnonymousUser
    public void shouldReturnOkWhenUsernameAndEmailDoesntExist() throws Exception {
        UserDTO userDTO = new UserDTO();
        userDTO.setEmail("no-conflict@example.com");
        userDTO.setLogin("no-conflict");

        restAccountMockMvc.perform(post("/api/register/customer/validation").contentType(MediaType.APPLICATION_JSON)
                                                                            .content(TestUtil.convertObjectToJsonBytes(userDTO))
                                                                            .with(csrf()))
                          .andExpect(status().isOk());
    }

    @Test
    @Transactional
    @WithAnonymousUser
    public void shouldReturnBadRequestWhenEmailEmpty() throws Exception {

        UserDTO userDTO = new UserDTO();
        userDTO.setEmail("");
        userDTO.setLogin("conflictName");

        restAccountMockMvc.perform(post("/api/register/customer/validation").contentType(MediaType.APPLICATION_JSON)
                                                                            .content(TestUtil.convertObjectToJsonBytes(userDTO))
                                                                            .with(csrf()))
                          .andExpect(status().isInternalServerError());
    }

    @Test
    @Transactional
    @WithAnonymousUser
    public void shouldReturnBadRequestWhenUsernameEmpty() throws Exception {

        UserDTO userDTO = new UserDTO();
        userDTO.setEmail("email@email.com");
        userDTO.setLogin("");

        restAccountMockMvc.perform(post("/api/register/customer/validation").contentType(MediaType.APPLICATION_JSON)
                                                                            .content(TestUtil.convertObjectToJsonBytes(userDTO))
                                                                            .with(csrf()))
                          .andExpect(status().isInternalServerError());
    }

    @Test
    @WithMockUser(authorities = AuthoritiesConstants.ADMIN)
    @Transactional
    public void testRegisterValid() throws Exception {
        ManagedUserVM validUser = new ManagedUserVM();
        validUser.setLogin("test-register-valid");
        validUser.setPassword("@1Apassword");
        validUser.setFirstName("Alice");
        validUser.setLastName("Test");
        validUser.setEmail("test-register-valid@example.com");
        validUser.setImageUrl("http://placehold.it/50x50");
        validUser.setLangKey(Constants.DEFAULT_LANGUAGE);
        validUser.setAuthorities(Collections.singleton(AuthoritiesConstants.USER));
        assertThat(userRepository.findOneByLogin("test-register-valid")
                                 .isPresent()).isFalse();

        restAccountMockMvc.perform(post("/api/register").contentType(MediaType.APPLICATION_JSON)
                                                        .content(TestUtil.convertObjectToJsonBytes(validUser))
                                                        .with(csrf()))
                          .andExpect(status().isCreated());

        assertThat(userRepository.findOneByLogin("test-register-valid")
                                 .isPresent()).isTrue();
    }

    @Test
    @WithMockUser(authorities = AuthoritiesConstants.ADMIN)
    @Transactional
    public void Register_ShouldExpectBadRequest_WhenInvalidPasswordIsPassed() throws Exception {
        ManagedUserVM validUser = new ManagedUserVM();
        validUser.setLogin("test-register-valid");
        validUser.setPassword("@1password");
        validUser.setFirstName("Alice");
        validUser.setLastName("Test");
        validUser.setEmail("test-register-valid@example.com");
        validUser.setImageUrl("http://placehold.it/50x50");
        validUser.setLangKey(Constants.DEFAULT_LANGUAGE);
        validUser.setAuthorities(Collections.singleton(AuthoritiesConstants.USER));
        assertThat(userRepository.findOneByLogin("test-register-valid")
                                 .isPresent()).isFalse();

        restAccountMockMvc.perform(post("/api/register").contentType(MediaType.APPLICATION_JSON)
                                                        .content(TestUtil.convertObjectToJsonBytes(validUser))
                                                        .with(csrf()))
                          .andExpect(status().isBadRequest());
    }

    @Test
    @Transactional
    public void registerValidCustomerShouldCreateCustomerWithRole() throws Exception {
        LocationDTO location = locationMapper.toDto(LocationResourceIT.createEntity(em));
        ManagedCustomerVM validUser = ManagedCustomerVMBuilder.builder("test-register-valid")
                                                              .withBvn("12312389091")
                                                              .withEmail("test@denzel.com")
                                                              .withLocation(location)
                                                              .build();
        assertThat(userRepository.findOneByLogin("test-register-valid")
                                 .isPresent()).isFalse();

        restAccountMockMvc.perform(post("/api/register/customer").contentType(MediaType.APPLICATION_JSON)
                                                                 .content(TestUtil.convertObjectToJsonBytes(validUser))
                                                                 .with(csrf()))
                          .andExpect(status().isCreated());

        final Optional<Customer> result = customerRepository.findOneByUserLogin("test-register-valid");
        assertThat(result.isPresent()).isTrue();
        assertThat(result.get()
                         .getUser()
                         .getAuthorities()).extracting("name")
                                           .containsOnly(AuthoritiesConstants.USER, AuthoritiesConstants.CUSTOMER);
        assertThat(result.get().getEmploymentDetails()).isNotNull();
        assertThat(result.get().getEmploymentDetails().getLocalGovt()).isNotNull();
    }

    @Test
    @Transactional
    public void registerValidCustomer_ShouldExpectBadRequest_WhenInvalidPasswordIsPassed() throws Exception {
        LocationDTO location = locationMapper.toDto(LocationResourceIT.createEntity(em));
        ManagedCustomerVM validUser = ManagedCustomerVMBuilder.builder("test-register-valid")
                                                              .withBvn("12312389091")
                                                              .withEmail("test@denzel.com")
                                                              .withLocation(location)
                                                              .build();
        validUser.setPassword("denzel56");
        assertThat(userRepository.findOneByLogin("test-register-valid")
                                 .isPresent()).isFalse();

        restAccountMockMvc.perform(post("/api/register/customer").contentType(MediaType.APPLICATION_JSON)
                                                                 .content(TestUtil.convertObjectToJsonBytes(validUser))
                                                                 .with(csrf()))
                          .andExpect(status().isBadRequest());
    }

    @Test
    @Transactional
    @WithMockUser(authorities = AuthoritiesConstants.ADMIN)
    public void testRegisterInvalidLogin() throws Exception {
        ManagedUserVM invalidUser = new ManagedUserVM();
        invalidUser.setLogin("funky-log(n");// <-- invalid
        invalidUser.setPassword("password");
        invalidUser.setFirstName("Funky");
        invalidUser.setLastName("One");
        invalidUser.setEmail("funky@example.com");
        invalidUser.setActivated(true);
        invalidUser.setImageUrl("http://placehold.it/50x50");
        invalidUser.setLangKey(Constants.DEFAULT_LANGUAGE);
        invalidUser.setAuthorities(Collections.singleton(AuthoritiesConstants.USER));

        restAccountMockMvc.perform(post("/api/register").contentType(MediaType.APPLICATION_JSON)
                                                        .content(TestUtil.convertObjectToJsonBytes(invalidUser))
                                                        .with(csrf()))
                          .andExpect(status().isBadRequest());

        Optional<User> user = userRepository.findOneByEmailIgnoreCase("funky@example.com");
        assertThat(user.isPresent()).isFalse();
    }

    @Test
    @Transactional
    public void registerCustomerWithInvalidLoginShouldNotSaveCustomer() throws Exception {
        ManagedUserVM invalidUser = new ManagedUserVM();
        invalidUser.setLogin("funky-log(n");// <-- invalid
        invalidUser.setPassword("password");
        invalidUser.setFirstName("Funky");
        invalidUser.setLastName("One");
        invalidUser.setEmail("funky@example.com");
        invalidUser.setActivated(true);
        invalidUser.setImageUrl("http://placehold.it/50x50");
        invalidUser.setLangKey(Constants.DEFAULT_LANGUAGE);
        invalidUser.setAuthorities(Collections.singleton(AuthoritiesConstants.USER));

        restAccountMockMvc.perform(post("/api/register/customer").contentType(MediaType.APPLICATION_JSON)
                                                                 .content(TestUtil.convertObjectToJsonBytes(invalidUser))
                                                                 .with(csrf()))
                          .andExpect(status().isBadRequest());

        Optional<User> user = userRepository.findOneByEmailIgnoreCase("funky@example.com");
        assertThat(user.isPresent()).isFalse();
    }

    @Test
    @Transactional
    public void registerCustomerWithIncompleteDetailsShouldNotSaveCustomer() throws Exception {
        ManagedUserVM validUser = new ManagedUserVM();
        validUser.setLogin("test-register-valid");
        validUser.setPassword("password");
        validUser.setFirstName("Alice");
        validUser.setLastName("Test");
        validUser.setEmail("test-register-valid@example.com");
        validUser.setImageUrl("http://placehold.it/50x50");
        validUser.setLangKey(Constants.DEFAULT_LANGUAGE);
        validUser.setAuthorities(Collections.singleton(AuthoritiesConstants.USER));
        assertThat(userRepository.findOneByLogin("test-register-valid")
                                 .isPresent()).isFalse();

        restAccountMockMvc.perform(post("/api/register/customer").contentType(MediaType.APPLICATION_JSON)
                                                                 .content(TestUtil.convertObjectToJsonBytes(validUser))
                                                                 .with(csrf()))
                          .andExpect(status().isBadRequest());

        assertThat(userRepository.findOneByLogin("test-register-valid")
                                 .isPresent()).isFalse();
    }

    @Test
    @Transactional
    @WithMockUser(authorities = AuthoritiesConstants.ADMIN)
    public void testRegisterInvalidEmail() throws Exception {
        ManagedUserVM invalidUser = new ManagedUserVM();
        invalidUser.setLogin("bob");
        invalidUser.setPassword("password");
        invalidUser.setFirstName("Bob");
        invalidUser.setLastName("Green");
        invalidUser.setEmail("invalid");// <-- invalid
        invalidUser.setActivated(true);
        invalidUser.setImageUrl("http://placehold.it/50x50");
        invalidUser.setLangKey(Constants.DEFAULT_LANGUAGE);
        invalidUser.setAuthorities(Collections.singleton(AuthoritiesConstants.USER));

        restAccountMockMvc.perform(post("/api/register").contentType(MediaType.APPLICATION_JSON)
                                                        .content(TestUtil.convertObjectToJsonBytes(invalidUser))
                                                        .with(csrf()))
                          .andExpect(status().isBadRequest());

        Optional<User> user = userRepository.findOneByLogin("bob");
        assertThat(user.isPresent()).isFalse();
    }

    @Test
    @Transactional
    @WithMockUser(authorities = AuthoritiesConstants.ADMIN)
    public void testRegisterInvalidPassword() throws Exception {
        ManagedUserVM invalidUser = new ManagedUserVM();
        invalidUser.setLogin("bob");
        invalidUser.setPassword("123");// password with only 3 digits
        invalidUser.setFirstName("Bob");
        invalidUser.setLastName("Green");
        invalidUser.setEmail("bob@example.com");
        invalidUser.setActivated(true);
        invalidUser.setImageUrl("http://placehold.it/50x50");
        invalidUser.setLangKey(Constants.DEFAULT_LANGUAGE);
        invalidUser.setAuthorities(Collections.singleton(AuthoritiesConstants.USER));

        restAccountMockMvc.perform(post("/api/register").contentType(MediaType.APPLICATION_JSON)
                                                        .content(TestUtil.convertObjectToJsonBytes(invalidUser))
                                                        .with(csrf()))
                          .andExpect(status().isBadRequest());

        Optional<User> user = userRepository.findOneByLogin("bob");
        assertThat(user.isPresent()).isFalse();
    }

    @Test
    @Transactional
    @WithMockUser(authorities = AuthoritiesConstants.ADMIN)
    public void testRegisterNullPassword() throws Exception {
        ManagedUserVM invalidUser = new ManagedUserVM();
        invalidUser.setLogin("bob");
        invalidUser.setPassword(null);// invalid null password
        invalidUser.setFirstName("Bob");
        invalidUser.setLastName("Green");
        invalidUser.setEmail("bob@example.com");
        invalidUser.setActivated(true);
        invalidUser.setImageUrl("http://placehold.it/50x50");
        invalidUser.setLangKey(Constants.DEFAULT_LANGUAGE);
        invalidUser.setAuthorities(Collections.singleton(AuthoritiesConstants.USER));

        restAccountMockMvc.perform(post("/api/register").contentType(MediaType.APPLICATION_JSON)
                                                        .content(TestUtil.convertObjectToJsonBytes(invalidUser))
                                                        .with(csrf()))
                          .andExpect(status().isBadRequest());

        Optional<User> user = userRepository.findOneByLogin("bob");
        assertThat(user.isPresent()).isFalse();
    }

    @Test
    @Transactional
    @WithMockUser(authorities = AuthoritiesConstants.ADMIN)
    public void testRegisterDuplicateLogin() throws Exception {
        // First registration
        ManagedUserVM firstUser = new ManagedUserVM();
        firstUser.setLogin("alice");
        firstUser.setPassword("@1Apassword");
        firstUser.setFirstName("Alice");
        firstUser.setLastName("Something");
        firstUser.setEmail("alice@example.com");
        firstUser.setImageUrl("http://placehold.it/50x50");
        firstUser.setLangKey(Constants.DEFAULT_LANGUAGE);
        firstUser.setAuthorities(Collections.singleton(AuthoritiesConstants.USER));

        // Duplicate login, different email
        ManagedUserVM secondUser = new ManagedUserVM();
        secondUser.setLogin(firstUser.getLogin());
        secondUser.setPassword(firstUser.getPassword());
        secondUser.setFirstName(firstUser.getFirstName());
        secondUser.setLastName(firstUser.getLastName());
        secondUser.setEmail("alice2@example.com");
        secondUser.setImageUrl(firstUser.getImageUrl());
        secondUser.setLangKey(firstUser.getLangKey());
        secondUser.setCreatedBy(firstUser.getCreatedBy());
        secondUser.setCreatedDate(firstUser.getCreatedDate());
        secondUser.setLastModifiedBy(firstUser.getLastModifiedBy());
        secondUser.setLastModifiedDate(firstUser.getLastModifiedDate());
        secondUser.setAuthorities(new HashSet<>(firstUser.getAuthorities()));

        // First user
        restAccountMockMvc.perform(post("/api/register").contentType(MediaType.APPLICATION_JSON)
                                                        .content(TestUtil.convertObjectToJsonBytes(firstUser))
                                                        .with(csrf()))
                          .andExpect(status().isCreated());

        // Second (non activated) user
        restAccountMockMvc.perform(post("/api/register").contentType(MediaType.APPLICATION_JSON)
                                                        .content(TestUtil.convertObjectToJsonBytes(secondUser))
                                                        .with(csrf()))
                          .andExpect(status().isBadRequest());

        Optional<User> testUser2 = userRepository.findOneByEmailIgnoreCase("alice2@example.com");
        assertThat(testUser2.isPresent()).isFalse();

        Optional<User> testUser = userRepository.findOneByEmailIgnoreCase("alice@example.com");
        assertThat(testUser.isPresent()).isTrue();
        testUser.get()
                .setActivated(true);
        userRepository.save(testUser.get());

        // First (already activated) user
        restAccountMockMvc.perform(post("/api/register").contentType(MediaType.APPLICATION_JSON)
                                                        .content(TestUtil.convertObjectToJsonBytes(secondUser))
                                                        .with(csrf()))
                          .andExpect(status().is4xxClientError());
    }

    @Test
    @Transactional
    @WithMockUser(authorities = AuthoritiesConstants.ADMIN)
    public void testRegisterDuplicateEmail() throws Exception {
        // First user
        ManagedUserVM firstUser = new ManagedUserVM();
        firstUser.setLogin("test-register-duplicate-email");
        firstUser.setPassword("@1Apassword");
        firstUser.setFirstName("Alice");
        firstUser.setLastName("Test");
        firstUser.setEmail("test-register-duplicate-email@example.com");
        firstUser.setImageUrl("http://placehold.it/50x50");
        firstUser.setLangKey(Constants.DEFAULT_LANGUAGE);
        firstUser.setAuthorities(Collections.singleton(AuthoritiesConstants.USER));

        // Register first user
        restAccountMockMvc.perform(post("/api/register").contentType(MediaType.APPLICATION_JSON)
                                                        .content(TestUtil.convertObjectToJsonBytes(firstUser))
                                                        .with(csrf()))
                          .andExpect(status().isCreated());

        Optional<User> testUser1 = userRepository.findOneByLogin("test-register-duplicate-email");
        assertThat(testUser1.isPresent()).isTrue();

        // Duplicate email, different login
        ManagedUserVM secondUser = new ManagedUserVM();
        secondUser.setLogin("test-register-duplicate-email-2");
        secondUser.setPassword(firstUser.getPassword());
        secondUser.setFirstName(firstUser.getFirstName());
        secondUser.setLastName(firstUser.getLastName());
        secondUser.setEmail(firstUser.getEmail());
        secondUser.setImageUrl(firstUser.getImageUrl());
        secondUser.setLangKey(firstUser.getLangKey());
        secondUser.setAuthorities(new HashSet<>(firstUser.getAuthorities()));

        // Register second (non activated) user
        restAccountMockMvc.perform(post("/api/register").contentType(MediaType.APPLICATION_JSON)
                                                        .content(TestUtil.convertObjectToJsonBytes(secondUser))
                                                        .with(csrf()))
                          .andExpect(status().isBadRequest());

        Optional<User> testUser2 = userRepository.findOneByLogin("test-register-duplicate-email");
        assertThat(testUser2.isPresent()).isTrue();

        Optional<User> testUser3 = userRepository.findOneByLogin("test-register-duplicate-email-2");
        assertThat(testUser3.isPresent()).isFalse();

        // Duplicate email - with uppercase email address
        ManagedUserVM userWithUpperCaseEmail = new ManagedUserVM();
        userWithUpperCaseEmail.setId(firstUser.getId());
        userWithUpperCaseEmail.setLogin("test-register-duplicate-email-3");
        userWithUpperCaseEmail.setPassword(firstUser.getPassword());
        userWithUpperCaseEmail.setFirstName(firstUser.getFirstName());
        userWithUpperCaseEmail.setLastName(firstUser.getLastName());
        userWithUpperCaseEmail.setEmail("TEST-register-duplicate-email@example.com");
        userWithUpperCaseEmail.setImageUrl(firstUser.getImageUrl());
        userWithUpperCaseEmail.setLangKey(firstUser.getLangKey());
        userWithUpperCaseEmail.setAuthorities(new HashSet<>(firstUser.getAuthorities()));

        // Register third (not activated) user
        restAccountMockMvc.perform(post("/api/register").contentType(MediaType.APPLICATION_JSON)
                                                        .content(TestUtil.convertObjectToJsonBytes(userWithUpperCaseEmail))
                                                        .with(csrf()))
                          .andExpect(status().isBadRequest());

        Optional<User> testUser4 = userRepository.findOneByLogin("test-register-duplicate-email-3");
        assertThat(testUser4.isPresent()).isFalse();

        testUser1.get()
                 .setActivated(true);
        userService.updateUser((new UserDTO(testUser1.get())));

        // Register 2nd user again. After 1st user activated
        restAccountMockMvc.perform(post("/api/register").contentType(MediaType.APPLICATION_JSON)
                                                        .content(TestUtil.convertObjectToJsonBytes(secondUser))
                                                        .with(csrf()))
                          .andExpect(status().is4xxClientError());
    }

    @Test
    @Transactional
    @WithMockUser(authorities = AuthoritiesConstants.ADMIN)
    public void testRegisterAdminIsIgnored() throws Exception {
        ManagedUserVM validUser = new ManagedUserVM();
        validUser.setLogin("badguy");
        validUser.setPassword("@A1password");
        validUser.setFirstName("Bad");
        validUser.setLastName("Guy");
        validUser.setEmail("badguy@example.com");
        validUser.setActivated(true);
        validUser.setImageUrl("http://placehold.it/50x50");
        validUser.setLangKey(Constants.DEFAULT_LANGUAGE);
        validUser.setAuthorities(Collections.singleton(AuthoritiesConstants.ADMIN));

        restAccountMockMvc.perform(post("/api/register").contentType(MediaType.APPLICATION_JSON)
                                                        .content(TestUtil.convertObjectToJsonBytes(validUser))
                                                        .with(csrf()))
                          .andExpect(status().isCreated());

        Optional<User> userDup = userRepository.findOneWithAuthoritiesByLogin("badguy");
        assertThat(userDup.isPresent()).isTrue();
        assertThat(userDup.get()
                          .getAuthorities()).hasSize(1)
                                            .containsExactly(authorityRepository.findById(AuthoritiesConstants.USER)
                                                                                .get());
    }

    @Test
    @Transactional
    public void testActivateAccount() throws Exception {
        final String activationKey = "some activation key";
        User user = new User();
        user.setLogin("activate-account");
        user.setEmail("activate-account@example.com");
        user.setPassword(RandomStringUtils.random(60));
        user.setActivated(false);
        user.setActivationKey(activationKey);

        userRepository.saveAndFlush(user);

        restAccountMockMvc.perform(get("/api/activate?key={activationKey}", activationKey))
                          .andExpect(status().isOk());

        user = userRepository.findOneByLogin(user.getLogin())
                             .orElse(null);
        assertThat(user.getActivated()).isTrue();
    }

    @Test
    @Transactional
    public void testActivateAccountWithWrongKey() throws Exception {
        restAccountMockMvc.perform(get("/api/activate?key=wrongActivationKey"))
                          .andExpect(status().isInternalServerError());
    }

    @Test
    @Transactional
    @WithMockUser("save-account")
    public void testSaveAccount() throws Exception {
        User user = new User();
        user.setLogin("save-account");
        user.setEmail("save-account@example.com");
        user.setPassword(RandomStringUtils.random(60));
        user.setActivated(true);
        userRepository.saveAndFlush(user);

        UserDTO userDTO = new UserDTO();
        userDTO.setLogin("not-used");
        userDTO.setFirstName("firstname");
        userDTO.setLastName("lastname");
        userDTO.setEmail("save-account@example.com");
        userDTO.setActivated(false);
        userDTO.setImageUrl("http://placehold.it/50x50");
        userDTO.setLangKey(Constants.DEFAULT_LANGUAGE);
        userDTO.setAuthorities(Collections.singleton(AuthoritiesConstants.ADMIN));

        restAccountMockMvc.perform(post("/api/account").contentType(MediaType.APPLICATION_JSON)
                                                       .content(TestUtil.convertObjectToJsonBytes(userDTO))
                                                       .with(csrf()))
                          .andExpect(status().isOk());

        User updatedUser = userRepository.findOneWithAuthoritiesByLogin(user.getLogin())
                                         .orElse(null);
        assertThat(updatedUser.getFirstName()).isEqualTo(userDTO.getFirstName());
        assertThat(updatedUser.getLastName()).isEqualTo(userDTO.getLastName());
        assertThat(updatedUser.getEmail()).isEqualTo(userDTO.getEmail());
        assertThat(updatedUser.getLangKey()).isEqualTo(userDTO.getLangKey());
        assertThat(updatedUser.getPassword()).isEqualTo(user.getPassword());
        assertThat(updatedUser.getImageUrl()).isEqualTo(userDTO.getImageUrl());
        assertThat(updatedUser.getActivated()).isEqualTo(true);
        assertThat(updatedUser.getAuthorities()).isEmpty();
    }

    @Test
    @Transactional
    @WithMockUser("save-invalid-email")
    public void testSaveInvalidEmail() throws Exception {
        User user = new User();
        user.setLogin("save-invalid-email");
        user.setEmail("save-invalid-email@example.com");
        user.setPassword(RandomStringUtils.random(60));
        user.setActivated(true);

        userRepository.saveAndFlush(user);

        UserDTO userDTO = new UserDTO();
        userDTO.setLogin("not-used");
        userDTO.setFirstName("firstname");
        userDTO.setLastName("lastname");
        userDTO.setEmail("invalid email");
        userDTO.setActivated(false);
        userDTO.setImageUrl("http://placehold.it/50x50");
        userDTO.setLangKey(Constants.DEFAULT_LANGUAGE);
        userDTO.setAuthorities(Collections.singleton(AuthoritiesConstants.ADMIN));

        restAccountMockMvc.perform(post("/api/account").contentType(MediaType.APPLICATION_JSON)
                                                       .content(TestUtil.convertObjectToJsonBytes(userDTO))
                                                       .with(csrf()))
                          .andExpect(status().isBadRequest());

        assertThat(userRepository.findOneByEmailIgnoreCase("invalid email")).isNotPresent();
    }

    @Test
    @Transactional
    @WithMockUser("save-existing-email")
    public void testSaveExistingEmail() throws Exception {
        User user = new User();
        user.setLogin("save-existing-email");
        user.setEmail("save-existing-email@example.com");
        user.setPassword(RandomStringUtils.random(60));
        user.setActivated(true);
        userRepository.saveAndFlush(user);

        User anotherUser = new User();
        anotherUser.setLogin("save-existing-email2");
        anotherUser.setEmail("save-existing-email2@example.com");
        anotherUser.setPassword(RandomStringUtils.random(60));
        anotherUser.setActivated(true);

        userRepository.saveAndFlush(anotherUser);

        UserDTO userDTO = new UserDTO();
        userDTO.setLogin("not-used");
        userDTO.setFirstName("firstname");
        userDTO.setLastName("lastname");
        userDTO.setEmail("save-existing-email2@example.com");
        userDTO.setActivated(false);
        userDTO.setImageUrl("http://placehold.it/50x50");
        userDTO.setLangKey(Constants.DEFAULT_LANGUAGE);
        userDTO.setAuthorities(Collections.singleton(AuthoritiesConstants.ADMIN));

        restAccountMockMvc.perform(post("/api/account").contentType(MediaType.APPLICATION_JSON)
                                                       .content(TestUtil.convertObjectToJsonBytes(userDTO))
                                                       .with(csrf()))
                          .andExpect(status().isBadRequest());

        User updatedUser = userRepository.findOneByLogin("save-existing-email")
                                         .orElse(null);
        assertThat(updatedUser.getEmail()).isEqualTo("save-existing-email@example.com");
    }

    @Test
    @Transactional
    @WithMockUser("save-existing-email-and-login")
    public void testSaveExistingEmailAndLogin() throws Exception {
        User user = new User();
        user.setLogin("save-existing-email-and-login");
        user.setEmail("save-existing-email-and-login@example.com");
        user.setPassword(RandomStringUtils.random(60));
        user.setActivated(true);
        userRepository.saveAndFlush(user);

        UserDTO userDTO = new UserDTO();
        userDTO.setLogin("not-used");
        userDTO.setFirstName("firstname");
        userDTO.setLastName("lastname");
        userDTO.setEmail("save-existing-email-and-login@example.com");
        userDTO.setActivated(false);
        userDTO.setImageUrl("http://placehold.it/50x50");
        userDTO.setLangKey(Constants.DEFAULT_LANGUAGE);
        userDTO.setAuthorities(Collections.singleton(AuthoritiesConstants.ADMIN));

        restAccountMockMvc.perform(post("/api/account").contentType(MediaType.APPLICATION_JSON)
                                                       .content(TestUtil.convertObjectToJsonBytes(userDTO))
                                                       .with(csrf()))
                          .andExpect(status().isOk());

        User updatedUser = userRepository.findOneByLogin("save-existing-email-and-login")
                                         .orElse(null);
        assertThat(updatedUser.getEmail()).isEqualTo("save-existing-email-and-login@example.com");
    }

    @Test
    @Transactional
    @WithMockUser("change-password-wrong-existing-password")
    public void testChangePasswordWrongExistingPassword() throws Exception {
        User user = new User();
        String currentPassword = RandomStringUtils.random(60);
        user.setPassword(passwordEncoder.encode(currentPassword));
        user.setLogin("change-password-wrong-existing-password");
        user.setEmail("change-password-wrong-existing-password@example.com");
        userRepository.saveAndFlush(user);

        restAccountMockMvc.perform(post("/api/account/change-password").contentType(MediaType.APPLICATION_JSON)
                                                                       .content(TestUtil.convertObjectToJsonBytes(new PasswordChangeDTO("1" + currentPassword, "new password")))
                                                                       .with(csrf()))
                          .andExpect(status().isBadRequest());

        User updatedUser = userRepository.findOneByLogin("change-password-wrong-existing-password")
                                         .orElse(null);
        assertThat(passwordEncoder.matches("new password", updatedUser.getPassword())).isFalse();
        assertThat(passwordEncoder.matches(currentPassword, updatedUser.getPassword())).isTrue();
    }

    @Test
    @Transactional
    @WithMockUser("change-password")
    public void testChangePassword() throws Exception {
        User user = new User();
        String currentPassword = RandomStringUtils.random(60);
        user.setPassword(passwordEncoder.encode(currentPassword));
        user.setLogin("change-password");
        user.setEmail("change-password@example.com");
        userRepository.saveAndFlush(user);

        restAccountMockMvc.perform(post("/api/account/change-password").contentType(MediaType.APPLICATION_JSON)
                                                                       .content(TestUtil.convertObjectToJsonBytes(new PasswordChangeDTO(currentPassword, "new passwordAB1")))
                                                                       .with(csrf()))
                          .andExpect(status().isOk());

        User updatedUser = userRepository.findOneByLogin("change-password")
                                         .orElse(null);
        assertThat(passwordEncoder.matches("new passwordAB1", updatedUser.getPassword())).isTrue();
    }

    @Test
    @Transactional
    @WithMockUser("change-password")
    public void changePassword_ShouldExpectBadRequest_WhenPasswordIsInvalid() throws Exception {
        User user = new User();
        String currentPassword = RandomStringUtils.random(60);
        user.setPassword(passwordEncoder.encode(currentPassword));
        user.setLogin("change-password");
        user.setEmail("change-password@example.com");
        userRepository.saveAndFlush(user);

        restAccountMockMvc.perform(post("/api/account/change-password").contentType(MediaType.APPLICATION_JSON)
                                                                       .content(TestUtil.convertObjectToJsonBytes(new PasswordChangeDTO(currentPassword, "@saT1")))
                                                                       .with(csrf()))
                          .andExpect(status().isBadRequest());
    }

    @Test
    @Transactional
    @WithMockUser("change-password-too-small")
    public void testChangePasswordTooSmall() throws Exception {
        User user = new User();
        String currentPassword = RandomStringUtils.random(60);
        user.setPassword(passwordEncoder.encode(currentPassword));
        user.setLogin("change-password-too-small");
        user.setEmail("change-password-too-small@example.com");
        userRepository.saveAndFlush(user);

        String newPassword = RandomStringUtils.random(ManagedUserVM.PASSWORD_MIN_LENGTH - 1);

        restAccountMockMvc.perform(post("/api/account/change-password").contentType(MediaType.APPLICATION_JSON)
                                                                       .content(TestUtil.convertObjectToJsonBytes(new PasswordChangeDTO(currentPassword, newPassword)))
                                                                       .with(csrf()))
                          .andExpect(status().isBadRequest());

        User updatedUser = userRepository.findOneByLogin("change-password-too-small")
                                         .orElse(null);
        assertThat(updatedUser.getPassword()).isEqualTo(user.getPassword());
    }

    @Test
    @Transactional
    @WithMockUser("change-password-too-long")
    public void testChangePasswordTooLong() throws Exception {
        User user = new User();
        String currentPassword = RandomStringUtils.random(60);
        user.setPassword(passwordEncoder.encode(currentPassword));
        user.setLogin("change-password-too-long");
        user.setEmail("change-password-too-long@example.com");
        userRepository.saveAndFlush(user);

        String newPassword = RandomStringUtils.random(ManagedUserVM.PASSWORD_MAX_LENGTH + 1);

        restAccountMockMvc.perform(post("/api/account/change-password").contentType(MediaType.APPLICATION_JSON)
                                                                       .content(TestUtil.convertObjectToJsonBytes(new PasswordChangeDTO(currentPassword, newPassword)))
                                                                       .with(csrf()))
                          .andExpect(status().isBadRequest());

        User updatedUser = userRepository.findOneByLogin("change-password-too-long")
                                         .orElse(null);
        assertThat(updatedUser.getPassword()).isEqualTo(user.getPassword());
    }

    @Test
    @Transactional
    @WithMockUser("change-password-empty")
    public void testChangePasswordEmpty() throws Exception {
        User user = new User();
        String currentPassword = RandomStringUtils.random(60);
        user.setPassword(passwordEncoder.encode(currentPassword));
        user.setLogin("change-password-empty");
        user.setEmail("change-password-empty@example.com");
        userRepository.saveAndFlush(user);

        restAccountMockMvc.perform(post("/api/account/change-password").contentType(MediaType.APPLICATION_JSON)
                                                                       .content(TestUtil.convertObjectToJsonBytes(new PasswordChangeDTO(currentPassword, "")))
                                                                       .with(csrf()))
                          .andExpect(status().isBadRequest());

        User updatedUser = userRepository.findOneByLogin("change-password-empty")
                                         .orElse(null);
        assertThat(updatedUser.getPassword()).isEqualTo(user.getPassword());
    }

    @Test
    @Transactional
    @WithMockUser("current-sessions")
    public void testGetCurrentSessions() throws Exception {
        User user = new User();
        user.setPassword(RandomStringUtils.random(60));
        user.setLogin("current-sessions");
        user.setEmail("current-sessions@example.com");
        userRepository.saveAndFlush(user);

        PersistentToken token = new PersistentToken();
        token.setSeries("current-sessions");
        token.setUser(user);
        token.setTokenValue("current-session-data");
        token.setTokenDate(LocalDate.of(2017, 3, 23));
        token.setIpAddress("127.0.0.1");
        token.setUserAgent("Test agent");
        persistentTokenRepository.saveAndFlush(token);

        restAccountMockMvc.perform(get("/api/account/sessions"))
                          .andExpect(status().isOk())
                          .andExpect(jsonPath("$.[*].series").value(hasItem(token.getSeries())))
                          .andExpect(jsonPath("$.[*].ipAddress").value(hasItem(token.getIpAddress())))
                          .andExpect(jsonPath("$.[*].userAgent").value(hasItem(token.getUserAgent())))
                          .andExpect(jsonPath("$.[*].tokenDate").value(hasItem(token.getTokenDate()
                                                                                    .toString())));
    }

    @Test
    @Transactional
    @WithMockUser("invalidate-session")
    public void testInvalidateSession() throws Exception {
        User user = new User();
        user.setPassword(RandomStringUtils.random(60));
        user.setLogin("invalidate-session");
        user.setEmail("invalidate-session@example.com");
        userRepository.saveAndFlush(user);

        PersistentToken token = new PersistentToken();
        token.setSeries("invalidate-session");
        token.setUser(user);
        token.setTokenValue("invalidate-data");
        token.setTokenDate(LocalDate.of(2017, 3, 23));
        token.setIpAddress("127.0.0.1");
        token.setUserAgent("Test agent");
        persistentTokenRepository.saveAndFlush(token);

        assertThat(persistentTokenRepository.findByUser(user)).hasSize(1);

        restAccountMockMvc.perform(delete("/api/account/sessions/invalidate-session").with(csrf()))
                          .andExpect(status().isOk());

        assertThat(persistentTokenRepository.findByUser(user)).isEmpty();
    }

    @Test
    @Transactional
    public void testRequestPasswordReset() throws Exception {
        User user = new User();
        user.setPassword(RandomStringUtils.random(60));
        user.setActivated(true);
        user.setLogin("password-reset");
        user.setEmail("password-reset@example.com");
        userRepository.saveAndFlush(user);

        restAccountMockMvc.perform(post("/api/account/reset-password/init").content("password-reset@example.com")
                                                                           .with(csrf()))
                          .andExpect(status().isOk());
    }

    @Test
    @Transactional
    @WithMockUser(authorities = AuthoritiesConstants.ADMIN)
    public void testRequestPasswordResetWithOtp() throws Exception {
        User user = new User();
        user.setPassword(RandomStringUtils.random(60));
        user.setActivated(true);
        user.setLogin("password-reset");
        user.setEmail("password-reset@example.com");
        userRepository.saveAndFlush(user);

        OtpDTO otpDTO = new OtpDTO();
        otpDTO.setEmail("password-reset@example.com");
        otpDTO.setCode("894322");
        otpDTO.setAction(OtpAction.RESET_PASSWORD);

        restAccountMockMvc.perform(
            get("/api/account/reset-password/otp/init")
                .contentType(MediaType.APPLICATION_JSON)
                .content(TestUtil.convertObjectToJsonBytes(otpDTO))
                .with(csrf()))
            .andExpect(status().isOk());
    }

    @Test
    @Transactional
    @WithMockUser(authorities = AuthoritiesConstants.ADMIN)
    public void testRequestPasswordResetWithOtpUpperCaseEmail() throws Exception {
        User user = new User();
        user.setPassword(RandomStringUtils.random(60));
        user.setActivated(true);
        user.setLogin("password-reset");
        user.setEmail("password-reset@example.com");
        userRepository.saveAndFlush(user);

        OtpDTO otpDTO = new OtpDTO();
        otpDTO.setEmail("PASSWORD-reset@example.com");
        otpDTO.setCode("894322");
        otpDTO.setAction(OtpAction.RESET_PASSWORD);

        restAccountMockMvc.perform(
            get("/api/account/reset-password/otp/init")
                .contentType(MediaType.APPLICATION_JSON)
                .content(TestUtil.convertObjectToJsonBytes(otpDTO))
                .with(csrf()))
            .andExpect(status().isOk());
    }

    @Test
    @Transactional
    public void testRequestPasswordResetUpperCaseEmail() throws Exception {
        User user = new User();
        user.setPassword(RandomStringUtils.random(60));
        user.setActivated(true);
        user.setLogin("password-reset-upper-case");
        user.setEmail("password-reset-upper-case@example.com");
        userRepository.saveAndFlush(user);

        restAccountMockMvc.perform(post("/api/account/reset-password/init").content("password-reset-upper-case@EXAMPLE.COM")
                                                                           .with(csrf()))
                          .andExpect(status().isOk());
    }

    @Test
    public void testRequestPasswordResetWrongEmail() throws Exception {
        restAccountMockMvc.perform(post("/api/account/reset-password/init").content("password-reset-wrong-email@example.com")
                                                                           .with(csrf()))
                          .andExpect(status().isOk());
    }

    @Test
    @Transactional
    @WithMockUser(authorities = AuthoritiesConstants.ADMIN)
    public void testRequestPasswordResetWrongOtp() throws Exception {
        OtpDTO otpDTO = new OtpDTO();
        otpDTO.setEmail("password-wrong-reset@example.com");
        otpDTO.setCode("894322");
        otpDTO.setAction(OtpAction.RESET_PASSWORD);

        restAccountMockMvc.perform(
            get("/api/account/reset-password/otp/init")
                .contentType(MediaType.APPLICATION_JSON)
                .content(TestUtil.convertObjectToJsonBytes(otpDTO))
                .with(csrf()))
            .andExpect(status().isOk());
    }

    @Test
    @Transactional
    public void testFinishPasswordReset() throws Exception {
        User user = new User();
        user.setPassword(RandomStringUtils.random(60));
        user.setLogin("finish-password-reset");
        user.setEmail("finish-password-reset@example.com");
        user.setResetDate(Instant.now()
                                 .plusSeconds(60));
        user.setResetKey("reset key");
        userRepository.saveAndFlush(user);

        KeyAndPasswordVM keyAndPassword = new KeyAndPasswordVM();
        keyAndPassword.setKey(user.getResetKey());
        keyAndPassword.setNewPassword("new passwordAA1");

        restAccountMockMvc.perform(post("/api/account/reset-password/finish").contentType(MediaType.APPLICATION_JSON)
                                                                             .content(TestUtil.convertObjectToJsonBytes(keyAndPassword))
                                                                             .with(csrf()))
                          .andExpect(status().isOk());

        User updatedUser = userRepository.findOneByLogin(user.getLogin())
                                         .orElse(null);
        assertThat(passwordEncoder.matches(keyAndPassword.getNewPassword(), updatedUser.getPassword())).isTrue();
    }

    @Test
    @Transactional
    public void finishPasswordReset_ShouldExpectBadRequest_WhenInvalidPasswordIsPassed() throws Exception {
        User user = new User();
        user.setPassword(RandomStringUtils.random(60));
        user.setLogin("finish-password-reset");
        user.setEmail("finish-password-reset@example.com");
        user.setResetDate(Instant.now()
                                 .plusSeconds(60));
        user.setResetKey("reset key");
        userRepository.saveAndFlush(user);

        KeyAndPasswordVM keyAndPassword = new KeyAndPasswordVM();
        keyAndPassword.setKey(user.getResetKey());
        keyAndPassword.setNewPassword("new passwordAAAA");

        restAccountMockMvc.perform(post("/api/account/reset-password/finish").contentType(MediaType.APPLICATION_JSON)
                                                                             .content(TestUtil.convertObjectToJsonBytes(keyAndPassword))
                                                                             .with(csrf()))
                          .andExpect(status().isBadRequest());
    }

    @Test
    @Transactional
    public void testFinishPasswordResetTooSmall() throws Exception {
        User user = new User();
        user.setPassword(RandomStringUtils.random(60));
        user.setLogin("finish-password-reset-too-small");
        user.setEmail("finish-password-reset-too-small@example.com");
        user.setResetDate(Instant.now()
                                 .plusSeconds(60));
        user.setResetKey("reset key too small");
        userRepository.saveAndFlush(user);

        KeyAndPasswordVM keyAndPassword = new KeyAndPasswordVM();
        keyAndPassword.setKey(user.getResetKey());
        keyAndPassword.setNewPassword("foo");

        restAccountMockMvc.perform(post("/api/account/reset-password/finish").contentType(MediaType.APPLICATION_JSON)
                                                                             .content(TestUtil.convertObjectToJsonBytes(keyAndPassword))
                                                                             .with(csrf()))
                          .andExpect(status().isBadRequest());

        User updatedUser = userRepository.findOneByLogin(user.getLogin())
                                         .orElse(null);
        assertThat(passwordEncoder.matches(keyAndPassword.getNewPassword(), updatedUser.getPassword())).isFalse();
    }

    @Test
    @Transactional
    public void testFinishPasswordResetWrongKey() throws Exception {
        KeyAndPasswordVM keyAndPassword = new KeyAndPasswordVM();
        keyAndPassword.setKey("wrong reset key");
        keyAndPassword.setNewPassword("new password1A");

        restAccountMockMvc.perform(post("/api/account/reset-password/finish").contentType(MediaType.APPLICATION_JSON)
                                                                             .content(TestUtil.convertObjectToJsonBytes(keyAndPassword))
                                                                             .with(csrf()))
                          .andExpect(status().isInternalServerError());
    }

    @Test
    @Transactional
    public void testFinishPasswordResetWrongOtp() throws Exception {
        User user = new User();
        user.setPassword(RandomStringUtils.random(60));
        user.setLogin("finish-password-reset");
        user.setEmail("finish-password-reset@example.com");
        user.setResetDate(Instant.now().plusSeconds(60));
        user.setResetKey("reset key");
        userRepository.saveAndFlush(user);

        Otp otp = new Otp();
        otp.setEmail(user.getEmail());
        otp.setAction(OtpAction.RESET_PASSWORD);
        otp.setCode(RandomStringUtils.randomNumeric(6));
        otp.setUsed(true);
        otpRepository.saveAndFlush(otp);

        OtpDTO otpDTO = otpMapper.toDto(otp);

        OtpAndPasswordVM otpAndPasswordVM = new OtpAndPasswordVM();
        otpAndPasswordVM.setEmail(otpDTO.getEmail());
        otpAndPasswordVM.setCode(RandomStringUtils.randomNumeric(6));
        otpAndPasswordVM.setAction(OtpAction.RESET_PASSWORD);
        otpAndPasswordVM.setNewPassword("12new Password");


        restAccountMockMvc.perform(
            post("/api/account/reset-password/otp/finish")
                .contentType(MediaType.APPLICATION_JSON)
                .content(TestUtil.convertObjectToJsonBytes(otpAndPasswordVM))
                .with(csrf()))
            .andExpect(status().isInternalServerError());
    }

    @Test
    @Transactional
    @WithAnonymousUser
    public void checkBvnExist_ShouldReturnTrue_WhenBVNAlreadyExistsForCustomer() throws Exception{
        LocationDTO location = locationMapper.toDto(LocationResourceIT.createEntity(em));
        CustomerDTO customer = CustomerDTOBuilder.builder(userService, "jerry")
                                                 .withLocation(location)
                                                 .withEmail("test@jerry.com")
                                                 .withBvn("12312389090")
                                                 .build();

        customerService.registerCustomer(customer);

        restAccountMockMvc.perform(get("/api/account/bvn/12312389090/validate").accept(MediaType.APPLICATION_JSON))
                          .andExpect(status().isOk())
                          .andExpect(jsonPath("$.bvnExists").value(true));
    }

    @Test
    @Transactional
    @WithAnonymousUser
    public void checkBvnExist_ShouldReturnFalse_WhenBVNDoesNotExistForCustomer() throws Exception{
        LocationDTO location = locationMapper.toDto(LocationResourceIT.createEntity(em));
        CustomerDTO customer = CustomerDTOBuilder.builder(userService, "jerry")
                                                 .withLocation(location)
                                                 .withEmail("test@jerry.com")
                                                 .withBvn("12312389091")
                                                 .build();

        customerService.registerCustomer(customer);

        restAccountMockMvc.perform(get("/api/account/bvn/12312389092/validate").accept(MediaType.APPLICATION_JSON))
                          .andExpect(status().isOk())
                          .andExpect(jsonPath("$.bvnExists").value(false));
    }
}
