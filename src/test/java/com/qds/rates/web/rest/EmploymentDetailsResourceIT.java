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
import com.qds.rates.domain.EmploymentDetails;
import com.qds.rates.repository.EmploymentDetailsRepository;
import com.qds.rates.service.EmploymentDetailsService;
import com.qds.rates.service.dto.EmploymentDetailsDTO;
import com.qds.rates.service.mapper.EmploymentDetailsMapper;

/**
 * Integration tests for the {@link EmploymentDetailsResource} REST controller.
 */
@SpringBootTest(classes = RatesApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class EmploymentDetailsResourceIT {

    private static final String DEFAULT_COMPANY_NAME = "AAAAAAAAAA";
    private static final String UPDATED_COMPANY_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_OFFICIAL_WEBSITE = "AAAAAAAAAA";
    private static final String UPDATED_OFFICIAL_WEBSITE = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS_LINE_1 = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS_LINE_1 = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS_LINE_2 = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS_LINE_2 = "BBBBBBBBBB";

    @Autowired
    private EmploymentDetailsRepository employmentDetailsRepository;

    @Autowired
    private EmploymentDetailsMapper employmentDetailsMapper;

    @Autowired
    private EmploymentDetailsService employmentDetailsService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEmploymentDetailsMockMvc;

    private EmploymentDetails employmentDetails;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EmploymentDetails createEntity(EntityManager em) {
        EmploymentDetails employmentDetails = new EmploymentDetails()
            .companyName(DEFAULT_COMPANY_NAME)
            .officialWebsite(DEFAULT_OFFICIAL_WEBSITE)
            .addressLine1(DEFAULT_ADDRESS_LINE_1)
            .addressLine2(DEFAULT_ADDRESS_LINE_2);
        // Add required entity
        Customer customer;
        if (TestUtil.findAll(em, Customer.class).isEmpty()) {
            customer = CustomerResourceIT.createEntity(em);
            em.persist(customer);
            em.flush();
        } else {
            customer = TestUtil.findAll(em, Customer.class).get(0);
        }
        employmentDetails.setCustomer(customer);
        return employmentDetails;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EmploymentDetails createUpdatedEntity(EntityManager em) {
        EmploymentDetails employmentDetails = new EmploymentDetails()
            .companyName(UPDATED_COMPANY_NAME)
            .officialWebsite(UPDATED_OFFICIAL_WEBSITE)
            .addressLine1(UPDATED_ADDRESS_LINE_1)
            .addressLine2(UPDATED_ADDRESS_LINE_2);
        // Add required entity
        Customer customer;
        if (TestUtil.findAll(em, Customer.class).isEmpty()) {
            customer = CustomerResourceIT.createUpdatedEntity(em);
            em.persist(customer);
            em.flush();
        } else {
            customer = TestUtil.findAll(em, Customer.class).get(0);
        }
        employmentDetails.setCustomer(customer);
        return employmentDetails;
    }

    @BeforeEach
    public void initTest() {
        employmentDetails = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmploymentDetails() throws Exception {
        int databaseSizeBeforeCreate = employmentDetailsRepository.findAll().size();
        // Create the EmploymentDetails
        EmploymentDetailsDTO employmentDetailsDTO = employmentDetailsMapper.toDto(employmentDetails);
        restEmploymentDetailsMockMvc.perform(post("/api/employment-details").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(employmentDetailsDTO)))
            .andExpect(status().isCreated());

        // Validate the EmploymentDetails in the database
        List<EmploymentDetails> employmentDetailsList = employmentDetailsRepository.findAll();
        assertThat(employmentDetailsList).hasSize(databaseSizeBeforeCreate + 1);
        EmploymentDetails testEmploymentDetails = employmentDetailsList.get(employmentDetailsList.size() - 1);
        assertThat(testEmploymentDetails.getCompanyName()).isEqualTo(DEFAULT_COMPANY_NAME);
        assertThat(testEmploymentDetails.getOfficialWebsite()).isEqualTo(DEFAULT_OFFICIAL_WEBSITE);
        assertThat(testEmploymentDetails.getAddressLine1()).isEqualTo(DEFAULT_ADDRESS_LINE_1);
        assertThat(testEmploymentDetails.getAddressLine2()).isEqualTo(DEFAULT_ADDRESS_LINE_2);

        // Validate the id for MapsId, the ids must be same
        assertThat(testEmploymentDetails.getId()).isEqualTo(testEmploymentDetails.getCustomer().getId());
    }

    @Test
    @Transactional
    public void createEmploymentDetailsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = employmentDetailsRepository.findAll().size();

        // Create the EmploymentDetails with an existing ID
        employmentDetails.setId(1L);
        EmploymentDetailsDTO employmentDetailsDTO = employmentDetailsMapper.toDto(employmentDetails);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmploymentDetailsMockMvc.perform(post("/api/employment-details").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(employmentDetailsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the EmploymentDetails in the database
        List<EmploymentDetails> employmentDetailsList = employmentDetailsRepository.findAll();
        assertThat(employmentDetailsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void updateEmploymentDetailsMapsIdAssociationWithNewId() throws Exception {
        // Initialize the database
        employmentDetailsRepository.saveAndFlush(employmentDetails);
        int databaseSizeBeforeCreate = employmentDetailsRepository.findAll().size();

        // Add a new parent entity
        Customer customer = CustomerResourceIT.createUpdatedEntity(em);
        em.persist(customer);
        em.flush();

        // Load the employmentDetails
        EmploymentDetails updatedEmploymentDetails = employmentDetailsRepository.findById(employmentDetails.getId()).get();
        // Disconnect from session so that the updates on updatedEmploymentDetails are not directly saved in db
        em.detach(updatedEmploymentDetails);

        // Update the Customer with new association value
        updatedEmploymentDetails.setCustomer(customer);
        EmploymentDetailsDTO updatedEmploymentDetailsDTO = employmentDetailsMapper.toDto(updatedEmploymentDetails);

        // Update the entity
        restEmploymentDetailsMockMvc.perform(put("/api/employment-details").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmploymentDetailsDTO)))
            .andExpect(status().isOk());

        // Validate the EmploymentDetails in the database
        List<EmploymentDetails> employmentDetailsList = employmentDetailsRepository.findAll();
        assertThat(employmentDetailsList).hasSize(databaseSizeBeforeCreate);
        EmploymentDetails testEmploymentDetails = employmentDetailsList.get(employmentDetailsList.size() - 1);

        // Validate the id for MapsId, the ids must be same
        // Uncomment the following line for assertion. However, please note that there is a known issue and uncommenting will fail the test.
        // Please look at https://github.com/jhipster/generator-jhipster/issues/9100. You can modify this test as necessary.
        // assertThat(testEmploymentDetails.getId()).isEqualTo(testEmploymentDetails.getCustomer().getId());
    }

    @Test
    @Transactional
    public void checkCompanyNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = employmentDetailsRepository.findAll().size();
        // set the field null
        employmentDetails.setCompanyName(null);

        // Create the EmploymentDetails, which fails.
        EmploymentDetailsDTO employmentDetailsDTO = employmentDetailsMapper.toDto(employmentDetails);


        restEmploymentDetailsMockMvc.perform(post("/api/employment-details").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(employmentDetailsDTO)))
            .andExpect(status().isBadRequest());

        List<EmploymentDetails> employmentDetailsList = employmentDetailsRepository.findAll();
        assertThat(employmentDetailsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEmploymentDetails() throws Exception {
        // Initialize the database
        employmentDetailsRepository.saveAndFlush(employmentDetails);

        // Get all the employmentDetailsList
        restEmploymentDetailsMockMvc.perform(get("/api/employment-details?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(employmentDetails.getId().intValue())))
            .andExpect(jsonPath("$.[*].companyName").value(hasItem(DEFAULT_COMPANY_NAME)))
            .andExpect(jsonPath("$.[*].officialWebsite").value(hasItem(DEFAULT_OFFICIAL_WEBSITE)))
            .andExpect(jsonPath("$.[*].addressLine1").value(hasItem(DEFAULT_ADDRESS_LINE_1)))
            .andExpect(jsonPath("$.[*].addressLine2").value(hasItem(DEFAULT_ADDRESS_LINE_2)));
    }
    
    @Test
    @Transactional
    public void getEmploymentDetails() throws Exception {
        // Initialize the database
        employmentDetailsRepository.saveAndFlush(employmentDetails);

        // Get the employmentDetails
        restEmploymentDetailsMockMvc.perform(get("/api/employment-details/{id}", employmentDetails.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(employmentDetails.getId().intValue()))
            .andExpect(jsonPath("$.companyName").value(DEFAULT_COMPANY_NAME))
            .andExpect(jsonPath("$.officialWebsite").value(DEFAULT_OFFICIAL_WEBSITE))
            .andExpect(jsonPath("$.addressLine1").value(DEFAULT_ADDRESS_LINE_1))
            .andExpect(jsonPath("$.addressLine2").value(DEFAULT_ADDRESS_LINE_2));
    }
    @Test
    @Transactional
    public void getNonExistingEmploymentDetails() throws Exception {
        // Get the employmentDetails
        restEmploymentDetailsMockMvc.perform(get("/api/employment-details/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmploymentDetails() throws Exception {
        // Initialize the database
        employmentDetailsRepository.saveAndFlush(employmentDetails);

        int databaseSizeBeforeUpdate = employmentDetailsRepository.findAll().size();

        // Update the employmentDetails
        EmploymentDetails updatedEmploymentDetails = employmentDetailsRepository.findById(employmentDetails.getId()).get();
        // Disconnect from session so that the updates on updatedEmploymentDetails are not directly saved in db
        em.detach(updatedEmploymentDetails);
        updatedEmploymentDetails
            .companyName(UPDATED_COMPANY_NAME)
            .officialWebsite(UPDATED_OFFICIAL_WEBSITE)
            .addressLine1(UPDATED_ADDRESS_LINE_1)
            .addressLine2(UPDATED_ADDRESS_LINE_2);
        EmploymentDetailsDTO employmentDetailsDTO = employmentDetailsMapper.toDto(updatedEmploymentDetails);

        restEmploymentDetailsMockMvc.perform(put("/api/employment-details").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(employmentDetailsDTO)))
            .andExpect(status().isOk());

        // Validate the EmploymentDetails in the database
        List<EmploymentDetails> employmentDetailsList = employmentDetailsRepository.findAll();
        assertThat(employmentDetailsList).hasSize(databaseSizeBeforeUpdate);
        EmploymentDetails testEmploymentDetails = employmentDetailsList.get(employmentDetailsList.size() - 1);
        assertThat(testEmploymentDetails.getCompanyName()).isEqualTo(UPDATED_COMPANY_NAME);
        assertThat(testEmploymentDetails.getOfficialWebsite()).isEqualTo(UPDATED_OFFICIAL_WEBSITE);
        assertThat(testEmploymentDetails.getAddressLine1()).isEqualTo(UPDATED_ADDRESS_LINE_1);
        assertThat(testEmploymentDetails.getAddressLine2()).isEqualTo(UPDATED_ADDRESS_LINE_2);
    }

    @Test
    @Transactional
    public void updateNonExistingEmploymentDetails() throws Exception {
        int databaseSizeBeforeUpdate = employmentDetailsRepository.findAll().size();

        // Create the EmploymentDetails
        EmploymentDetailsDTO employmentDetailsDTO = employmentDetailsMapper.toDto(employmentDetails);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEmploymentDetailsMockMvc.perform(put("/api/employment-details").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(employmentDetailsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the EmploymentDetails in the database
        List<EmploymentDetails> employmentDetailsList = employmentDetailsRepository.findAll();
        assertThat(employmentDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEmploymentDetails() throws Exception {
        // Initialize the database
        employmentDetailsRepository.saveAndFlush(employmentDetails);

        int databaseSizeBeforeDelete = employmentDetailsRepository.findAll().size();

        // Delete the employmentDetails
        restEmploymentDetailsMockMvc.perform(delete("/api/employment-details/{id}", employmentDetails.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EmploymentDetails> employmentDetailsList = employmentDetailsRepository.findAll();
        assertThat(employmentDetailsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
