package com.qds.rates.web.rest;

import com.qds.rates.RatesApp;
import com.qds.rates.domain.Verification;
import com.qds.rates.domain.Customer;
import com.qds.rates.repository.VerificationRepository;
import com.qds.rates.service.VerificationService;
import com.qds.rates.service.dto.VerificationDTO;
import com.qds.rates.service.mapper.VerificationMapper;

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
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.qds.rates.domain.enumeration.VerificationItem;
/**
 * Integration tests for the {@link VerificationResource} REST controller.
 */
@SpringBootTest(classes = RatesApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class VerificationResourceIT {

    private static final VerificationItem DEFAULT_ITEM_NAME = VerificationItem.PICTURE;
    private static final VerificationItem UPDATED_ITEM_NAME = VerificationItem.ID_CARD;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_CONTENT_TYPE = "image/png";

    private static final Boolean DEFAULT_ARCHIVED = false;
    private static final Boolean UPDATED_ARCHIVED = true;

    private static final String DEFAULT_ARCHIVE_URL = "AAAAAAAAAA";
    private static final String UPDATED_ARCHIVE_URL = "BBBBBBBBBB";

    @Autowired
    private VerificationRepository verificationRepository;

    @Autowired
    private VerificationMapper verificationMapper;

    @Autowired
    private VerificationService verificationService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restVerificationMockMvc;

    private Verification verification;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Verification createEntity(EntityManager em) {
        Verification verification = new Verification()
            .itemName(DEFAULT_ITEM_NAME)
            .description(DEFAULT_DESCRIPTION)
            .image(DEFAULT_IMAGE)
            .imageContentType(DEFAULT_IMAGE_CONTENT_TYPE)
            .archived(DEFAULT_ARCHIVED)
            .archiveUrl(DEFAULT_ARCHIVE_URL);
        // Add required entity
        Customer customer;
        if (TestUtil.findAll(em, Customer.class).isEmpty()) {
            customer = CustomerResourceIT.createEntity(em);
            em.persist(customer);
            em.flush();
        } else {
            customer = TestUtil.findAll(em, Customer.class).get(0);
        }
        verification.setCustomer(customer);
        return verification;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Verification createUpdatedEntity(EntityManager em) {
        Verification verification = new Verification()
            .itemName(UPDATED_ITEM_NAME)
            .description(UPDATED_DESCRIPTION)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE)
            .archived(UPDATED_ARCHIVED)
            .archiveUrl(UPDATED_ARCHIVE_URL);
        // Add required entity
        Customer customer;
        if (TestUtil.findAll(em, Customer.class).isEmpty()) {
            customer = CustomerResourceIT.createUpdatedEntity(em);
            em.persist(customer);
            em.flush();
        } else {
            customer = TestUtil.findAll(em, Customer.class).get(0);
        }
        verification.setCustomer(customer);
        return verification;
    }

    @BeforeEach
    public void initTest() {
        verification = createEntity(em);
    }

    @Test
    @Transactional
    public void createVerification() throws Exception {
        int databaseSizeBeforeCreate = verificationRepository.findAll().size();

        // Create the Verification
        VerificationDTO verificationDTO = verificationMapper.toDto(verification);
        restVerificationMockMvc.perform(post("/api/verifications").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(verificationDTO)))
            .andExpect(status().isCreated());

        // Validate the Verification in the database
        List<Verification> verificationList = verificationRepository.findAll();
        assertThat(verificationList).hasSize(databaseSizeBeforeCreate + 1);
        Verification testVerification = verificationList.get(verificationList.size() - 1);
        assertThat(testVerification.getItemName()).isEqualTo(DEFAULT_ITEM_NAME);
        assertThat(testVerification.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testVerification.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testVerification.getImageContentType()).isEqualTo(DEFAULT_IMAGE_CONTENT_TYPE);
        assertThat(testVerification.isArchived()).isEqualTo(DEFAULT_ARCHIVED);
        assertThat(testVerification.getArchiveUrl()).isEqualTo(DEFAULT_ARCHIVE_URL);
    }

    @Test
    @Transactional
    public void createVerificationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = verificationRepository.findAll().size();

        // Create the Verification with an existing ID
        verification.setId(1L);
        VerificationDTO verificationDTO = verificationMapper.toDto(verification);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVerificationMockMvc.perform(post("/api/verifications").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(verificationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Verification in the database
        List<Verification> verificationList = verificationRepository.findAll();
        assertThat(verificationList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllVerifications() throws Exception {
        // Initialize the database
        verificationRepository.saveAndFlush(verification);

        // Get all the verificationList
        restVerificationMockMvc.perform(get("/api/verifications?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(verification.getId().intValue())))
            .andExpect(jsonPath("$.[*].itemName").value(hasItem(DEFAULT_ITEM_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))))
            .andExpect(jsonPath("$.[*].archived").value(hasItem(DEFAULT_ARCHIVED.booleanValue())))
            .andExpect(jsonPath("$.[*].archiveUrl").value(hasItem(DEFAULT_ARCHIVE_URL)));
    }

    @Test
    @Transactional
    public void getVerification() throws Exception {
        // Initialize the database
        verificationRepository.saveAndFlush(verification);

        // Get the verification
        restVerificationMockMvc.perform(get("/api/verifications/{id}", verification.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(verification.getId().intValue()))
            .andExpect(jsonPath("$.itemName").value(DEFAULT_ITEM_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.imageContentType").value(DEFAULT_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.image").value(Base64Utils.encodeToString(DEFAULT_IMAGE)))
            .andExpect(jsonPath("$.archived").value(DEFAULT_ARCHIVED.booleanValue()))
            .andExpect(jsonPath("$.archiveUrl").value(DEFAULT_ARCHIVE_URL));
    }

    @Test
    @Transactional
    public void getNonExistingVerification() throws Exception {
        // Get the verification
        restVerificationMockMvc.perform(get("/api/verifications/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVerification() throws Exception {
        // Initialize the database
        verificationRepository.saveAndFlush(verification);

        int databaseSizeBeforeUpdate = verificationRepository.findAll().size();

        // Update the verification
        Verification updatedVerification = verificationRepository.findById(verification.getId()).get();
        // Disconnect from session so that the updates on updatedVerification are not directly saved in db
        em.detach(updatedVerification);
        updatedVerification
            .itemName(UPDATED_ITEM_NAME)
            .description(UPDATED_DESCRIPTION)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE)
            .archived(UPDATED_ARCHIVED)
            .archiveUrl(UPDATED_ARCHIVE_URL);
        VerificationDTO verificationDTO = verificationMapper.toDto(updatedVerification);

        restVerificationMockMvc.perform(put("/api/verifications").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(verificationDTO)))
            .andExpect(status().isOk());

        // Validate the Verification in the database
        List<Verification> verificationList = verificationRepository.findAll();
        assertThat(verificationList).hasSize(databaseSizeBeforeUpdate);
        Verification testVerification = verificationList.get(verificationList.size() - 1);
        assertThat(testVerification.getItemName()).isEqualTo(UPDATED_ITEM_NAME);
        assertThat(testVerification.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testVerification.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testVerification.getImageContentType()).isEqualTo(UPDATED_IMAGE_CONTENT_TYPE);
        assertThat(testVerification.isArchived()).isEqualTo(UPDATED_ARCHIVED);
        assertThat(testVerification.getArchiveUrl()).isEqualTo(UPDATED_ARCHIVE_URL);
    }

    @Test
    @Transactional
    public void updateNonExistingVerification() throws Exception {
        int databaseSizeBeforeUpdate = verificationRepository.findAll().size();

        // Create the Verification
        VerificationDTO verificationDTO = verificationMapper.toDto(verification);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVerificationMockMvc.perform(put("/api/verifications").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(verificationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Verification in the database
        List<Verification> verificationList = verificationRepository.findAll();
        assertThat(verificationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVerification() throws Exception {
        // Initialize the database
        verificationRepository.saveAndFlush(verification);

        int databaseSizeBeforeDelete = verificationRepository.findAll().size();

        // Delete the verification
        restVerificationMockMvc.perform(delete("/api/verifications/{id}", verification.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Verification> verificationList = verificationRepository.findAll();
        assertThat(verificationList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
