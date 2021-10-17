package com.qds.rates.web.rest;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.qds.rates.domain.User;
import com.qds.rates.service.OtpService;
import com.qds.rates.service.UserService;
import com.qds.rates.service.dto.OtpDTO;

/**
 * REST controller for managing {@link com.qds.rates.domain.Otp}.
 */
@RestController
@RequestMapping("/api")
public class OtpResource {

    private final Logger log = LoggerFactory.getLogger(OtpResource.class);

    private static final String ENTITY_NAME = "otp";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OtpService otpService;

    private final UserService userService;

    public OtpResource(final OtpService otpService, final UserService userService) {
        this.otpService = otpService;
        this.userService = userService;
    }

    /**
     * {@code GET  /otps} : get all the otps.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of otps in body.
     */

    @GetMapping("/otps")
    public List<OtpDTO> getAllOtps() {
        log.debug("REST request to get all Otps");
        return otpService.findAll();
    }

    @PostMapping(path = "/otp/generate")
    @ResponseStatus(HttpStatus.CREATED)
    public void generate(@Valid @RequestBody OtpDTO otpDTO) {
        Optional<User> user = userService.getUserByEmail(otpDTO.getEmail());
        if (!user.isPresent()) {
            log.warn("Email: "+otpDTO.getEmail()+" does not belong to a customer");
        } else {
            otpService.sendGeneratedOtpCodeToUser(user.get(), otpDTO.getAction());
        }
    }

    @PutMapping(path = "/otp/validate")
    public ResponseEntity<Boolean> validate(@Valid @RequestBody OtpDTO otpDTO) {
        return ResponseEntity.ok(otpService.useOtp(otpDTO));
    }

    @DeleteMapping("/otps/clean-up")
    public ResponseEntity<Void> cleanUP() {
        otpService.cleanUpUsedOtps();
        return ResponseEntity.status(HttpStatus.OK)
                             .build();
    }
}
