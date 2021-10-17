package com.qds.rates.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.isA;
import static org.hamcrest.Matchers.notNullValue;
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
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
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
import com.qds.rates.domain.Application;
import com.qds.rates.domain.Customer;
import com.qds.rates.domain.Opportunity;
import com.qds.rates.domain.Wallet;
import com.qds.rates.domain.enumeration.ApplicationStatus;
import com.qds.rates.repository.ApplicationRepository;
import com.qds.rates.repository.WalletRepository;
import com.qds.rates.service.CustomerService;
import com.qds.rates.service.UserService;
import com.qds.rates.service.dto.ApplicationDTO;
import com.qds.rates.service.dto.CustomerDTO;
import com.qds.rates.service.dto.LocationDTO;
import com.qds.rates.service.dto.builders.CustomerDTOBuilder;
import com.qds.rates.service.mapper.ApplicationMapper;
import com.qds.rates.service.mapper.CustomerMapper;
import com.qds.rates.service.mapper.LocationMapper;

/**
 * Integration tests for the {@link ApplicationResource} REST controller.
 */
@SpringBootTest(classes = RatesApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class ApplicationResourceIT {

    private static final String DEFAULT_APPLICATION_ID = "AAAAAAAAAA";
    private static final String UPDATED_APPLICATION_ID = "BBBBBBBBBB";

    private static final ApplicationStatus DEFAULT_STATUS = ApplicationStatus.PROCESSING;
    private static final ApplicationStatus UPDATED_STATUS = ApplicationStatus.COMPLETE;

    private static final BigDecimal DEFAULT_AMOUNT = new BigDecimal(1);
    private static final BigDecimal UPDATED_AMOUNT = new BigDecimal(2);

    private static final String DEFAULT_EXTERNAL_ID = "AAAAAAAAAA";
    private static final String UPDATED_EXTERNAL_ID = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_BALANCE = new BigDecimal(1);
    private static final BigDecimal UPDATED_BALANCE = new BigDecimal(2);

    private final Logger logger = LoggerFactory.getLogger(ApplicationResourceIT.class);

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private ApplicationMapper applicationMapper;

    @Autowired
    private CustomerMapper customerMapper;

    @Autowired
    LocationMapper locationMapper;

    @Autowired
    private UserService userService;

    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restApplicationMockMvc;

    private Application application;

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Application createEntity(EntityManager em) {
        Application application = new Application().applicationId(DEFAULT_APPLICATION_ID)
                                                   .status(DEFAULT_STATUS)
                                                   .amount(DEFAULT_AMOUNT);
        // Add required entity
        Customer customer;
        if (TestUtil.findAll(em, Customer.class)
                    .isEmpty()) {
            customer = CustomerResourceIT.createEntity(em);
            em.persist(customer);
            em.flush();
        } else {
            customer = TestUtil.findAll(em, Customer.class)
                               .get(0);
        }
        application.setCustomer(customer);
        // Add required entity
        Opportunity opportunity;
        if (TestUtil.findAll(em, Opportunity.class)
                    .isEmpty()) {
            opportunity = OpportunityResourceIT.createEntity(em);
            em.persist(opportunity);
            em.flush();
        } else {
            opportunity = TestUtil.findAll(em, Opportunity.class)
                                  .get(0);
        }
        application.setOpportunity(opportunity);
        return application;
    }

    /**
     * Create an updated entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Application createUpdatedEntity(EntityManager em) {
        Application application = new Application().applicationId(UPDATED_APPLICATION_ID)
                                                   .status(UPDATED_STATUS)
                                                   .amount(UPDATED_AMOUNT);
        // Add required entity
        Customer customer;
        if (TestUtil.findAll(em, Customer.class)
                    .isEmpty()) {
            customer = CustomerResourceIT.createUpdatedEntity(em);
            em.persist(customer);
            em.flush();
        } else {
            customer = TestUtil.findAll(em, Customer.class)
                               .get(0);
        }
        application.setCustomer(customer);
        // Add required entity
        Opportunity opportunity;
        if (TestUtil.findAll(em, Opportunity.class)
                    .isEmpty()) {
            opportunity = OpportunityResourceIT.createUpdatedEntity(em);
            em.persist(opportunity);
            em.flush();
        } else {
            opportunity = TestUtil.findAll(em, Opportunity.class)
                                  .get(0);
        }
        application.setOpportunity(opportunity);
        return application;
    }

    public static Wallet createWalletEntityForCustomer(EntityManager em) {
        Wallet wallet = new Wallet()
                .externalId(DEFAULT_EXTERNAL_ID)
                .balance(DEFAULT_BALANCE);
        return wallet;
    }

    @BeforeEach
    public void initTest() {
        application = createEntity(em);
    }

    @Disabled
    @Test
    @Transactional
    public void createApplication() throws Exception {
        int databaseSizeBeforeCreate = applicationRepository.findAll()
                                                            .size();
        // Create the Application
        ApplicationDTO applicationDTO = applicationMapper.toDto(application);
        CustomerDTO customerDTO = customerMapper.toDto(application.getCustomer());
        customerService.registerCustomer(customerDTO);
        restApplicationMockMvc.perform(post("/api/applications").with(csrf())
                                                                .contentType(MediaType.APPLICATION_JSON)
                                                                .content(TestUtil.convertObjectToJsonBytes(applicationDTO)))
                              .andExpect(status().isCreated());

        // Validate the Application in the database
        List<Application> applicationList = applicationRepository.findAll();
        assertThat(applicationList).hasSize(databaseSizeBeforeCreate + 1);
        Application testApplication = applicationList.get(applicationList.size() - 1);
        assertThat(testApplication.getApplicationId()).isNotEmpty();
        assertThat(testApplication.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testApplication.getAmount()).isEqualTo(DEFAULT_AMOUNT);
    }

    @Test
    @Transactional
    public void createApplicationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = applicationRepository.findAll()
                                                            .size();

        // Create the Application with an existing ID
        application.setId(1L);
        ApplicationDTO applicationDTO = applicationMapper.toDto(application);

        // An entity with an existing ID cannot be created, so this API call must fail
        restApplicationMockMvc.perform(post("/api/applications").with(csrf())
                                                                .contentType(MediaType.APPLICATION_JSON)
                                                                .content(TestUtil.convertObjectToJsonBytes(applicationDTO)))
                              .andExpect(status().isBadRequest());

        // Validate the Application in the database
        List<Application> applicationList = applicationRepository.findAll();
        assertThat(applicationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = applicationRepository.findAll()
                                                          .size();
        // set the field null
        application.setAmount(null);

        // Create the Application, which fails.
        ApplicationDTO applicationDTO = applicationMapper.toDto(application);

        restApplicationMockMvc.perform(post("/api/applications").with(csrf())
                                                                .contentType(MediaType.APPLICATION_JSON)
                                                                .content(TestUtil.convertObjectToJsonBytes(applicationDTO)))
                              .andExpect(status().isBadRequest());

        List<Application> applicationList = applicationRepository.findAll();
        assertThat(applicationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllApplications() throws Exception {
        // Initialize the database
        applicationRepository.saveAndFlush(application);

        // Get all the applicationList
        restApplicationMockMvc.perform(get("/api/applications?sort=id,desc"))
                              .andExpect(status().isOk())
                              .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
                              .andExpect(jsonPath("$.[*].id").value(hasItem(application.getId()
                                                                                       .intValue())))
                              .andExpect(jsonPath("$.[*].applicationId").value(hasItem(DEFAULT_APPLICATION_ID)))
                              .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
                              .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())));
    }

    @Test
    @Transactional
    public void getApplication() throws Exception {
        // Initialize the database
        applicationRepository.saveAndFlush(application);

        // Get the application
        restApplicationMockMvc.perform(get("/api/applications/{id}", application.getId()))
                              .andExpect(status().isOk())
                              .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
                              .andExpect(jsonPath("$.id").value(application.getId()
                                                                           .intValue()))
                              .andExpect(jsonPath("$.applicationId").value(DEFAULT_APPLICATION_ID))
                              .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
                              .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.intValue()))
                              .andExpect(jsonPath("$.opportunity").isNotEmpty());
    }

    @Test
    @Transactional
    public void getNonExistingApplication() throws Exception {
        // Get the application
        restApplicationMockMvc.perform(get("/api/applications/{id}", Long.MAX_VALUE))
                              .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateApplication() throws Exception {
        // Initialize the database
        applicationRepository.saveAndFlush(application);

        int databaseSizeBeforeUpdate = applicationRepository.findAll()
                                                            .size();

        // Update the application
        Application updatedApplication = applicationRepository.findById(application.getId())
                                                              .get();
        // Disconnect from session so that the updates on updatedApplication are not directly saved in db
        em.detach(updatedApplication);
        updatedApplication.applicationId(UPDATED_APPLICATION_ID)
                          .status(UPDATED_STATUS)
                          .amount(UPDATED_AMOUNT);
        ApplicationDTO applicationDTO = applicationMapper.toDto(updatedApplication);

        restApplicationMockMvc.perform(put("/api/applications").with(csrf())
                                                               .contentType(MediaType.APPLICATION_JSON)
                                                               .content(TestUtil.convertObjectToJsonBytes(applicationDTO)))
                              .andExpect(status().isOk());

        // Validate the Application in the database
        List<Application> applicationList = applicationRepository.findAll();
        assertThat(applicationList).hasSize(databaseSizeBeforeUpdate);
        Application testApplication = applicationList.get(applicationList.size() - 1);
        assertThat(testApplication.getApplicationId()).isEqualTo(UPDATED_APPLICATION_ID);
        assertThat(testApplication.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testApplication.getAmount()).isEqualTo(UPDATED_AMOUNT);
    }

    @Test
    @Transactional
    public void updateNonExistingApplication() throws Exception {
        int databaseSizeBeforeUpdate = applicationRepository.findAll()
                                                            .size();

        // Create the Application
        ApplicationDTO applicationDTO = applicationMapper.toDto(application);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restApplicationMockMvc.perform(put("/api/applications").with(csrf())
                                                               .contentType(MediaType.APPLICATION_JSON)
                                                               .content(TestUtil.convertObjectToJsonBytes(applicationDTO)))
                              .andExpect(status().isBadRequest());

        // Validate the Application in the database
        List<Application> applicationList = applicationRepository.findAll();
        assertThat(applicationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteApplication() throws Exception {
        // Initialize the database
        applicationRepository.saveAndFlush(application);

        int databaseSizeBeforeDelete = applicationRepository.findAll()
                                                            .size();

        // Delete the application
        restApplicationMockMvc.perform(delete("/api/applications/{id}", application.getId()).with(csrf())
                                                                                            .accept(MediaType.APPLICATION_JSON))
                              .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Application> applicationList = applicationRepository.findAll();
        assertThat(applicationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @WithMockUser(value = "denzel")
    @Transactional
    public void applyOpportunity_ShouldThrowThrowInvalidAmountException_WhenAppliedAmountDoesNotMeetOpportunityAmount() throws Exception{
        LocationDTO location = locationMapper.toDto(LocationResourceIT.createEntity(em));
        CustomerDTO customerDTO = CustomerDTOBuilder.builder(userService,"denzel")
                                                    .withLocation(location)
                                                    .withEmail("test@denzel.com")
                                                    .withBvn("12312389091")
                                                    .build();

        customerService.registerCustomer(customerDTO);
        application.setAmount(new BigDecimal(1234));
        application.getOpportunity().setDenomination(new BigDecimal(333));
        ApplicationDTO applicationDTO = applicationMapper.toDto(application);


        restApplicationMockMvc.perform(post("/api/applications/customer/apply").with(csrf())
                                                                               .contentType(MediaType.APPLICATION_JSON)
                                                                               .content(TestUtil.convertObjectToJsonBytes(applicationDTO)))
                              .andExpect(status().isPreconditionFailed());
    }

    @Test
    @WithMockUser(value = "customer")
    @Transactional
    public void applyOpportunity_ShouldThrowThrowInsufficientAmountException_WhenWalletBalanceIsLessThanAppliedAmount() throws Exception{
        LocationDTO location = locationMapper.toDto(LocationResourceIT.createEntity(em));
        CustomerDTO customerDTO = CustomerDTOBuilder.builder(userService, "customer")
                                                    .withLocation(location)
                                                    .withEmail("test@customer.com")
                                                    .withBvn("12312389090")
                                                    .build();

        customerDTO = customerService.registerCustomer(customerDTO);
        Customer customerEntity = customerMapper.toEntity(customerDTO);

        Wallet walletEntityForCustomer = createWalletEntityForCustomer(em);
        walletEntityForCustomer.setId(customerEntity.getWallet().getId());
        walletEntityForCustomer.setCustomer(customerEntity);
        em.merge(walletEntityForCustomer);

        application.setAmount(new BigDecimal(1000));
        application.getOpportunity().setMinimumInvestment(new BigDecimal(500));
        application.getOpportunity().setDenomination(new BigDecimal(50));
        application.setApplicationId(null);
        application.setStatus(null);
        application.setCustomer(customerEntity);
        ApplicationDTO applicationDTO = applicationMapper.toDto(application);

        restApplicationMockMvc.perform(post("/api/applications/customer/apply").with(csrf())
                                                                               .contentType(MediaType.APPLICATION_JSON)
                                                                               .content(TestUtil.convertObjectToJsonBytes(applicationDTO)))
                              .andExpect(status().isPreconditionFailed());
    }

    @Test
    @WithMockUser(value = "user1")
    @Transactional
    public void applyOpportunity_ShouldSucceed_WhenApplicationAmountMeetsOpportunityAmount() throws Exception{
        LocationDTO location = locationMapper.toDto(LocationResourceIT.createEntity(em));
        CustomerDTO customerDTO = CustomerDTOBuilder.builder(userService, "user1")
                                                    .withLocation(location)
                                                    .withEmail("test@user1.com")
                                                    .withBvn("12312389090")
                                                    .build();

        customerDTO = customerService.registerCustomer(customerDTO);
        customerDTO = customerService.verifyCustomer(customerDTO);

        Customer customerEntity = customerMapper.toEntity(customerDTO);

        Wallet wallet =  walletRepository.findById(customerDTO.getWalletId()).get();
        wallet.setBalance(new BigDecimal(1000));
        //Edited wallet because it has already been created during customer creation
        em.merge(wallet);

        BigDecimal amount = new BigDecimal(1000);
        application.setAmount(amount);
        application.getOpportunity().setMinimumInvestment(new BigDecimal(500));
        application.getOpportunity().setDenomination(new BigDecimal(50));
        application.setApplicationId(null);
        application.setStatus(null);
        application.setCustomer(customerEntity);
        ApplicationDTO applicationDTO = applicationMapper.toDto(application);

        BigDecimal walletBalanceBeforeApply = wallet.getBalance().subtract(amount);

        restApplicationMockMvc.perform(post("/api/applications/customer/apply").with(csrf())
                                                                               .contentType(MediaType.APPLICATION_JSON)
                                                                               .content(TestUtil.convertObjectToJsonBytes(applicationDTO)))
                              .andExpect(status().isCreated())
                              .andExpect(jsonPath("$.status").value(ApplicationStatus.PROCESSING.toString()))
                              .andExpect(jsonPath("$.applicationId").value(notNullValue()))
                              .andExpect(jsonPath("$.customerId").value(customerEntity.getId()))
                              .andExpect(jsonPath("$.opportunityId").value(application.getOpportunity().getId()))
                              .andExpect(jsonPath("$.amount").value(amount));

        assertThat(wallet.getBalance()).isEqualTo(walletBalanceBeforeApply);
    }
}
