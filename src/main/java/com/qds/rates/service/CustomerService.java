package com.qds.rates.service;

import javax.persistence.EntityNotFoundException;
import java.math.BigDecimal;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import com.google.common.base.Preconditions;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import com.qds.rates.domain.Customer;
import com.qds.rates.domain.EmploymentDetails;
import com.qds.rates.domain.Location;
import com.qds.rates.domain.NextOfKin;
import com.qds.rates.domain.User;
import com.qds.rates.domain.Verification;
import com.qds.rates.domain.Wallet;
import com.qds.rates.domain.enumeration.OtpAction;
import com.qds.rates.repository.CustomerRepository;
import com.qds.rates.repository.UserRepository;
import com.qds.rates.security.AuthoritiesConstants;
import com.qds.rates.security.SecurityUtils;
import com.qds.rates.service.dto.BVNCheckResponse;
import com.qds.rates.service.dto.CustomerDTO;
import com.qds.rates.service.mapper.CustomerMapper;

/**
 * Service Implementation for managing {@link Customer}.
 */
@Service
@Transactional
public class CustomerService {

    private final Logger log = LoggerFactory.getLogger(CustomerService.class);

    private final CustomerRepository customerRepository;

    private final CustomerMapper customerMapper;

    private final UserRepository userRepository;

    private final UserService userService;

    private final OtpService otpService;

    public CustomerService(CustomerRepository customerRepository, CustomerMapper customerMapper, UserRepository userRepository, UserService userService, final OtpService otpService) {
        this.customerRepository = customerRepository;
        this.customerMapper = customerMapper;
        this.userRepository = userRepository;
        this.userService = userService;
        this.otpService = otpService;
    }

    /**
     * Register a customer with user id.
     *
     * @param customerDTO the customer view model
     *
     * @return
     */
    public CustomerDTO registerCustomer(final CustomerDTO customerDTO) {
        log.debug("Request to save Customer : {}", customerDTO);
        final Long userId = customerDTO.getUserId();
        Preconditions.checkState(userId != null, "No user associated to the customer");

        final Optional<User> userById = userRepository.findById(userId);
        if (userById.isPresent()) {
            return registerCustomer(customerDTO, userById.get());
        }

        throw new IllegalStateException("No user found for user Id: " + userId);
    }

    /**
     * Register a customer for existing user.
     *
     * @param customerDTO the customer view model
     * @param user        the user
     *
     * @return
     */
    public CustomerDTO registerCustomer(final CustomerDTO customerDTO, final User user) {
        log.debug("Request to save Customer : {}", customerDTO);
        Preconditions.checkState(customerDTO.getId() == null, "Customer is already registered, use save to update customer");
        Customer customer = customerMapper.toEntity(customerDTO);
        customer.verified(false);

        Set<Location> addresses = customer.getAddresses();
        Set<Verification> accountVerifications = customer.getAccountVerifications();
        Set<NextOfKin> nextOfKins = customer.getNextOfKins();
        for (Location location : addresses) {
            location.setCustomer(customer);
        }
        if (!CollectionUtils.isEmpty(accountVerifications)) {
            for (Verification verification : accountVerifications) {
                verification.setCustomer(customer);
            }
        }
        if (!CollectionUtils.isEmpty(nextOfKins)) {
            for (NextOfKin nextOfKin : nextOfKins) {
                nextOfKin.setCustomer(customer);
            }
        }
        EmploymentDetails employmentDetails = customer.getEmploymentDetails();
        if (employmentDetails != null) {
            employmentDetails.setCustomer(customer);
        }
        Wallet wallet = new Wallet().balance(new BigDecimal(0))
                                    .externalId(generateExternalId())
                                    .customer(customer);
        customer.setWallet(wallet);

        customer.user(user);

        customer = customerRepository.save(customer);
        CustomerDTO result = customerMapper.toDto(customer);
        userService.updateUserAuthority(user.getLogin(), AuthoritiesConstants.CUSTOMER);
        otpService.sendGeneratedOtpCodeToUser(user, OtpAction.ACTIVATION);
        return result;
    }

    /**
     * Save/update a customer.
     *
     * @param customerDTO the entity to save.
     * @return the persisted entity.
     */
    public CustomerDTO save(CustomerDTO customerDTO) {
        log.debug("Request to save Customer : {}", customerDTO);
        Preconditions.checkState(customerDTO.getId() != null, "New customers should be registered");
        Preconditions.checkState(customerDTO.getId()
                                            .equals(customerDTO.getUserId()), "User has been changed.");
        Customer customer = customerMapper.toEntity(customerDTO);
        Long userId = customerDTO.getUserId();
        userRepository.findById(userId)
                      .ifPresent(customer::user);
        customer = customerRepository.save(customer);
        return customerMapper.toDto(customer);
    }

