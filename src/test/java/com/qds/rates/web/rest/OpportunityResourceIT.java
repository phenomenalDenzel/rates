package com.qds.rates.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import com.qds.rates.RatesApp;
import com.qds.rates.domain.Opportunity;
import com.qds.rates.domain.Provider;
import com.qds.rates.domain.enumeration.OpportunityType;
import com.qds.rates.repository.OpportunityRepository;
import com.qds.rates.repository.search.OpportunitySearchRepository;
import com.qds.rates.service.OpportunityService;
import com.qds.rates.service.dto.OpportunityDTO;
import com.qds.rates.service.mapper.OpportunityMapper;
/**
 * Integration tests for the {@link OpportunityResource} REST controller.
 */
@SpringBootTest(classes = RatesApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class OpportunityResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final OpportunityType DEFAULT_TYPE = OpportunityType.ETHICAL_FUND;
    private static final OpportunityType UPDATED_TYPE = OpportunityType.BALANCED_FUND;

    private static final String DEFAULT_SUMMARY = "AAAAAAAAAA";
    private static final String UPDATED_SUMMARY = "BBBBBBBBBB";

    private static final String DEFAULT_FUND_SIZE = "AAAAAAAAAA";
    private static final String UPDATED_FUND_SIZE = "BBBBBBBBBB";

    private static final Instant DEFAULT_START_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Boolean DEFAULT_VISIBLE = false;
    private static final Boolean UPDATED_VISIBLE = true;

    private static final Double DEFAULT_INTEREST_RATE = 1D;
    private static final Double UPDATED_INTEREST_RATE = 2D;

    private static final Integer DEFAULT_TENOR = 1;
    private static final Integer UPDATED_TENOR = 2;

    private static final Double DEFAULT_EFFECTIVE_APR = 1D;
    private static final Double UPDATED_EFFECTIVE_APR = 2D;

    private static final BigDecimal DEFAULT_MINIMUM_INVESTMENT = new BigDecimal(1);
    private static final BigDecimal UPDATED_MINIMUM_INVESTMENT = new BigDecimal(2);

    private static final BigDecimal DEFAULT_DENOMINATION = new BigDecimal(1);
    private static final BigDecimal UPDATED_DENOMINATION = new BigDecimal(2);

    @Autowired
    private OpportunityRepository opportunityRepository;

    @Autowired
    private OpportunityMapper opportunityMapper;

    @Autowired
    private OpportunityService opportunityService;

    /**
     * This repository is mocked in the com.qds.rates.repository.search test package.
     *
     * @see com.qds.rates.repository.search.OpportunitySearchRepositoryMockConfiguration
     */
    @Autowired
    private OpportunitySearchRepository mockOpportunitySearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOpportunityMockMvc;

    private Opportunity opportunity;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Opportunity createEntity(EntityManager em) {
        Opportunity opportunity = new Opportunity()
            .name(DEFAULT_NAME)
            .type(DEFAULT_TYPE)
            .summary(DEFAULT_SUMMARY)
            .fundSize(DEFAULT_FUND_SIZE)
            .startDate(DEFAULT_START_DATE)
            .endDate(DEFAULT_END_DATE)
            .visible(DEFAULT_VISIBLE)
            .interestRate(DEFAULT_INTEREST_RATE)
            .tenor(DEFAULT_TENOR)
            .effectiveApr(DEFAULT_EFFECTIVE_APR)
            .minimumInvestment(DEFAULT_MINIMUM_INVESTMENT)
            .denomination(DEFAULT_DENOMINATION);
        // Add required entity
        Provider provider;
        if (TestUtil.findAll(em, Provider.class).isEmpty()) {
            provider = ProviderResourceIT.createEntity(em);
            em.persist(provider);
            em.flush();
        } else {
            provider = TestUtil.findAll(em, Provider.class).get(0);
        }
        opportunity.setProvider(provider);
        return opportunity;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Opportunity createUpdatedEntity(EntityManager em) {
        Opportunity opportunity = new Opportunity()
            .name(UPDATED_NAME)
            .type(UPDATED_TYPE)
            .summary(UPDATED_SUMMARY)
            .fundSize(UPDATED_FUND_SIZE)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .visible(UPDATED_VISIBLE)
            .interestRate(UPDATED_INTEREST_RATE)
            .tenor(UPDATED_TENOR)
            .effectiveApr(UPDATED_EFFECTIVE_APR)
            .minimumInvestment(UPDATED_MINIMUM_INVESTMENT)
            .denomination(UPDATED_DENOMINATION);
        // Add required entity
        Provider provider;
        if (TestUtil.findAll(em, Provider.class).isEmpty()) {
            provider = ProviderResourceIT.createUpdatedEntity(em);
            em.persist(provider);
            em.flush();
        } else {
            provider = TestUtil.findAll(em, Provider.class).get(0);
        }
        opportunity.setProvider(provider);
        return opportunity;
    }

    @BeforeEach
    public void initTest() {
        opportunity = createEntity(em);
    }

    @Test
    @Transactional
    public void createOpportunity() throws Exception {
        int databaseSizeBeforeCreate = opportunityRepository.findAll().size();
        // Create the Opportunity
        OpportunityDTO opportunityDTO = opportunityMapper.toDto(opportunity);
        restOpportunityMockMvc.perform(post("/api/opportunities").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(opportunityDTO)))
            .andExpect(status().isCreated());

        // Validate the Opportunity in the database
        List<Opportunity> opportunityList = opportunityRepository.findAll();
        assertThat(opportunityList).hasSize(databaseSizeBeforeCreate + 1);
        Opportunity testOpportunity = opportunityList.get(opportunityList.size() - 1);
        assertThat(testOpportunity.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testOpportunity.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testOpportunity.getSummary()).isEqualTo(DEFAULT_SUMMARY);
        assertThat(testOpportunity.getFundSize()).isEqualTo(DEFAULT_FUND_SIZE);
        assertThat(testOpportunity.getStartDate()).isEqualTo(DEFAULT_START_DATE);
        assertThat(testOpportunity.getEndDate()).isEqualTo(DEFAULT_END_DATE);
        assertThat(testOpportunity.isVisible()).isEqualTo(DEFAULT_VISIBLE);
        assertThat(testOpportunity.getInterestRate()).isEqualTo(DEFAULT_INTEREST_RATE);
        assertThat(testOpportunity.getTenor()).isEqualTo(DEFAULT_TENOR);
        assertThat(testOpportunity.getEffectiveApr()).isEqualTo(DEFAULT_EFFECTIVE_APR);
        assertThat(testOpportunity.getMinimumInvestment()).isEqualTo(DEFAULT_MINIMUM_INVESTMENT);
        assertThat(testOpportunity.getDenomination()).isEqualTo(DEFAULT_DENOMINATION);

        // Validate the Opportunity in Elasticsearch
        verify(mockOpportunitySearchRepository, times(1)).save(testOpportunity);
    }

    @Test
    @Transactional
    public void createOpportunityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = opportunityRepository.findAll().size();

        // Create the Opportunity with an existing ID
        opportunity.setId(1L);
        OpportunityDTO opportunityDTO = opportunityMapper.toDto(opportunity);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOpportunityMockMvc.perform(post("/api/opportunities").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(opportunityDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Opportunity in the database
        List<Opportunity> opportunityList = opportunityRepository.findAll();
        assertThat(opportunityList).hasSize(databaseSizeBeforeCreate);

        // Validate the Opportunity in Elasticsearch
        verify(mockOpportunitySearchRepository, times(0)).save(opportunity);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = opportunityRepository.findAll().size();
        // set the field null
        opportunity.setName(null);

        // Create the Opportunity, which fails.
        OpportunityDTO opportunityDTO = opportunityMapper.toDto(opportunity);


        restOpportunityMockMvc.perform(post("/api/opportunities").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(opportunityDTO)))
            .andExpect(status().isBadRequest());

        List<Opportunity> opportunityList = opportunityRepository.findAll();
        assertThat(opportunityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = opportunityRepository.findAll().size();
        // set the field null
        opportunity.setType(null);

        // Create the Opportunity, which fails.
        OpportunityDTO opportunityDTO = opportunityMapper.toDto(opportunity);


        restOpportunityMockMvc.perform(post("/api/opportunities").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(opportunityDTO)))
            .andExpect(status().isBadRequest());

        List<Opportunity> opportunityList = opportunityRepository.findAll();
        assertThat(opportunityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStartDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = opportunityRepository.findAll().size();
        // set the field null
        opportunity.setStartDate(null);

        // Create the Opportunity, which fails.
        OpportunityDTO opportunityDTO = opportunityMapper.toDto(opportunity);


        restOpportunityMockMvc.perform(post("/api/opportunities").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(opportunityDTO)))
            .andExpect(status().isBadRequest());

        List<Opportunity> opportunityList = opportunityRepository.findAll();
        assertThat(opportunityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEndDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = opportunityRepository.findAll().size();
        // set the field null
        opportunity.setEndDate(null);

        // Create the Opportunity, which fails.
        OpportunityDTO opportunityDTO = opportunityMapper.toDto(opportunity);


        restOpportunityMockMvc.perform(post("/api/opportunities").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(opportunityDTO)))
            .andExpect(status().isBadRequest());

        List<Opportunity> opportunityList = opportunityRepository.findAll();
        assertThat(opportunityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOpportunities() throws Exception {
        // Initialize the database
        opportunityRepository.saveAndFlush(opportunity);

        // Get all the opportunityList
        restOpportunityMockMvc.perform(get("/api/opportunities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(opportunity.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].summary").value(hasItem(DEFAULT_SUMMARY.toString())))
            .andExpect(jsonPath("$.[*].fundSize").value(hasItem(DEFAULT_FUND_SIZE)))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].visible").value(hasItem(DEFAULT_VISIBLE.booleanValue())))
            .andExpect(jsonPath("$.[*].interestRate").value(hasItem(DEFAULT_INTEREST_RATE.doubleValue())))
            .andExpect(jsonPath("$.[*].tenor").value(hasItem(DEFAULT_TENOR)))
            .andExpect(jsonPath("$.[*].effectiveApr").value(hasItem(DEFAULT_EFFECTIVE_APR.doubleValue())))
            .andExpect(jsonPath("$.[*].minimumInvestment").value(hasItem(DEFAULT_MINIMUM_INVESTMENT.intValue())))
            .andExpect(jsonPath("$.[*].denomination").value(hasItem(DEFAULT_DENOMINATION.intValue())));
    }

    @Test
    @Transactional
    public void getOpportunity() throws Exception {
        // Initialize the database
        opportunityRepository.saveAndFlush(opportunity);

        // Get the opportunity
        restOpportunityMockMvc.perform(get("/api/opportunities/{id}", opportunity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(opportunity.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.summary").value(DEFAULT_SUMMARY.toString()))
            .andExpect(jsonPath("$.fundSize").value(DEFAULT_FUND_SIZE))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()))
            .andExpect(jsonPath("$.endDate").value(DEFAULT_END_DATE.toString()))
            .andExpect(jsonPath("$.visible").value(DEFAULT_VISIBLE.booleanValue()))
            .andExpect(jsonPath("$.interestRate").value(DEFAULT_INTEREST_RATE.doubleValue()))
            .andExpect(jsonPath("$.tenor").value(DEFAULT_TENOR))
            .andExpect(jsonPath("$.effectiveApr").value(DEFAULT_EFFECTIVE_APR.doubleValue()))
            .andExpect(jsonPath("$.minimumInvestment").value(DEFAULT_MINIMUM_INVESTMENT.intValue()))
            .andExpect(jsonPath("$.denomination").value(DEFAULT_DENOMINATION.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingOpportunity() throws Exception {
        // Get the opportunity
        restOpportunityMockMvc.perform(get("/api/opportunities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOpportunity() throws Exception {
        // Initialize the database
        opportunityRepository.saveAndFlush(opportunity);

        int databaseSizeBeforeUpdate = opportunityRepository.findAll().size();

        // Update the opportunity
        Opportunity updatedOpportunity = opportunityRepository.findById(opportunity.getId()).get();
        // Disconnect from session so that the updates on updatedOpportunity are not directly saved in db
        em.detach(updatedOpportunity);
        updatedOpportunity
            .name(UPDATED_NAME)
            .type(UPDATED_TYPE)
            .summary(UPDATED_SUMMARY)
            .fundSize(UPDATED_FUND_SIZE)
            .startDate(UPDATED_START_DATE)
            .endDate(UPDATED_END_DATE)
            .visible(UPDATED_VISIBLE)
            .interestRate(UPDATED_INTEREST_RATE)
            .tenor(UPDATED_TENOR)
            .effectiveApr(UPDATED_EFFECTIVE_APR)
            .minimumInvestment(UPDATED_MINIMUM_INVESTMENT)
            .denomination(UPDATED_DENOMINATION);
        OpportunityDTO opportunityDTO = opportunityMapper.toDto(updatedOpportunity);

        restOpportunityMockMvc.perform(put("/api/opportunities").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(opportunityDTO)))
            .andExpect(status().isOk());

        // Validate the Opportunity in the database
        List<Opportunity> opportunityList = opportunityRepository.findAll();
        assertThat(opportunityList).hasSize(databaseSizeBeforeUpdate);
        Opportunity testOpportunity = opportunityList.get(opportunityList.size() - 1);
        assertThat(testOpportunity.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testOpportunity.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testOpportunity.getSummary()).isEqualTo(UPDATED_SUMMARY);
        assertThat(testOpportunity.getFundSize()).isEqualTo(UPDATED_FUND_SIZE);
        assertThat(testOpportunity.getStartDate()).isEqualTo(UPDATED_START_DATE);
        assertThat(testOpportunity.getEndDate()).isEqualTo(UPDATED_END_DATE);
        assertThat(testOpportunity.isVisible()).isEqualTo(UPDATED_VISIBLE);
        assertThat(testOpportunity.getInterestRate()).isEqualTo(UPDATED_INTEREST_RATE);
        assertThat(testOpportunity.getTenor()).isEqualTo(UPDATED_TENOR);
        assertThat(testOpportunity.getEffectiveApr()).isEqualTo(UPDATED_EFFECTIVE_APR);
        assertThat(testOpportunity.getMinimumInvestment()).isEqualTo(UPDATED_MINIMUM_INVESTMENT);
        assertThat(testOpportunity.getDenomination()).isEqualTo(UPDATED_DENOMINATION);

        // Validate the Opportunity in Elasticsearch
        verify(mockOpportunitySearchRepository, times(1)).save(testOpportunity);
    }

    @Test
    @Transactional
    public void updateNonExistingOpportunity() throws Exception {
        int databaseSizeBeforeUpdate = opportunityRepository.findAll().size();

        // Create the Opportunity
        OpportunityDTO opportunityDTO = opportunityMapper.toDto(opportunity);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOpportunityMockMvc.perform(put("/api/opportunities").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(opportunityDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Opportunity in the database
        List<Opportunity> opportunityList = opportunityRepository.findAll();
        assertThat(opportunityList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Opportunity in Elasticsearch
        verify(mockOpportunitySearchRepository, times(0)).save(opportunity);
    }

    @Test
    @Transactional
    public void deleteOpportunity() throws Exception {
        // Initialize the database
        opportunityRepository.saveAndFlush(opportunity);

        int databaseSizeBeforeDelete = opportunityRepository.findAll().size();

        // Delete the opportunity
        restOpportunityMockMvc.perform(delete("/api/opportunities/{id}", opportunity.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Opportunity> opportunityList = opportunityRepository.findAll();
        assertThat(opportunityList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Opportunity in Elasticsearch
        verify(mockOpportunitySearchRepository, times(1)).deleteById(opportunity.getId());
    }

    @Test
    @Transactional
    public void searchOpportunity() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        opportunityRepository.saveAndFlush(opportunity);
        when(mockOpportunitySearchRepository.search(queryStringQuery("id:" + opportunity.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(opportunity), PageRequest.of(0, 1), 1));

        // Search the opportunity
        restOpportunityMockMvc.perform(get("/api/_search/opportunities?query=id:" + opportunity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(opportunity.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].summary").value(hasItem(DEFAULT_SUMMARY.toString())))
            .andExpect(jsonPath("$.[*].fundSize").value(hasItem(DEFAULT_FUND_SIZE)))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())))
            .andExpect(jsonPath("$.[*].endDate").value(hasItem(DEFAULT_END_DATE.toString())))
            .andExpect(jsonPath("$.[*].visible").value(hasItem(DEFAULT_VISIBLE.booleanValue())))
            .andExpect(jsonPath("$.[*].interestRate").value(hasItem(DEFAULT_INTEREST_RATE.doubleValue())))
            .andExpect(jsonPath("$.[*].tenor").value(hasItem(DEFAULT_TENOR)))
            .andExpect(jsonPath("$.[*].effectiveApr").value(hasItem(DEFAULT_EFFECTIVE_APR.doubleValue())))
            .andExpect(jsonPath("$.[*].minimumInvestment").value(hasItem(DEFAULT_MINIMUM_INVESTMENT.intValue())))
            .andExpect(jsonPath("$.[*].denomination").value(hasItem(DEFAULT_DENOMINATION.intValue())));
    }

}
