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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.TestExecutionEvent;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import com.qds.rates.RatesApp;
import com.qds.rates.domain.Customer;
import com.qds.rates.domain.Location;
import com.qds.rates.domain.User;
import com.qds.rates.domain.enumeration.AnnualIncome;
import com.qds.rates.domain.enumeration.EmploymentStatus;
import com.qds.rates.domain.enumeration.Qualification;
import com.qds.rates.domain.enumeration.RelationshipType;
import com.qds.rates.domain.enumeration.VerificationItem;
import com.qds.rates.repository.CustomerRepository;
import com.qds.rates.security.AuthoritiesConstants;
import com.qds.rates.service.CustomerService;
import com.qds.rates.service.UserService;
import com.qds.rates.service.dto.CustomerDTO;
import com.qds.rates.service.dto.EmploymentDetailsDTO;
import com.qds.rates.service.dto.LocationDTO;
import com.qds.rates.service.dto.NextOfKinDTO;
import com.qds.rates.service.dto.VerificationDTO;
import com.qds.rates.service.dto.builders.CustomerDTOBuilder;
import com.qds.rates.service.mapper.CustomerMapper;
import com.qds.rates.service.mapper.LocationMapper;
import com.qds.rates.web.rest.vm.CustomerProfileVM;

/**
 * Integration tests for the {@link CustomerResource} REST controller.
 */
