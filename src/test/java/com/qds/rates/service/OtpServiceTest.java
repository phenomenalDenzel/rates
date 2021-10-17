package com.qds.rates.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.BDDMockito.given;

import javax.transaction.Transactional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.qds.rates.config.ApplicationProperties;
import com.qds.rates.domain.Otp;
import com.qds.rates.domain.User;
import com.qds.rates.domain.enumeration.OtpAction;
import com.qds.rates.repository.OtpRepository;
import com.qds.rates.service.dto.OtpDTO;
import com.qds.rates.service.mapper.OtpMapper;

@Transactional
@ExtendWith(MockitoExtension.class)
class OtpServiceTest {

    private static final String DEFAULT_EMAIL = "johndoe@localhost";

    OtpService otpService;

    @Mock
    OtpRepository otpRepository;

    @Mock
    MailService mailService;

    @Mock
    OtpMapper otpMapper;

    @Mock
    private Otp otpEntity;

    @BeforeEach
    void setUp() {
        ApplicationProperties properties = new ApplicationProperties();
        properties.setOtpLength(6);
        properties.setOtpValidityMinutes(15L);
        otpService = new OtpService(otpRepository, otpMapper, mailService, properties);
        otpRepository.deleteAll();
    }

    private User getUser(){
        User user = new User();
        user.setEmail(DEFAULT_EMAIL);
        user.setLogin("test");

        return user;
    }

    @Test
    @Disabled("Should be an integration test")
    void shouldGenerateSixDigitCode() {
        OtpDTO otpDTO = new OtpDTO();
        otpDTO.setAction(OtpAction.ACTIVATION);
        otpDTO.setEmail(DEFAULT_EMAIL);

        given(otpMapper.toEntity(otpDTO)).willReturn(otpEntity);
        OtpDTO otpToken = otpService.sendGeneratedOtpCodeToUser(getUser(), OtpAction.ACTIVATION);

        assertThat(otpToken.getCode()).containsOnlyDigits();
        assertThat(otpToken.getCode()).hasSize(6);
    }

    @Test
    void shouldReturnFalseWhenOtpActionInvalid(){
        OtpDTO otpDTO = new OtpDTO();
        otpDTO.setEmail(DEFAULT_EMAIL);
        otpDTO.setAction(OtpAction.RESET_PASSWORD);

        assertFalse(otpService.useOtp(otpDTO));
    }

    @Test
    void shouldReturnFalseWhenRequesterEmailInvalid(){
        OtpDTO otpDTO = new OtpDTO();
        otpDTO.setAction(OtpAction.ACTIVATION);
        otpDTO.setEmail(DEFAULT_EMAIL);
        otpDTO.setEmail("test@testing.com");

        assertFalse(otpService.useOtp(otpDTO));
    }

    @Test
    void shouldReturnFalseWhenCodeInvalid(){
        OtpDTO otpDTO = new OtpDTO();
        otpDTO.setAction(OtpAction.ACTIVATION);
        otpDTO.setEmail(DEFAULT_EMAIL);
        otpDTO.setCode("342343");


        assertFalse(otpService.useOtp(otpDTO));
    }
}
