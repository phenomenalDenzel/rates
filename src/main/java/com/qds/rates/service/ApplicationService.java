package com.qds.rates.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.qds.rates.domain.Application;
import com.qds.rates.domain.enumeration.ApplicationStatus;
import com.qds.rates.repository.ApplicationRepository;
import com.qds.rates.service.dto.ApplicationDTO;
import com.qds.rates.service.dto.CustomerDTO;
import com.qds.rates.service.errors.CustomerVerificationException;
import com.qds.rates.service.errors.InsufficientException;
import com.qds.rates.service.errors.InvalidAmountException;
import com.qds.rates.service.mapper.ApplicationMapper;

/**
 * Service Implementation for managing {@link Application}.
 */
@Service
@Transactional
public class ApplicationService {

    private final Logger log = LoggerFactory.getLogger(ApplicationService.class);

    private final ApplicationRepository applicationRepository;

    private final ApplicationMapper applicationMapper;

    private final WalletService walletService;

    private final OpportunityService opportunityService;

    private final CustomerService customerService;

    public ApplicationService(ApplicationRepository applicationRepository, ApplicationMapper applicationMapper, WalletService walletService, OpportunityService opportunityService, final CustomerService customerService) {
        this.applicationRepository = applicationRepository;
        this.applicationMapper = applicationMapper;
        this.walletService = walletService;
        this.opportunityService = opportunityService;
        this.customerService = customerService;
    }

    /**
     * Save a application.
     *
     * @param applicationDTO the entity to save.
     *
     * @return the persisted entity.
     */
    public ApplicationDTO save(ApplicationDTO applicationDTO) {
        log.debug("Request to save Application : {}", applicationDTO);
        Application application = applicationMapper.toEntity(applicationDTO);
        application = applicationRepository.save(application);
        ApplicationDTO result = applicationMapper.toDto(application);
        return result;
    }

    /**
     * Get all the applications.
     *
     * @param pageable the pagination information.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<ApplicationDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Applications");
        return applicationRepository.findAll(pageable)
                                    .map(applicationMapper::toDto);
    }


    /**
     * Get one application by id.
     *
     * @param id the id of the entity.
     *
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ApplicationDTO> findOne(Long id) {
        log.debug("Request to get Application : {}", id);
        return applicationRepository.findById(id)
                                    .map(applicationMapper::toDto);
    }

    /**
     * Get all the applications for a specific customer
     *
     * @param pageable
     *
     * @return
     */
    @Transactional(readOnly = true)
    public Page<ApplicationDTO> findAllByCustomerId(final Pageable pageable, final Long id) {
        log.debug("Request to get all Applications");
        return applicationRepository.findAllByCustomerId(pageable, id)
                                    .map(applicationMapper::toDto);
    }

    /**
     * Delete the application by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Application : {}", id);
        applicationRepository.deleteById(id);
    }

    /**
     * Apply for opportunity.
     *
     * @param applicationDTO .
     *
     * @return the created applicationDTO.
     */
    protected ApplicationDTO applyOpportunity(ApplicationDTO applicationDTO, CustomerDTO customerDTO) {
        if (customerDTO.isCanApplyForOpportunities()) {
            if (opportunityService.isAmountValidForOpportunity(applicationDTO.getOpportunityId(), applicationDTO.getAmount())) {
                if (walletService.isUserBalanceSufficient(applicationDTO.getAmount(), customerDTO)) {
                    applicationDTO.setStatus(ApplicationStatus.PROCESSING);
                    applicationDTO.setApplicationId(generateApplicationId());
                    applicationDTO.setCustomerId(customerDTO.getId());
                    walletService.performDebitTransaction(customerDTO, applicationDTO.getAmount());
                    return save(applicationDTO);
                } else {
                    throw new InsufficientException("Insufficient Fund");
                }
            } else {
                throw new InvalidAmountException("Invalid Amount");
            }
        } else {
            throw new CustomerVerificationException("Customer not verified");
        }
    }

    public ApplicationDTO createApplicationAsCurrentCustomer(ApplicationDTO applicationDTO) {
        Optional<CustomerDTO> optionalCustomerDTO = customerService.getCurrentCustomer();
        if (!optionalCustomerDTO.isPresent()) {
            throw new IllegalStateException("Invalid Customer Logged In");
        }
        return applyOpportunity(applicationDTO, optionalCustomerDTO.get());
    }

    public ApplicationDTO createApplicationForCustomer(ApplicationDTO applicationDTO) {
        Optional<CustomerDTO> optionalCustomerDTO = customerService.findOne(applicationDTO.getCustomerId());
        if (!optionalCustomerDTO.isPresent()) {
            throw new IllegalStateException("Invalid Customer ID");
        }
        return applyOpportunity(applicationDTO, optionalCustomerDTO.get());
    }

    public List<ApplicationDTO> findAllApplicationsByCustomerIdOrderByCreatedDateDesc(Long customerId){
        List<Application> applications = applicationRepository.findAllByCustomerIdOrderByCreatedDateDesc(customerId);
        return applications.stream()
                .map(applicationMapper::toDto)
                .collect(Collectors.toList());
    }

    private String generateApplicationId() {
        return UUID.randomUUID()
                   .toString();
    }
}