@SpringBootTest(classes = RatesApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class CustomerResourceIT {

    private static final AnnualIncome DEFAULT_ANNUAL_INCOME = AnnualIncome.BELOW_1M;
    private static final AnnualIncome UPDATED_ANNUAL_INCOME = AnnualIncome.BETWEEN_1M_5M;

    private static final EmploymentStatus DEFAULT_EMPLOYMENT_STATUS = EmploymentStatus.EMPLOYED;
    private static final EmploymentStatus UPDATED_EMPLOYMENT_STATUS = EmploymentStatus.UNEMPLOYED;

    private static final Qualification DEFAULT_QUALIFICATION_LEVEL = Qualification.HIGHER_NATIONAL_DIPLOMA;
    private static final Qualification UPDATED_QUALIFICATION_LEVEL = Qualification.HIGHER_NATIONAL_CERTIFICATE;

    private static final String DEFAULT_MOBILE = "AAAAAAAAAA";
    private static final String UPDATED_MOBILE = "BBBBBBBBBB";

    private static final String DEFAULT_BVN = "AAAAAAAAAA";
    private static final String UPDATED_BVN = "BBBBBBBBBB";
    private static final String OTHER_BVN = "BBBBBBBBAA";

    private static final LocalDate DEFAULT_DOB = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DOB = LocalDate.now(ZoneId.systemDefault());

    private static final String CUSTOMER_LOGIN = "myuser";

    private static final String DEFAULT_COUNTRY_OF_BIRTH = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY_OF_BIRTH = "BBBBBBBBBB";

    private static final String DEFAULT_NATIONALITY = "AAAAAAAAAA";
    private static final String UPDATED_NATIONALITY = "BBBBBBBBBB";

    private static final String DEFAULT_MOTHERS_MAIDEN_NAME = "AAAAAAAAAA";
    private static final String UPDATED_MOTHERS_MAIDEN_NAME = "BBBBBBBBBB";

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CustomerMapper customerMapper;

    @Autowired
    private LocationMapper locationMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private UserService userService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private MockMvc restCustomerMockMvc;

    private Customer customer;
    private Customer customerWithLogin;

    public static Customer createEntity(EntityManager em) {
        return createEntity(em, null);
    }

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    private static Customer createEntity(EntityManager em, final String bvn) {
        Customer customer = new Customer()
                .annualIncome(DEFAULT_ANNUAL_INCOME)
                .employmentStatus(DEFAULT_EMPLOYMENT_STATUS)
                .qualificationLevel(DEFAULT_QUALIFICATION_LEVEL)
                .mobile(DEFAULT_MOBILE)
                .countryOfBirth(DEFAULT_COUNTRY_OF_BIRTH)
                .nationality(DEFAULT_NATIONALITY)
                .mothersMaidenName(DEFAULT_MOTHERS_MAIDEN_NAME)
                                          .bvn(bvn == null ? DEFAULT_BVN : bvn)
                                          .dob(DEFAULT_DOB);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        customer.setUser(user);
        // Add required entity
        Location location;
        if (TestUtil.findAll(em, Location.class)
                    .isEmpty()) {
            location = LocationResourceIT.createEntity(em);
            em.persist(location);
            em.flush();
        } else {
            location = TestUtil.findAll(em, Location.class)
                               .get(0);
        }
        customer.getAddresses()
                .add(location);
        return customer;
    }

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    private static Customer createEntityWithoutRequiredEntites(EntityManager em, final String bvn) {
        Customer customer = new Customer()
                .annualIncome(DEFAULT_ANNUAL_INCOME)
                .employmentStatus(DEFAULT_EMPLOYMENT_STATUS)
                .qualificationLevel(DEFAULT_QUALIFICATION_LEVEL)
                .mobile(DEFAULT_MOBILE)
                .countryOfBirth(DEFAULT_COUNTRY_OF_BIRTH)
                .nationality(DEFAULT_NATIONALITY)
                .mothersMaidenName(DEFAULT_MOTHERS_MAIDEN_NAME)
                .bvn(bvn == null ? DEFAULT_BVN : bvn)
                .dob(DEFAULT_DOB);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        customer.setUser(user);
        return customer;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Customer createUpdatedEntity(EntityManager em) {
        Customer customer = new Customer()
            .annualIncome(UPDATED_ANNUAL_INCOME)
            .employmentStatus(UPDATED_EMPLOYMENT_STATUS)
            .qualificationLevel(UPDATED_QUALIFICATION_LEVEL)
            .mobile(UPDATED_MOBILE)
            .bvn(UPDATED_BVN)
            .dob(UPDATED_DOB)
            .countryOfBirth(UPDATED_COUNTRY_OF_BIRTH)
            .nationality(UPDATED_NATIONALITY)
            .mothersMaidenName(UPDATED_MOTHERS_MAIDEN_NAME);
        // Add required entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();
        customer.setUser(user);
        // Add required entity
        Location location;
        if (TestUtil.findAll(em, Location.class).isEmpty()) {
            location = LocationResourceIT.createUpdatedEntity(em);
            em.persist(location);
            em.flush();
        } else {
            location = TestUtil.findAll(em, Location.class).get(0);
        }
        customer.getAddresses().add(location);
        return customer;
    }

    public static Customer createCustomerWithLogin(EntityManager em, final String customerLogin, String bvn) {
        Customer entity = createEntity(em, bvn);
        User user = entity.getUser();
        user.setLogin(customerLogin);
        em.persist(user);
        em.flush();
        entity.setUser(user);
        return entity;
    }

    private Set<VerificationDTO> createVerifications(){
        VerificationDTO verification = new VerificationDTO();
        Set<VerificationDTO> verifications = new HashSet<>();
        verification.setArchived(true);
        verification.setArchiveUrl("someUrl.com");
        verification.setDescription("some desc");
        String image = "SomeImage==";
        verification.setImage(image.getBytes());
        verification.setItemName(VerificationItem.PICTURE);
        verification.setImageContentType("image/png");
        verifications.add(verification);
        return  verifications;
    }

    private Set<NextOfKinDTO> createNextOfKin() {
        Set<NextOfKinDTO> nextOfKins = new HashSet<>();
        NextOfKinDTO nextOfKin = new NextOfKinDTO();
        nextOfKin.setName("NAME NAME");
        nextOfKin.setPhoneNumber("+90999999939");
        nextOfKin.setRelation(RelationshipType.SIBLING);
        nextOfKins.add(nextOfKin);
        return nextOfKins;
    }

    private EmploymentDetailsDTO createEmploymentDetails(){
        EmploymentDetailsDTO employmentDetails = new EmploymentDetailsDTO();
        employmentDetails.setAddressLine1("Some Address1");
        employmentDetails.setAddressLine2("Some Address2");
        employmentDetails.setCompanyName("Some Company Name");
        employmentDetails.setOfficialWebsite("www.somecompany.co.ng");
        return employmentDetails;
    }

    @BeforeEach
    public void initTest() {
        customerRepository.flush();
        customerWithLogin = createCustomerWithLogin(em, CUSTOMER_LOGIN, OTHER_BVN);
        customer = createEntity(em, null);
        customerRepository.saveAndFlush(customerWithLogin);
    }

    @Test
    @Transactional
    public void createCustomer() throws Exception {
        int databaseSizeBeforeCreate = customerRepository.findAll().size();
        // Create the Customer
        CustomerDTO customerDTO = customerMapper.toDto(customer);
        LocationDTO location=locationMapper.toDto(LocationResourceIT.createEntity(em));
        customerDTO.setAddresses(Collections.singleton(location));
        customerDTO.setAccountVerifications(createVerifications());
        customerDTO.setNextOfKins(createNextOfKin());
        customerDTO.setEmploymentDetails(createEmploymentDetails());

        restCustomerMockMvc.perform(post("/api/customers").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customerDTO)))
            .andExpect(status().isCreated());

        // Validate the Customer in the database
        Customer testCustomer = customerRepository.findOneByUserLogin(customer.getUser().getLogin()).get();
        assertThat(testCustomer.getAnnualIncome()).isEqualTo(DEFAULT_ANNUAL_INCOME);
        assertThat(testCustomer.getEmploymentStatus()).isEqualTo(DEFAULT_EMPLOYMENT_STATUS);
        assertThat(testCustomer.getQualificationLevel()).isEqualTo(DEFAULT_QUALIFICATION_LEVEL);
        assertThat(testCustomer.getMobile()).isEqualTo(DEFAULT_MOBILE);
        assertThat(testCustomer.getBvn()).isEqualTo(DEFAULT_BVN);
        assertThat(testCustomer.getDob()).isEqualTo(DEFAULT_DOB);
        assertThat(testCustomer.getCountryOfBirth()).isEqualTo(DEFAULT_COUNTRY_OF_BIRTH);
        assertThat(testCustomer.getNationality()).isEqualTo(DEFAULT_NATIONALITY);
        assertThat(testCustomer.getMothersMaidenName()).isEqualTo(DEFAULT_MOTHERS_MAIDEN_NAME);

        // Validate the id for MapsId, the ids must be same
        assertThat(testCustomer.getId()).isEqualTo(testCustomer.getUser().getId());
    }

    @Test
    @Transactional
    public void createCustomerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = customerRepository.findAll().size();

        // Create the Customer with an existing ID
        customer.setId(1L);
        CustomerDTO customerDTO = customerMapper.toDto(customer);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCustomerMockMvc.perform(post("/api/customers").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customerDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Customer in the database
        List<Customer> customerList = customerRepository.findAll();
        assertThat(customerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void updateCustomerMapsIdAssociationWithNewId() throws Exception {
        Customer customer = createEntityWithoutRequiredEntites(em,null);
        // Initialize the database
        customerRepository.saveAndFlush(customer);
        int databaseSizeBeforeCreate = customerRepository.findAll().size();

        // Add a new parent entity
        User user = UserResourceIT.createEntity(em);
        em.persist(user);
        em.flush();

        // Load the customer
        final Long originalCustomerId = customer.getId();
        Customer updatedCustomer = customerRepository.findById(originalCustomerId)
                                                     .get();
        // Disconnect from session so that the updates on updatedCustomer are not directly saved in db
        em.detach(updatedCustomer);

        // Update the User with new association value
        updatedCustomer.setUser(user);
        CustomerDTO updatedCustomerDTO = customerMapper.toDto(updatedCustomer);

        // Update the entity
        restCustomerMockMvc.perform(put("/api/customers").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCustomerDTO)))
                           .andExpect(status().isInternalServerError());

        // Validate the Customer in the database
        List<Customer> customerList = customerRepository.findAll();
        assertThat(customerList).hasSize(databaseSizeBeforeCreate);

        Customer testCustomer = customerRepository.findById(originalCustomerId)
                                                  .get();

        // Validate the id for MapsId, the ids must be same
        // Uncomment the following line for assertion. However, please note that there is a known issue and uncommenting will fail the test.
        // Please look at https://github.com/jhipster/generator-jhipster/issues/9100. You can modify this test as necessary.
        assertThat(testCustomer.getId()).isEqualTo(testCustomer.getUser()
                                                               .getId());

    }

    @Test
    @Transactional
    public void checkMobileIsRequired() throws Exception {
        int databaseSizeBeforeTest = customerRepository.findAll().size();
        // set the field null
        customer.setMobile(null);

        // Create the Customer, which fails.
        CustomerDTO customerDTO = customerMapper.toDto(customer);


        restCustomerMockMvc.perform(post("/api/customers").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customerDTO)))
            .andExpect(status().isBadRequest());

        List<Customer> customerList = customerRepository.findAll();
        assertThat(customerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkBvnIsRequired() throws Exception {
        int databaseSizeBeforeTest = customerRepository.findAll().size();
        // set the field null
        customer.setBvn(null);

        // Create the Customer, which fails.
        CustomerDTO customerDTO = customerMapper.toDto(customer);


        restCustomerMockMvc.perform(post("/api/customers").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customerDTO)))
            .andExpect(status().isBadRequest());

        List<Customer> customerList = customerRepository.findAll();
        assertThat(customerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDobIsRequired() throws Exception {
        int databaseSizeBeforeTest = customerRepository.findAll().size();
        // set the field null
        customer.setDob(null);

        // Create the Customer, which fails.
        CustomerDTO customerDTO = customerMapper.toDto(customer);


        restCustomerMockMvc.perform(post("/api/customers").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customerDTO)))
            .andExpect(status().isBadRequest());

        List<Customer> customerList = customerRepository.findAll();
        assertThat(customerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCustomers() throws Exception {
        // Initialize the database
        customerRepository.saveAndFlush(customer);

        // Get all the customerList
        restCustomerMockMvc.perform(get("/api/customers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(customer.getId().intValue())))
            .andExpect(jsonPath("$.[*].annualIncome").value(hasItem(DEFAULT_ANNUAL_INCOME.toString())))
            .andExpect(jsonPath("$.[*].employmentStatus").value(hasItem(DEFAULT_EMPLOYMENT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].qualificationLevel").value(hasItem(DEFAULT_QUALIFICATION_LEVEL.toString())))
            .andExpect(jsonPath("$.[*].mobile").value(hasItem(DEFAULT_MOBILE)))
            .andExpect(jsonPath("$.[*].bvn").value(hasItem(DEFAULT_BVN)))
            .andExpect(jsonPath("$.[*].dob").value(hasItem(DEFAULT_DOB.toString())))
            .andExpect(jsonPath("$.[*].countryOfBirth").value(hasItem(DEFAULT_COUNTRY_OF_BIRTH)))
            .andExpect(jsonPath("$.[*].nationality").value(hasItem(DEFAULT_NATIONALITY)))
            .andExpect(jsonPath("$.[*].mothersMaidenName").value(hasItem(DEFAULT_MOTHERS_MAIDEN_NAME)));
    }

    @Test
    @Transactional
    @WithUserDetails(value = CUSTOMER_LOGIN, setupBefore = TestExecutionEvent.TEST_EXECUTION)
    @Disabled
    public void customerShouldBeAbleToGetTheirDetails() throws Exception {
        customerRepository.flush();
        customerRepository.saveAndFlush(customerWithLogin);
        customerRepository.flush();

        // Get the customer
        restCustomerMockMvc.perform(get("/api/customers/{id}", customerWithLogin.getUser().getId()))
                           .andExpect(status().isOk())
                           .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
                           .andExpect(jsonPath("$.id").value(customerWithLogin.getUser().getId()))
                           .andExpect(jsonPath("$.mobile").value(DEFAULT_MOBILE))
                           .andExpect(jsonPath("$.bvn").value(OTHER_BVN))
                           .andExpect(jsonPath("$.dob").value(DEFAULT_DOB.toString()));
    }

    @Test
    @Transactional
    @WithUserDetails(value = CUSTOMER_LOGIN, setupBefore = TestExecutionEvent.TEST_EXECUTION)
    @Disabled
    public void getDetailsForOtherCustomerShouldReturnMyDetailsInstead() throws Exception {

        customerRepository.saveAndFlush(customer);

        // Get the customer
        restCustomerMockMvc.perform(get("/api/customers/{id}", customer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
                           .andExpect(jsonPath("$.id").value(customerWithLogin.getId()
                                                                              .intValue()))
            .andExpect(jsonPath("$.mobile").value(DEFAULT_MOBILE))
                           .andExpect(jsonPath("$.bvn").value(OTHER_BVN))
                           .andExpect(jsonPath("$.dob").value(DEFAULT_DOB.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingCustomer() throws Exception {
        // Get the customer
        restCustomerMockMvc.perform(get("/api/customers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCustomer() throws Exception {
        // Initialize the database
        customerRepository.saveAndFlush(customer);

        int databaseSizeBeforeUpdate = customerRepository.findAll().size();

        // Update the customer
        Customer updatedCustomer = customerRepository.findById(customer.getId()).get();
        // Disconnect from session so that the updates on updatedCustomer are not directly saved in db
        em.detach(updatedCustomer);
        updatedCustomer
            .annualIncome(UPDATED_ANNUAL_INCOME)
            .employmentStatus(UPDATED_EMPLOYMENT_STATUS)
            .qualificationLevel(UPDATED_QUALIFICATION_LEVEL)
            .mobile(UPDATED_MOBILE)
            .bvn(UPDATED_BVN)
            .dob(UPDATED_DOB)
            .countryOfBirth(UPDATED_COUNTRY_OF_BIRTH)
            .nationality(UPDATED_NATIONALITY)
            .mothersMaidenName(UPDATED_MOTHERS_MAIDEN_NAME);
        CustomerDTO customerDTO = customerMapper.toDto(updatedCustomer);

        restCustomerMockMvc.perform(put("/api/customers").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customerDTO)))
            .andExpect(status().isOk());

        // Validate the Customer in the database
        Customer testCustomer = customerRepository.getOne(customer.getId());
        assertThat(testCustomer.getAnnualIncome()).isEqualTo(UPDATED_ANNUAL_INCOME);
        assertThat(testCustomer.getEmploymentStatus()).isEqualTo(UPDATED_EMPLOYMENT_STATUS);
        assertThat(testCustomer.getQualificationLevel()).isEqualTo(UPDATED_QUALIFICATION_LEVEL);
        assertThat(testCustomer.getMobile()).isEqualTo(UPDATED_MOBILE);
        assertThat(testCustomer.getBvn()).isEqualTo(UPDATED_BVN);
        assertThat(testCustomer.getDob()).isEqualTo(UPDATED_DOB);
        assertThat(testCustomer.getCountryOfBirth()).isEqualTo(UPDATED_COUNTRY_OF_BIRTH);
        assertThat(testCustomer.getNationality()).isEqualTo(UPDATED_NATIONALITY);
        assertThat(testCustomer.getMothersMaidenName()).isEqualTo(UPDATED_MOTHERS_MAIDEN_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingCustomer() throws Exception {
        int databaseSizeBeforeUpdate = customerRepository.findAll().size();

        // Create the Customer
        CustomerDTO customerDTO = customerMapper.toDto(customer);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCustomerMockMvc.perform(put("/api/customers").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(customerDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Customer in the database
        List<Customer> customerList = customerRepository.findAll();
        assertThat(customerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCustomer() throws Exception {
        // Initialize the database
        customerRepository.saveAndFlush(customer);

        int databaseSizeBeforeDelete = customerRepository.findAll().size();

        // Delete the customer
        restCustomerMockMvc.perform(delete("/api/customers/{id}", customer.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Customer> customerList = customerRepository.findAll();
        assertThat(customerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    @WithMockUser(authorities = AuthoritiesConstants.ADMIN)
    public void getCustomerAsAdminShouldReturnRequestedCustomerDetails() throws Exception {
        // Initialize the database
        customerRepository.saveAndFlush(customer);

        // Get the customer
        restCustomerMockMvc.perform(get("/api/customers/{id}", customer.getId()))
                           .andExpect(status().isOk())
                           .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
                           .andExpect(jsonPath("$.id").value(customer.getId()
                                                                     .intValue()))
                           .andExpect(jsonPath("$.mobile").value(DEFAULT_MOBILE))
                           .andExpect(jsonPath("$.bvn").value(DEFAULT_BVN))
                           .andExpect(jsonPath("$.dob").value(DEFAULT_DOB.toString()));
    }

    @Test
    @WithMockUser(value = "mira")
    @Transactional
    public void getCustomerProfile_ShouldSucceed_WhenCurrentLoggedInCustomerIsCalled() throws Exception{
        LocationDTO location = locationMapper.toDto(LocationResourceIT.createEntity(em));
        CustomerDTO customerDTO = CustomerDTOBuilder.builder(userService, "mira")
                                                    .withLocation(location)
                                                    .withEmail("test@mira.com")
                                                    .withBvn("12312389090")
                                                    .build();
        customerService.registerCustomer(customerDTO);

        restCustomerMockMvc.perform(get("/api/customers/profile"))
                           .andExpect(status().isOk())
                           .andExpect(jsonPath("$.mobile").value(customerDTO.getMobile()))
                           .andExpect(jsonPath("$.firstName").value("john"))
                           .andExpect(jsonPath("$.lastName").value("doe"))
                           .andExpect(jsonPath("$.dob").value(customerDTO.getDob().toString()));
    }

    @Test
    @Transactional
    public void getCustomerProfile_ShouldNotBeFound_WhenCurrentLoggedInCustomerIsCalled() throws Exception{
        LocationDTO location = locationMapper.toDto(LocationResourceIT.createEntity(em));
        CustomerDTO customerDTO = CustomerDTOBuilder.builder(userService, "jerry")
                                                    .withLocation(location)
                                                    .withEmail("test@jerry.com")
                                                    .withBvn("12312389090")
                                                    .build();
        customerService.registerCustomer(customerDTO);

        restCustomerMockMvc.perform(get("/api/customers/profile"))
                           .andExpect(status().isNotFound());
    }

    @Test
    @WithMockUser(value = "general")
    @Transactional
    public void updateCustomerProfile_ShouldSucceed_WhenCurrentLoggedInCustomerIsCalled() throws Exception{
        LocationDTO location = locationMapper.toDto(LocationResourceIT.createEntity(em));
        CustomerDTO customerDTO = CustomerDTOBuilder.builder(userService, "general")
                                                    .withLocation(location)
                                                    .withEmail("test@general.com")
                                                    .withBvn("12312389090")
                                                    .build();
        customerService.registerCustomer(customerDTO);

        CustomerProfileVM customerProfile = new CustomerProfileVM();
        customerProfile.setDob(LocalDate.ofEpochDay(0L));
        customerProfile.setEmail("test@general.com");
        customerProfile.setFirstName("New FirstName");
        customerProfile.setLastName("New LastName");
        customerProfile.setMobile("New MobileNumber");

        restCustomerMockMvc.perform(put("/api/customers/profile").with(csrf())
                                                                 .contentType(MediaType.APPLICATION_JSON)
                                                                 .content(TestUtil.convertObjectToJsonBytes(customerProfile)))
                           .andExpect(status().isOk())
                           .andExpect(jsonPath("$.mobile").value(customerProfile.getMobile()))
                           .andExpect(jsonPath("$.firstName").value(customerProfile.getFirstName()))
                           .andExpect(jsonPath("$.lastName").value(customerProfile.getLastName()))
                           .andExpect(jsonPath("$.dob").value(customerProfile.getDob().toString()));
    }

    @Test
    @Transactional
    public void updateCustomerProfile_ShouldThrowIllegalStateException_WhenCurrentLoggedInCustomerIsCalled() throws Exception{
        LocationDTO location = locationMapper.toDto(LocationResourceIT.createEntity(em));
        CustomerDTO customerDTO = CustomerDTOBuilder.builder(userService, "general")
                                                    .withLocation(location)
                                                    .withEmail("test@general.com")
                                                    .withBvn("12312389090")
                                                    .build();
        customerService.registerCustomer(customerDTO);

        CustomerProfileVM customerProfile = new CustomerProfileVM();
        customerProfile.setDob(LocalDate.ofEpochDay(0L));
        customerProfile.setEmail("test@general.com");
        customerProfile.setFirstName("New FirstName");
        customerProfile.setLastName("New LastName");
        customerProfile.setMobile("New MobileNumber");

        restCustomerMockMvc.perform(put("/api/customers/profile").with(csrf())
                                                                 .contentType(MediaType.APPLICATION_JSON)
                                                                 .content(TestUtil.convertObjectToJsonBytes(customerProfile)))
                           .andExpect((result)->
                               Assertions.assertThrows(IllegalStateException.class,
                                                       ()->customerService.updateCustomerProfile(customerDTO)));
    }

}
