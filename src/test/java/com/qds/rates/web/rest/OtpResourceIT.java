package com.qds.rates.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import com.qds.rates.RatesApp;
import com.qds.rates.config.Constants;
import com.qds.rates.domain.Otp;
import com.qds.rates.domain.User;
import com.qds.rates.domain.enumeration.OtpAction;
import com.qds.rates.repository.OtpRepository;
import com.qds.rates.security.AuthoritiesConstants;
import com.qds.rates.service.OtpService;
import com.qds.rates.service.dto.OtpDTO;
import com.qds.rates.service.mapper.OtpMapper;
import com.qds.rates.web.rest.vm.ManagedUserVM;
/**
 * Integration tests for the {@link OtpResource} REST controller.
 */
@SpringBootTest(classes = RatesApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class OtpResourceIT {

    private static final String DEFAULT_CODE = "098909";
    private static final String UPDATED_CODE = "778342";

    private static final OtpAction DEFAULT_ACTION = OtpAction.ACTIVATION;
    private static final OtpAction UPDATED_ACTION = OtpAction.WITHDRAWAL;

    private static final String DEFAULT_EMAIL = "aaa@aa.com";
    private static final String UPDATED_EMAIL = "bbb@bb.com";

    private static final Instant DEFAULT_CREATED_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Boolean DEFAULT_USED = false;
    private static final Boolean UPDATED_USED = true;

    @Autowired
    private OtpRepository otpRepository;

    @Autowired
    private OtpMapper otpMapper;

    @Autowired
    private OtpService otpService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOtpMockMvc;

    private Otp otp;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Otp createEntity(EntityManager em) {
        Otp otp = new Otp()
            .code(DEFAULT_CODE)
            .action(DEFAULT_ACTION)
            .email(DEFAULT_EMAIL)
            .createdTime(DEFAULT_CREATED_TIME)
            .used(DEFAULT_USED);
        return otp;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Otp createUpdatedEntity(EntityManager em) {
        Otp otp = new Otp()
            .code(UPDATED_CODE)
            .action(UPDATED_ACTION)
            .email(UPDATED_EMAIL)
            .createdTime(UPDATED_CREATED_TIME)
            .used(UPDATED_USED);
        return otp;
    }

    @BeforeEach
    public void initTest() {
        otp = createEntity(em);
    }

    @Test
    @Transactional
    @WithMockUser(authorities = AuthoritiesConstants.ANONYMOUS)
    public void checkActionIsRequiredForGeneration() throws Exception {
        int databaseSizeBeforeTest = otpRepository.findAll().size();
        // set the field null
        otp.setAction(null);

        // Create the Otp, which fails.
        OtpDTO otpDTO = otpMapper.toDto(otp);


        restOtpMockMvc.perform(post("/api/otp/generate").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(otpDTO)))
            .andExpect(status().isBadRequest());

        List<Otp> otpList = otpRepository.findAll();
        assertThat(otpList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    @WithMockUser(authorities = AuthoritiesConstants.ANONYMOUS)
    public void checkEmailIsRequiredForGeneration() throws Exception {
        int databaseSizeBeforeTest = otpRepository.findAll().size();
        // set the field null
        otp.setEmail(null);

        // Create the Otp, which fails.
        OtpDTO otpDTO = otpMapper.toDto(otp);


        restOtpMockMvc.perform(post("/api/otp/generate").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(otpDTO)))
            .andExpect(status().isBadRequest());

        List<Otp> otpList = otpRepository.findAll();
        assertThat(otpList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    @WithMockUser(authorities = AuthoritiesConstants.ANONYMOUS)
    public void shouldNotGenerateOtpWhenEmailIsNotFound() throws Exception {
        int databaseSizeBeforeTest = otpRepository.findAll().size();

        // Create the Otp, which fails.
        OtpDTO otpDTO = otpMapper.toDto(otp);


        restOtpMockMvc.perform(post("/api/otp/generate").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(otpDTO)));

        List<Otp> otpList = otpRepository.findAll();
        assertThat(otpList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    @WithMockUser(authorities = AuthoritiesConstants.ANONYMOUS)
    public void shouldGenerateOtpWhenAllChecksOut() throws Exception {
        User firstUser = UserResourceIT.createEntity(em);
        em.persist(firstUser);

        // Create the Otp, which fails.
        OtpDTO otpDTO = otpMapper.toDto(otp);
        otpDTO.setEmail(firstUser.getEmail());


        restOtpMockMvc.perform(post("/api/otp/generate").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(otpDTO)))
            .andExpect(status().isCreated());
    }

    @Test
    @Transactional
    @WithMockUser(authorities = AuthoritiesConstants.ANONYMOUS)
    public void shouldValidateOtpWhenAllChecksOut() throws Exception {
        User firstUser = UserResourceIT.createEntity(em);
        em.persist(firstUser);

        // Create the Otp, which fails.
        OtpDTO otpDTO = otpMapper.toDto(otp);
        otpDTO.setEmail(firstUser.getEmail());


        restOtpMockMvc.perform(post("/api/otp/generate").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(otpDTO)))
            .andExpect(status().isCreated());

        restOtpMockMvc.perform(put("/api/otp/validate").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(otpDTO)))
            .andExpect(status().isOk()).andExpect(jsonPath("$").value(true));
    }

    @Test
    @Transactional
    @WithMockUser(authorities = AuthoritiesConstants.ANONYMOUS)
    public void shouldNotAcceptValidOtpTwiceWithinExpiryTime() throws Exception {
        Otp otp = new Otp();
        otp.setEmail("any@any.com");
        otp.setUsed(false);
        otp.setAction(OtpAction.RESET_PASSWORD);
        otp.setCode(String.valueOf(RandomStringUtils.randomNumeric(6)));
        otpRepository.saveAndFlush(otp);

        OtpDTO otpDTO = otpMapper.toDto(otp);

        restOtpMockMvc.perform(put("/api/otp/validate").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(otpDTO)))
            .andExpect(status().isOk()).andExpect(jsonPath("$").value(true));

        restOtpMockMvc.perform(put("/api/otp/validate").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(otpDTO)))
            .andExpect(status().isOk()).andExpect(jsonPath("$").value(false));
    }


}
