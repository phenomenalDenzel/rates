package com.qds.rates.web.rest;

import static org.hamcrest.Matchers.contains;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import javax.persistence.EntityManager;
import java.math.BigDecimal;

import org.junit.jupiter.api.Assertions;
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
import com.qds.rates.domain.Application;
import com.qds.rates.domain.Customer;
import com.qds.rates.domain.Opportunity;
import com.qds.rates.domain.Wallet;
import com.qds.rates.domain.enumeration.ApplicationStatus;
import com.qds.rates.repository.ApplicationRepository;
import com.qds.rates.repository.WalletRepository;
import com.qds.rates.security.AuthoritiesConstants;
import com.qds.rates.service.CustomerService;
import com.qds.rates.service.DashboardService;
import com.qds.rates.service.UserService;
import com.qds.rates.service.dto.CustomerDTO;
import com.qds.rates.service.dto.LocationDTO;
import com.qds.rates.service.dto.builders.CustomerDTOBuilder;
import com.qds.rates.service.mapper.CustomerMapper;
import com.qds.rates.service.mapper.LocationMapper;

@SpringBootTest(classes = RatesApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class PortfolioResourceIT {

    private static final String DEFAULT_APPLICATION_ID = "AAAAAAAAAA";
    private static final ApplicationStatus DEFAULT_STATUS = ApplicationStatus.PROCESSING;
    private static final BigDecimal DEFAULT_AMOUNT = new BigDecimal(1);
    private static final String CUSTOMER_LOGIN = "myUser";

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private LocationMapper locationMapper;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private CustomerMapper customerMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restApplicationMockMvc;

    @Autowired
    private DashboardService dashboardService;

    private Application application;

    public static Application createEntity(EntityManager em) {
        Application application = new Application()
            .applicationId(DEFAULT_APPLICATION_ID)
            .status(DEFAULT_STATUS)
            .amount(DEFAULT_AMOUNT);
        // Add required entity
        Opportunity opportunity;
        if (TestUtil.findAll(em, Opportunity.class).isEmpty()) {
            opportunity = OpportunityResourceIT.createEntity(em);
            em.persist(opportunity);
            em.flush();
        } else {
            opportunity = TestUtil.findAll(em, Opportunity.class).get(0);
        }
        application.setOpportunity(opportunity);
        // Add required entity
        Customer customer;
        if (TestUtil.findAll(em, Customer.class).isEmpty()) {
            customer = CustomerResourceIT.createEntity(em);
            em.persist(customer);
            em.flush();
        } else {
            customer = TestUtil.findAll(em, Customer.class).get(0);
        }
        application.setCustomer(customer);
        return application;
    }

    public static void saveApplications(Application application,EntityManager em){
        em.persist(application);
        em.flush();
    }

    @BeforeEach
    public void initTest() {
        application = createEntity(em);
    }

    @Test
    @Transactional
    @WithMockUser(authorities = AuthoritiesConstants.ADMIN)
    public void getAllApplicationsForCustomerAsAnAdminUser() throws Exception {
        // Initialize the database
        Application testApp = applicationRepository.saveAndFlush(application);
        Long customerId = testApp.getCustomer()
                             .getId();

        // Get all the applicationList
        restApplicationMockMvc.perform(get("/api/customer/{customerId}/applications?sort=id,desc", customerId))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testApp.getId().intValue())))
            .andExpect(jsonPath("$.[*].applicationId").value(hasItem(DEFAULT_APPLICATION_ID)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())))
                              .andExpect(jsonPath("$.[*].opportunity.name").value(hasItem("AAAAAAAAAA")));

    }


    @Test
    @Transactional
    @WithMockUser(authorities = AuthoritiesConstants.EMPLOYEE)
    public void getAllApplicationsForCustomerAsAnEmployee() throws Exception {
        // Initialize the database
        applicationRepository.saveAndFlush(application);
        Long customerId = application.getCustomer()
                                     .getId();

        // Get all the applicationList
        restApplicationMockMvc.perform(get("/api/customer/{customerId}/applications?sort=id,desc", customerId))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(application.getId().intValue())))
            .andExpect(jsonPath("$.[*].applicationId").value(hasItem(DEFAULT_APPLICATION_ID)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].opportunity.name").value(hasItem("AAAAAAAAAA")));
    }

    @Test
    @Transactional
    @WithMockUser(authorities = AuthoritiesConstants.USER)
    public void getAllApplicationsForCustomerAsAPlainUser() throws Exception {
        // Initialize the database
        applicationRepository.saveAndFlush(application);
        Long customerId = application.getCustomer()
                                     .getId();

        // Get all the applicationList
        restApplicationMockMvc.perform(get("/api/customer/{customerId}/applications?sort=id,desc", customerId))
                              .andExpect(status().isOk())
                              .andExpect(jsonPath("$.*").doesNotExist());
    }

    @Test
    @Transactional
    @WithUnauthenticatedMockUser
    public void getAllApplicationsForCustomerAsUnauthenticatedUser() throws Exception {
        // Initialize the database
        applicationRepository.saveAndFlush(application);
        Long customerId = application.getCustomer()
                                     .getId();

        // Get all the applicationList
        restApplicationMockMvc.perform(get("/api/customer/{customerId}/applications?sort=id,desc", customerId))
            .andExpect(status().isUnauthorized());
    }

    @Test
    @Transactional
    @WithMockUser(value = "test7")
    public void getAllYourApplicationsAsACustomer() throws Exception {
        // Initialize the database
        LocationDTO location = locationMapper.toDto(LocationResourceIT.createEntity(em));

        CustomerDTO customerDTO = CustomerDTOBuilder.builder(userService, "test7")
                                                    .withLocation(location)
                                                    .withEmail("test@denzel.com")
                                                    .withBvn("12312389091")
                                                    .build();

        customerDTO = customerService.registerCustomer(customerDTO);
        Customer customerEntity = customerMapper.toEntity(customerDTO);
        Application app =  createEntity(em);
        app.setCustomer(customerEntity);
        applicationRepository.saveAndFlush(app);
        Long customerId = app.getCustomer()
                                     .getId();

        // Get all the applicationList
        restApplicationMockMvc.perform(get("/api/customer/{customerId}/applications?sort=id,desc", customerId))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(app.getId().intValue())))
            .andExpect(jsonPath("$.[*].applicationId").value(hasItem(DEFAULT_APPLICATION_ID)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())))
                              .andExpect(jsonPath("$.[*].opportunity.name").value(hasItem("AAAAAAAAAA")));
    }

    @Test
    @Transactional
    @WithMockUser(value = "test5")
    public void aCustomerShouldNotGetAllApplicationsForAnotherCustomer() throws Exception {
        // Initialize the database
        LocationDTO location = locationMapper.toDto(LocationResourceIT.createEntity(em));

        CustomerDTO customerDTO = CustomerDTOBuilder.builder(userService, "test5")
                                                    .withLocation(location)
                                                    .withEmail("test@denzel.com")
                                                    .withBvn("12318889091")
                                                    .build();
        customerDTO = customerService.registerCustomer(customerDTO);
        Customer customerEntity = customerMapper.toEntity(customerDTO);
        Application testApp =  createEntity(em);
        testApp.setCustomer(customerEntity);
        applicationRepository.saveAndFlush(testApp);
        Long customerId = testApp.getCustomer()
                                     .getId();


        // Get all the applicationList
        restApplicationMockMvc.perform(get("/api/customer/{customerId}/applications?sort=id,desc", customerId + 5))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testApp.getId().intValue())))
            .andExpect(jsonPath("$.[*].applicationId").value(hasItem(DEFAULT_APPLICATION_ID)))
            .andExpect(jsonPath("$.[*].customerId").value(hasItem(customerId.intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())))
                              .andExpect(jsonPath("$.[*].opportunity").isNotEmpty());
    }

    @WithMockUser(value="john")
    @Test
    @Transactional
    public void getDashboard_ShouldReturnCustomerSummaryAndPortfolio_WhenCustomerExists() throws Exception{
        LocationDTO location = locationMapper.toDto(LocationResourceIT.createEntity(em));
        CustomerDTO customerDTO = CustomerDTOBuilder.builder(userService, "john")
                                                    .withLocation(location)
                                                    .withEmail("test@john.com")
                                                    .withBvn("12312389090")
                                                    .build();

        customerDTO = customerService.registerCustomer(customerDTO);
        customerDTO = customerService.verifyCustomer(customerDTO);

        Customer customerEntity = customerMapper.toEntity(customerDTO);

        Wallet wallet =  walletRepository.findById(customerDTO.getWalletId()).get();
        wallet.setBalance(new BigDecimal(100000));
        wallet.setTotalDeposit(new BigDecimal(100000));
        wallet.setTotalArchived(new BigDecimal(200000));
        em.merge(wallet);

        Application application1 = createEntity(em);
        BigDecimal amount = new BigDecimal(10000);
        application1.setAmount(amount);
        application1.getOpportunity().setMinimumInvestment(new BigDecimal(5000));
        application1.getOpportunity().setDenomination(new BigDecimal(500));
        application1.setApplicationId("AppId1");
        application1.setStatus(ApplicationStatus.REDEEMED);
        application1.setCustomer(customerEntity);
        saveApplications(application1,em);

        Application application2 = createEntity(em);
        application2.setAmount(new BigDecimal(20000));
        application2.getOpportunity().setMinimumInvestment(new BigDecimal(10000));
        application2.getOpportunity().setDenomination(new BigDecimal(1000));
        application2.setApplicationId("AppId2");
        application2.setStatus(ApplicationStatus.COMPLETE);
        application2.setCustomer(customerEntity);
        saveApplications(application2,em);

        Application application3 = createEntity(em);
        application3.setAmount(new BigDecimal(1000));
        application3.getOpportunity().setMinimumInvestment(new BigDecimal(500));
        application3.getOpportunity().setDenomination(new BigDecimal(50));
        application3.setApplicationId("AppId3");
        application3.setStatus(ApplicationStatus.PROCESSING);
        application3.setCustomer(customerEntity);
        saveApplications(application3,em);

        Application application4 = createEntity(em);
        application4.setAmount(new BigDecimal(1000));
        application4.getOpportunity().setMinimumInvestment(new BigDecimal(500));
        application4.getOpportunity().setDenomination(new BigDecimal(50));
        application4.setApplicationId("AppId4");
        application4.setStatus(ApplicationStatus.CANCELLED);
        application4.setCustomer(customerEntity);
        saveApplications(application4,em);

        restApplicationMockMvc.perform(get("/api/customer/dashboard").accept(MediaType.APPLICATION_JSON))
                              .andExpect(status().isOk())
                              .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                              .andExpect(jsonPath("$.summary.totalActivePortfolio").value(20000))
                              .andExpect(jsonPath("$.summary.totalDeposits").value(300000))
                              .andExpect(jsonPath("$.summary.totalInvestment").value(30000))
                              .andExpect(jsonPath("$.summary.earnings").value(300))
                              .andExpect(jsonPath("$.portfolio.[*].applicationId",contains("AppId4",
                                                                                                    "AppId3",
                                                                                                    "AppId2",
                                                                                                    "AppId1")));
    }

    @WithMockUser(value="johnny")
    @Test
    @Transactional
    public void getDashboard_ShouldReturnSummaryWithDefaultValuesAsZeroAndEmptyPortfolio_WhenCustomerHasMadeNoTransaction() throws Exception{
        LocationDTO location = locationMapper.toDto(LocationResourceIT.createEntity(em));
        CustomerDTO customerDTO = CustomerDTOBuilder.builder(userService, "johnny")
                                                    .withLocation(location)
                                                    .withEmail("test@john.com")
                                                    .withBvn("12312389090")
                                                    .build();

        customerService.registerCustomer(customerDTO);

        restApplicationMockMvc.perform(get("/api/customer/dashboard").accept(MediaType.APPLICATION_JSON))
                              .andExpect(status().isOk())
                              .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                              .andExpect(jsonPath("$.summary.totalActivePortfolio").value(0))
                              .andExpect(jsonPath("$.summary.totalDeposits").value(0))
                              .andExpect(jsonPath("$.summary.totalInvestment").value(0))
                              .andExpect(jsonPath("$.summary.earnings").value(0))
                              .andExpect(jsonPath("$.portfolio.[*]",hasSize(0)));
    }

    @Test
    @Transactional
    public void getDashboard_ShouldThrowIllegalStateException_WhenCustomerDoesNotExists() throws Exception{
        restApplicationMockMvc.perform(get("/api/customer/dashboard").accept(MediaType.APPLICATION_JSON))
                              .andExpect((result)-> Assertions.assertThrows(IllegalStateException.class,
                                                                            ()-> dashboardService.getDashboard()));
    }
}
