package com.qds.rates.web.rest;

import static com.qds.rates.domain.enumeration.State.ABUJA;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.in;
import static org.hamcrest.Matchers.arrayContaining;
import static org.hamcrest.Matchers.arrayContainingInAnyOrder;
import static org.hamcrest.Matchers.contains;
import static org.hamcrest.Matchers.everyItem;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.hasItemInArray;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.hasValue;
import static org.hamcrest.Matchers.is;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.model;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.assertj.core.api.Assertions;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import com.qds.rates.RatesApp;
import com.qds.rates.domain.LocalGovt;
import com.qds.rates.domain.enumeration.State;
import com.qds.rates.repository.LocalGovtRepository;
import com.qds.rates.service.ApplicationService;
import com.qds.rates.service.dto.LocalGovtDTO;
import com.qds.rates.service.mapper.LocalGovtMapper;
/**
 * Integration tests for the {@link LocalGovtResource} REST controller.
 */
@SpringBootTest(classes = RatesApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class LocalGovtResourceIT {

    private final Logger log = LoggerFactory.getLogger(ApplicationService.class);

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final State DEFAULT_STATE = State.ABIA;
    private static final State UPDATED_STATE = State.ADAMAWA;

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    @Autowired
    private LocalGovtRepository localGovtRepository;

    @Autowired
    private LocalGovtMapper localGovtMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLocalGovtMockMvc;

    private LocalGovt localGovt;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LocalGovt createEntity(EntityManager em) {
        LocalGovt localGovt = new LocalGovt()
            .name(DEFAULT_NAME)
            .state(DEFAULT_STATE)
            .active(DEFAULT_ACTIVE);
        return localGovt;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LocalGovt createUpdatedEntity(EntityManager em) {
        LocalGovt localGovt = new LocalGovt()
            .name(UPDATED_NAME)
            .state(UPDATED_STATE)
            .active(UPDATED_ACTIVE);
        return localGovt;
    }

    @BeforeEach
    public void initTest() {
        localGovt = createEntity(em);
    }

    @Test
    @Transactional
    public void createLocalGovt() throws Exception {
        int databaseSizeBeforeCreate = localGovtRepository.findAll().size();
        // Create the LocalGovt
        LocalGovtDTO localGovtDTO = localGovtMapper.toDto(localGovt);
        restLocalGovtMockMvc.perform(post("/api/local-govts").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localGovtDTO)))
            .andExpect(status().isCreated());

        // Validate the LocalGovt in the database
        List<LocalGovt> localGovtList = localGovtRepository.findAll();
        assertThat(localGovtList).hasSize(databaseSizeBeforeCreate + 1);
        LocalGovt testLocalGovt = localGovtList.get(localGovtList.size() - 1);
        assertThat(testLocalGovt.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testLocalGovt.getState()).isEqualTo(DEFAULT_STATE);
        assertThat(testLocalGovt.isActive()).isEqualTo(DEFAULT_ACTIVE);
    }

    @Test
    @Transactional
    public void createLocalGovtWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = localGovtRepository.findAll().size();

        // Create the LocalGovt with an existing ID
        localGovt.setId(1L);
        LocalGovtDTO localGovtDTO = localGovtMapper.toDto(localGovt);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLocalGovtMockMvc.perform(post("/api/local-govts").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localGovtDTO)))
            .andExpect(status().isBadRequest());

        // Validate the LocalGovt in the database
        List<LocalGovt> localGovtList = localGovtRepository.findAll();
        assertThat(localGovtList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = localGovtRepository.findAll().size();
        // set the field null
        localGovt.setName(null);

        // Create the LocalGovt, which fails.
        LocalGovtDTO localGovtDTO = localGovtMapper.toDto(localGovt);

        restLocalGovtMockMvc.perform(post("/api/local-govts").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localGovtDTO)))
            .andExpect(status().isBadRequest());

        List<LocalGovt> localGovtList = localGovtRepository.findAll();
        assertThat(localGovtList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStateIsRequired() throws Exception {
        int databaseSizeBeforeTest = localGovtRepository.findAll().size();
        // set the field null
        localGovt.setState(null);

        // Create the LocalGovt, which fails.
        LocalGovtDTO localGovtDTO = localGovtMapper.toDto(localGovt);

        restLocalGovtMockMvc.perform(post("/api/local-govts").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localGovtDTO)))
            .andExpect(status().isBadRequest());

        List<LocalGovt> localGovtList = localGovtRepository.findAll();
        assertThat(localGovtList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLocalGovts() throws Exception {
        // Initialize the database
        localGovtRepository.saveAndFlush(localGovt);

        // Get all the localGovtList
        restLocalGovtMockMvc.perform(get("/api/local-govts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(localGovt.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE.toString())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())));
    }

    @Test
    @Transactional
    public void getLocalGovt() throws Exception {
        // Initialize the database
        localGovtRepository.saveAndFlush(localGovt);

        // Get the localGovt
        restLocalGovtMockMvc.perform(get("/api/local-govts/{id}", localGovt.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(localGovt.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE.toString()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingLocalGovt() throws Exception {
        // Get the localGovt
        restLocalGovtMockMvc.perform(get("/api/local-govts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLocalGovt() throws Exception {
        // Initialize the database
        localGovtRepository.saveAndFlush(localGovt);

        int databaseSizeBeforeUpdate = localGovtRepository.findAll().size();

        // Update the localGovt
        LocalGovt updatedLocalGovt = localGovtRepository.findById(localGovt.getId()).get();
        // Disconnect from session so that the updates on updatedLocalGovt are not directly saved in db
        em.detach(updatedLocalGovt);
        updatedLocalGovt
            .name(UPDATED_NAME)
            .state(UPDATED_STATE)
            .active(UPDATED_ACTIVE);
        LocalGovtDTO localGovtDTO = localGovtMapper.toDto(updatedLocalGovt);

        restLocalGovtMockMvc.perform(put("/api/local-govts").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localGovtDTO)))
            .andExpect(status().isOk());

        // Validate the LocalGovt in the database
        List<LocalGovt> localGovtList = localGovtRepository.findAll();
        assertThat(localGovtList).hasSize(databaseSizeBeforeUpdate);
        LocalGovt testLocalGovt = localGovtList.get(localGovtList.size() - 1);
        assertThat(testLocalGovt.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testLocalGovt.getState()).isEqualTo(UPDATED_STATE);
        assertThat(testLocalGovt.isActive()).isEqualTo(UPDATED_ACTIVE);
    }

    @Test
    @Transactional
    public void updateNonExistingLocalGovt() throws Exception {
        int databaseSizeBeforeUpdate = localGovtRepository.findAll().size();

        // Create the LocalGovt
        LocalGovtDTO localGovtDTO = localGovtMapper.toDto(localGovt);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLocalGovtMockMvc.perform(put("/api/local-govts").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(localGovtDTO)))
            .andExpect(status().isBadRequest());

        // Validate the LocalGovt in the database
        List<LocalGovt> localGovtList = localGovtRepository.findAll();
        assertThat(localGovtList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLocalGovt() throws Exception {
        // Initialize the database
        localGovtRepository.saveAndFlush(localGovt);

        int databaseSizeBeforeDelete = localGovtRepository.findAll().size();

        // Delete the localGovt
        restLocalGovtMockMvc.perform(delete("/api/local-govts/{id}", localGovt.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LocalGovt> localGovtList = localGovtRepository.findAll();
        assertThat(localGovtList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void getLocalGovtByState_ShouldReturnLGAs_WhenLGAIsActiveAndMatchesState() throws Exception{
        restLocalGovtMockMvc.perform(get("/api/local-govts/state/{state}", ABUJA))
                            .andExpect(status().isOk())
                            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
                            .andExpect(jsonPath("$.*.state", everyItem(is(ABUJA.toString()))))
                            .andExpect(jsonPath("$.*.active", everyItem(is(true))))
                            .andExpect(jsonPath("$", hasSize(6)));
    }
}
