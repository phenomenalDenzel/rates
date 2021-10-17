package com.qds.rates.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import javax.persistence.EntityManager;
import java.util.List;

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
import com.qds.rates.domain.Customer;
import com.qds.rates.domain.NextOfKin;
import com.qds.rates.domain.enumeration.RelationshipType;
import com.qds.rates.domain.enumeration.Title;
import com.qds.rates.repository.NextOfKinRepository;
import com.qds.rates.service.NextOfKinService;
import com.qds.rates.service.dto.NextOfKinDTO;
import com.qds.rates.service.mapper.NextOfKinMapper;
/**
 * Integration tests for the {@link NextOfKinResource} REST controller.
 */
@SpringBootTest(classes = RatesApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class NextOfKinResourceIT {

    private static final Title DEFAULT_TITLE = Title.MR;
    private static final Title UPDATED_TITLE = Title.MS;

    private static final RelationshipType DEFAULT_RELATION = RelationshipType.FATHER;
    private static final RelationshipType UPDATED_RELATION = RelationshipType.MOTHER;

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PHONE_NUMBER = "BBBBBBBBBB";

    @Autowired
    private NextOfKinRepository nextOfKinRepository;

    @Autowired
    private NextOfKinMapper nextOfKinMapper;

    @Autowired
    private NextOfKinService nextOfKinService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNextOfKinMockMvc;

    private NextOfKin nextOfKin;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NextOfKin createEntity(EntityManager em) {
        NextOfKin nextOfKin = new NextOfKin()
            .title(DEFAULT_TITLE)
            .relation(DEFAULT_RELATION)
            .name(DEFAULT_NAME)
            .phoneNumber(DEFAULT_PHONE_NUMBER);
        // Add required entity
        Customer customer;
        if (TestUtil.findAll(em, Customer.class).isEmpty()) {
            customer = CustomerResourceIT.createEntity(em);
            em.persist(customer);
            em.flush();
        } else {
            customer = TestUtil.findAll(em, Customer.class).get(0);
        }
        nextOfKin.setCustomer(customer);
        return nextOfKin;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NextOfKin createUpdatedEntity(EntityManager em) {
        NextOfKin nextOfKin = new NextOfKin()
            .title(UPDATED_TITLE)
            .relation(UPDATED_RELATION)
            .name(UPDATED_NAME)
            .phoneNumber(UPDATED_PHONE_NUMBER);
        // Add required entity
        Customer customer;
        if (TestUtil.findAll(em, Customer.class).isEmpty()) {
            customer = CustomerResourceIT.createUpdatedEntity(em);
            em.persist(customer);
            em.flush();
        } else {
            customer = TestUtil.findAll(em, Customer.class).get(0);
        }
        nextOfKin.setCustomer(customer);
        return nextOfKin;
    }

    @BeforeEach
    public void initTest() {
        nextOfKin = createEntity(em);
    }

    @Test
    @Transactional
    public void createNextOfKin() throws Exception {
        int databaseSizeBeforeCreate = nextOfKinRepository.findAll().size();
        // Create the NextOfKin
        NextOfKinDTO nextOfKinDTO = nextOfKinMapper.toDto(nextOfKin);
        restNextOfKinMockMvc.perform(post("/api/next-of-kins").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(nextOfKinDTO)))
            .andExpect(status().isCreated());

        // Validate the NextOfKin in the database
        List<NextOfKin> nextOfKinList = nextOfKinRepository.findAll();
        assertThat(nextOfKinList).hasSize(databaseSizeBeforeCreate + 1);
        NextOfKin testNextOfKin = nextOfKinList.get(nextOfKinList.size() - 1);
        assertThat(testNextOfKin.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testNextOfKin.getRelation()).isEqualTo(DEFAULT_RELATION);
        assertThat(testNextOfKin.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testNextOfKin.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);
    }

    @Test
    @Transactional
    public void createNextOfKinWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = nextOfKinRepository.findAll().size();

        // Create the NextOfKin with an existing ID
        nextOfKin.setId(1L);
        NextOfKinDTO nextOfKinDTO = nextOfKinMapper.toDto(nextOfKin);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNextOfKinMockMvc.perform(post("/api/next-of-kins").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(nextOfKinDTO)))
            .andExpect(status().isBadRequest());

        // Validate the NextOfKin in the database
        List<NextOfKin> nextOfKinList = nextOfKinRepository.findAll();
        assertThat(nextOfKinList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllNextOfKins() throws Exception {
        // Initialize the database
        nextOfKinRepository.saveAndFlush(nextOfKin);

        // Get all the nextOfKinList
        restNextOfKinMockMvc.perform(get("/api/next-of-kins?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nextOfKin.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].relation").value(hasItem(DEFAULT_RELATION.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER)));
    }
    
    @Test
    @Transactional
    public void getNextOfKin() throws Exception {
        // Initialize the database
        nextOfKinRepository.saveAndFlush(nextOfKin);

        // Get the nextOfKin
        restNextOfKinMockMvc.perform(get("/api/next-of-kins/{id}", nextOfKin.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(nextOfKin.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.relation").value(DEFAULT_RELATION.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER));
    }
    @Test
    @Transactional
    public void getNonExistingNextOfKin() throws Exception {
        // Get the nextOfKin
        restNextOfKinMockMvc.perform(get("/api/next-of-kins/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNextOfKin() throws Exception {
        // Initialize the database
        nextOfKinRepository.saveAndFlush(nextOfKin);

        int databaseSizeBeforeUpdate = nextOfKinRepository.findAll().size();

        // Update the nextOfKin
        NextOfKin updatedNextOfKin = nextOfKinRepository.findById(nextOfKin.getId()).get();
        // Disconnect from session so that the updates on updatedNextOfKin are not directly saved in db
        em.detach(updatedNextOfKin);
        updatedNextOfKin
            .title(UPDATED_TITLE)
            .relation(UPDATED_RELATION)
            .name(UPDATED_NAME)
            .phoneNumber(UPDATED_PHONE_NUMBER);
        NextOfKinDTO nextOfKinDTO = nextOfKinMapper.toDto(updatedNextOfKin);

        restNextOfKinMockMvc.perform(put("/api/next-of-kins").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(nextOfKinDTO)))
            .andExpect(status().isOk());

        // Validate the NextOfKin in the database
        List<NextOfKin> nextOfKinList = nextOfKinRepository.findAll();
        assertThat(nextOfKinList).hasSize(databaseSizeBeforeUpdate);
        NextOfKin testNextOfKin = nextOfKinList.get(nextOfKinList.size() - 1);
        assertThat(testNextOfKin.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testNextOfKin.getRelation()).isEqualTo(UPDATED_RELATION);
        assertThat(testNextOfKin.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testNextOfKin.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
    }

    @Test
    @Transactional
    public void updateNonExistingNextOfKin() throws Exception {
        int databaseSizeBeforeUpdate = nextOfKinRepository.findAll().size();

        // Create the NextOfKin
        NextOfKinDTO nextOfKinDTO = nextOfKinMapper.toDto(nextOfKin);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNextOfKinMockMvc.perform(put("/api/next-of-kins").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(nextOfKinDTO)))
            .andExpect(status().isBadRequest());

        // Validate the NextOfKin in the database
        List<NextOfKin> nextOfKinList = nextOfKinRepository.findAll();
        assertThat(nextOfKinList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNextOfKin() throws Exception {
        // Initialize the database
        nextOfKinRepository.saveAndFlush(nextOfKin);

        int databaseSizeBeforeDelete = nextOfKinRepository.findAll().size();

        // Delete the nextOfKin
        restNextOfKinMockMvc.perform(delete("/api/next-of-kins/{id}", nextOfKin.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NextOfKin> nextOfKinList = nextOfKinRepository.findAll();
        assertThat(nextOfKinList).hasSize(databaseSizeBeforeDelete - 1);
    }

}