    /**
     * Save/update a customer.
     *
     * @param customerDTO the entity to save.
     * @return the persisted entity.
     */
    public CustomerDTO verifyCustomer(CustomerDTO customerDTO) {
        log.debug("Request to verify Customer : {}", customerDTO);
        Preconditions.checkState(customerDTO.getId() != null, "Cannot verify a new customers, register instead. ");
        Optional<Customer> customerById = customerRepository.findById(customerDTO.getId());
        if (customerById.isPresent()) {
            Customer customer = customerById.get();
            customer.verified(true);
            customer = customerRepository.save(customer);
            return customerMapper.toDto(customer);
        }
        throw new EntityNotFoundException("Customer not found with id " + customerDTO.getId());
    }

    /**
     * Get all the customers.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<CustomerDTO> findAll() {
        log.debug("Request to get all Customers");
        return customerRepository.findAll()
                                 .stream()
                                 .map(customerMapper::toDto)
                                 .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get all the customers where EmploymentDetails is {@code null}.
     *
     * @return the list of entities.
     * Get all the customers where EmploymentDetails is {@code null}.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<CustomerDTO> findAllWhereEmploymentDetailsIsNull() {
        log.debug("Request to get all customers where EmploymentDetails is null");
        return StreamSupport.stream(customerRepository.findAll()
                                                      .spliterator(), false)
                            .filter(customer -> customer.getEmploymentDetails() == null)
                            .map(customerMapper::toDto)
                            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get all the customers where Wallet is {@code null}.
     *
     * @return the list of entities.
     * Get all the customers where Wallet is {@code null}.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<CustomerDTO> findAllWhereWalletIsNull() {
        log.debug("Request to get all customers where Wallet is null");
        return StreamSupport.stream(customerRepository.findAll()
                                                      .spliterator(), false)
                            .filter(customer -> customer.getWallet() == null)
                            .map(customerMapper::toDto)
                            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one customer by id.
     *
     * @param id the id of the entity.
     *
     *
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<CustomerDTO> findOne(Long id) {
        log.debug("Request to get Customer : {}", id);
        if (SecurityUtils.isCurrentUserEmployeeOrAdmin()) {
            return customerRepository.findById(id)
                                     .map(customerMapper::toDto);
        }

        log.error("User with login {} is not authorized to get Customer : {}", SecurityUtils.getCurrentUserLogin(), id);

        return getCurrentCustomer();
    }

    /**
     * Get current logged in customer.
     *
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<CustomerDTO> getCurrentCustomer() {
        log.debug("Get current logged in customer");
        final String login = SecurityUtils.getCurrentUserLogin()
                                          .orElseThrow(IllegalStateException::new);

        return customerRepository.findOneByUserLogin(login)
                                 .map(customerMapper::toDto);
    }

    /**
     * Delete the customer by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Customer : {}", id);
        customerRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Optional<CustomerDTO> getCustomerProfile() {
        final String login = SecurityUtils.getCurrentUserLogin()
                                          .orElseThrow(IllegalStateException::new);
        log.debug("Retrieving user for login {}", login);
        return customerRepository.findOneByUserLogin(login)
                                 .map(customerMapper::toDto);
    }

    public CustomerDTO updateCustomerProfile(CustomerDTO customerDTO) {
        final String login = SecurityUtils.getCurrentUserLogin()
                                          .orElseThrow(IllegalStateException::new);
        log.debug("Retrieving user with login for update {}", login);
        Optional<Customer> customerOptional = customerRepository.findOneByUserLogin(login);
        if (customerOptional.isPresent()) {
            Customer customer = customerOptional.get();
            if (customerDTO.getUser() != null) {
                if (!StringUtils.isBlank(customerDTO.getUser()
                                                   .getFirstName())) {
                    customer.getUser()
                            .setFirstName(customerDTO.getUser()
                                                     .getFirstName());
                }
                if (!StringUtils.isBlank(customerDTO.getUser()
                                                   .getLastName())) {
                    customer.getUser()
                            .setLastName(customerDTO.getUser()
                                                    .getLastName());
                }
            }
            if (!StringUtils.isBlank(customerDTO.getMobile())) {
                customer.setMobile(customerDTO.getMobile());
            }
            if (customerDTO.getDob() != null) {
                customer.setDob(customerDTO.getDob());
            }
            User user = customer.getUser();
            userRepository.save(user);
            customerRepository.save(customer);
            return customerMapper.toDto(customer);
        }
        throw new IllegalStateException("Illegal Customer");
    }

    public BVNCheckResponse checkBvnExists(String bvn){
        Optional<Customer> customer = customerRepository.findOneByBvn(bvn);
        if(customer.isPresent()){
            return new BVNCheckResponse()
                    .setBvnExists(true);
        }
        return new BVNCheckResponse()
                .setBvnExists(false);
    }

    private String generateExternalId() {
        return UUID.randomUUID()
                   .toString();
    }
}
