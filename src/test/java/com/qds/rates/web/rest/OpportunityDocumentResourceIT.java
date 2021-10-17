package com.qds.rates.web.rest;

import com.qds.rates.RatesApp;
import com.qds.rates.domain.OpportunityDocument;
import com.qds.rates.domain.Opportunity;
import com.qds.rates.repository.OpportunityDocumentRepository;
import com.qds.rates.service.OpportunityDocumentService;
import com.qds.rates.service.dto.OpportunityDocumentDTO;
import com.qds.rates.service.mapper.OpportunityDocumentMapper;

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

/**
 * Integration tests for the {@link OpportunityDocumentResource} REST controller.
 */
@SpringBootTest(classes = RatesApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class OpportunityDocumentResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_FILE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_FILE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_FILE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_FILE_CONTENT_TYPE = "image/png";

    private static final Boolean DEFAULT_ARCHIVED = false;
    private static final Boolean UPDATED_ARCHIVED = true;

    private static final String DEFAULT_ARCHIVE_URL = "AAAAAAAAAA";
    private static final String UPDATED_ARCHIVE_URL = "BBBBBBBBBB";

    @Autowired
    private OpportunityDocumentRepository opportunityDocumentRepository;

    @Autowired
    private OpportunityDocumentMapper opportunityDocumentMapper;

    @Autowired
    private OpportunityDocumentService opportunityDocumentService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOpportunityDocumentMockMvc;

    private OpportunityDocument opportunityDocument;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OpportunityDocument createEntity(EntityManager em) {
        OpportunityDocument opportunityDocument = new OpportunityDocument()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .file(DEFAULT_FILE)
            .fileContentType(DEFAULT_FILE_CONTENT_TYPE)
            .archived(DEFAULT_ARCHIVED)
            .archiveUrl(DEFAULT_ARCHIVE_URL);
        // Add required entity
        Opportunity opportunity;
        if (TestUtil.findAll(em, Opportunity.class).isEmpty()) {
            opportunity = OpportunityResourceIT.createEntity(em);
            em.persist(opportunity);
            em.flush();
        } else {
            opportunity = TestUtil.findAll(em, Opportunity.class).get(0);
        }
        opportunityDocument.setOpportunity(opportunity);
        return opportunityDocument;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OpportunityDocument createUpdatedEntity(EntityManager em) {
        OpportunityDocument opportunityDocument = new OpportunityDocument()
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .file(UPDATED_FILE)
            .fileContentType(UPDATED_FILE_CONTENT_TYPE)
            .archived(UPDATED_ARCHIVED)
            .archiveUrl(UPDATED_ARCHIVE_URL);
        // Add required entity
        Opportunity opportunity;
        if (TestUtil.findAll(em, Opportunity.class).isEmpty()) {
            opportunity = OpportunityResourceIT.createUpdatedEntity(em);
            em.persist(opportunity);
            em.flush();
        } else {
            opportunity = TestUtil.findAll(em, Opportunity.class).get(0);
        }
        opportunityDocument.setOpportunity(opportunity);
        return opportunityDocument;
    }

    @BeforeEach
    public void initTest() {
        opportunityDocument = createEntity(em);
    }

    @Test
    @Transactional
    public void createOpportunityDocument() throws Exception {
        int databaseSizeBeforeCreate = opportunityDocumentRepository.findAll().size();

        // Create the OpportunityDocument
        OpportunityDocumentDTO opportunityDocumentDTO = opportunityDocumentMapper.toDto(opportunityDocument);
        restOpportunityDocumentMockMvc.perform(post("/api/opportunity-documents").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(opportunityDocumentDTO)))
            .andExpect(status().isCreated());

        // Validate the OpportunityDocument in the database
        List<OpportunityDocument> opportunityDocumentList = opportunityDocumentRepository.findAll();
        assertThat(opportunityDocumentList).hasSize(databaseSizeBeforeCreate + 1);
        OpportunityDocument testOpportunityDocument = opportunityDocumentList.get(opportunityDocumentList.size() - 1);
        assertThat(testOpportunityDocument.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testOpportunityDocument.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testOpportunityDocument.getFile()).isEqualTo(DEFAULT_FILE);
        assertThat(testOpportunityDocument.getFileContentType()).isEqualTo(DEFAULT_FILE_CONTENT_TYPE);
        assertThat(testOpportunityDocument.isArchived()).isEqualTo(DEFAULT_ARCHIVED);
        assertThat(testOpportunityDocument.getArchiveUrl()).isEqualTo(DEFAULT_ARCHIVE_URL);
    }

    @Test
    @Transactional
    public void createOpportunityDocumentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = opportunityDocumentRepository.findAll().size();

        // Create the OpportunityDocument with an existing ID
        opportunityDocument.setId(1L);
        OpportunityDocumentDTO opportunityDocumentDTO = opportunityDocumentMapper.toDto(opportunityDocument);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOpportunityDocumentMockMvc.perform(post("/api/opportunity-documents").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(opportunityDocumentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the OpportunityDocument in the database
        List<OpportunityDocument> opportunityDocumentList = opportunityDocumentRepository.findAll();
        assertThat(opportunityDocumentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = opportunityDocumentRepository.findAll().size();
        // set the field null
        opportunityDocument.setName(null);

        // Create the OpportunityDocument, which fails.
        OpportunityDocumentDTO opportunityDocumentDTO = opportunityDocumentMapper.toDto(opportunityDocument);

        restOpportunityDocumentMockMvc.perform(post("/api/opportunity-documents").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(opportunityDocumentDTO)))
            .andExpect(status().isBadRequest());

        List<OpportunityDocument> opportunityDocumentList = opportunityDocumentRepository.findAll();
        assertThat(opportunityDocumentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOpportunityDocuments() throws Exception {
        // Initialize the database
        opportunityDocumentRepository.saveAndFlush(opportunityDocument);

        // Get all the opportunityDocumentList
        restOpportunityDocumentMockMvc.perform(get("/api/opportunity-documents?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(opportunityDocument.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].fileContentType").value(hasItem(DEFAULT_FILE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].file").value(hasItem(Base64Utils.encodeToString(DEFAULT_FILE))))
            .andExpect(jsonPath("$.[*].archived").value(hasItem(DEFAULT_ARCHIVED.booleanValue())))
            .andExpect(jsonPath("$.[*].archiveUrl").value(hasItem(DEFAULT_ARCHIVE_URL)));
    }

    @Test
    @Transactional
    public void getOpportunityDocument() throws Exception {
        // Initialize the database
        opportunityDocumentRepository.saveAndFlush(opportunityDocument);

        // Get the opportunityDocument
        restOpportunityDocumentMockMvc.perform(get("/api/opportunity-documents/{id}", opportunityDocument.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(opportunityDocument.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.fileContentType").value(DEFAULT_FILE_CONTENT_TYPE))
            .andExpect(jsonPath("$.file").value(Base64Utils.encodeToString(DEFAULT_FILE)))
            .andExpect(jsonPath("$.archived").value(DEFAULT_ARCHIVED.booleanValue()))
            .andExpect(jsonPath("$.archiveUrl").value(DEFAULT_ARCHIVE_URL));
    }

    @Test
    @Transactional
    public void getNonExistingOpportunityDocument() throws Exception {
        // Get the opportunityDocument
        restOpportunityDocumentMockMvc.perform(get("/api/opportunity-documents/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOpportunityDocument() throws Exception {
        // Initialize the database
        opportunityDocumentRepository.saveAndFlush(opportunityDocument);

        int databaseSizeBeforeUpdate = opportunityDocumentRepository.findAll().size();

        // Update the opportunityDocument
        OpportunityDocument updatedOpportunityDocument = opportunityDocumentRepository.findById(opportunityDocument.getId()).get();
        // Disconnect from session so that the updates on updatedOpportunityDocument are not directly saved in db
        em.detach(updatedOpportunityDocument);
        updatedOpportunityDocument
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .file(UPDATED_FILE)
            .fileContentType(UPDATED_FILE_CONTENT_TYPE)
            .archived(UPDATED_ARCHIVED)
            .archiveUrl(UPDATED_ARCHIVE_URL);
        OpportunityDocumentDTO opportunityDocumentDTO = opportunityDocumentMapper.toDto(updatedOpportunityDocument);

        restOpportunityDocumentMockMvc.perform(put("/api/opportunity-documents").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(opportunityDocumentDTO)))
            .andExpect(status().isOk());

        // Validate the OpportunityDocument in the database
        List<OpportunityDocument> opportunityDocumentList = opportunityDocumentRepository.findAll();
        assertThat(opportunityDocumentList).hasSize(databaseSizeBeforeUpdate);
        OpportunityDocument testOpportunityDocument = opportunityDocumentList.get(opportunityDocumentList.size() - 1);
        assertThat(testOpportunityDocument.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testOpportunityDocument.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testOpportunityDocument.getFile()).isEqualTo(UPDATED_FILE);
        assertThat(testOpportunityDocument.getFileContentType()).isEqualTo(UPDATED_FILE_CONTENT_TYPE);
        assertThat(testOpportunityDocument.isArchived()).isEqualTo(UPDATED_ARCHIVED);
        assertThat(testOpportunityDocument.getArchiveUrl()).isEqualTo(UPDATED_ARCHIVE_URL);
    }

    @Test
    @Transactional
    public void updateNonExistingOpportunityDocument() throws Exception {
        int databaseSizeBeforeUpdate = opportunityDocumentRepository.findAll().size();

        // Create the OpportunityDocument
        OpportunityDocumentDTO opportunityDocumentDTO = opportunityDocumentMapper.toDto(opportunityDocument);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOpportunityDocumentMockMvc.perform(put("/api/opportunity-documents").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(opportunityDocumentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the OpportunityDocument in the database
        List<OpportunityDocument> opportunityDocumentList = opportunityDocumentRepository.findAll();
        assertThat(opportunityDocumentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOpportunityDocument() throws Exception {
        // Initialize the database
        opportunityDocumentRepository.saveAndFlush(opportunityDocument);

        int databaseSizeBeforeDelete = opportunityDocumentRepository.findAll().size();

        // Delete the opportunityDocument
        restOpportunityDocumentMockMvc.perform(delete("/api/opportunity-documents/{id}", opportunityDocument.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<OpportunityDocument> opportunityDocumentList = opportunityDocumentRepository.findAll();
        assertThat(opportunityDocumentList).hasSize(databaseSizeBeforeDelete - 1);
    }

}
