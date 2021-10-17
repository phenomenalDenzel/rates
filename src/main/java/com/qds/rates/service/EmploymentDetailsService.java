package com.qds.rates.service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.qds.rates.domain.EmploymentDetails;
import com.qds.rates.repository.CustomerRepository;
import com.qds.rates.repository.EmploymentDetailsRepository;
import com.qds.rates.service.dto.EmploymentDetailsDTO;
import com.qds.rates.service.mapper.EmploymentDetailsMapper;

/**
 * Service Implementation for managing {@link EmploymentDetails}.
 */
@Service
@Transactional
public class EmploymentDetailsService {

    private final Logger log = LoggerFactory.getLogger(EmploymentDetailsService.class);

    private final EmploymentDetailsRepository employmentDetailsRepository;

    private final EmploymentDetailsMapper employmentDetailsMapper;

    private final CustomerRepository customerRepository;

    public EmploymentDetailsService(EmploymentDetailsRepository employmentDetailsRepository, EmploymentDetailsMapper employmentDetailsMapper, CustomerRepository customerRepository) {
        this.employmentDetailsRepository = employmentDetailsRepository;
        this.employmentDetailsMapper = employmentDetailsMapper;
        this.customerRepository = customerRepository;
    }

    /**
     * Save a employmentDetails.
     *
     * @param employmentDetailsDTO the entity to save.
     * @return the persisted entity.
     */
    public EmploymentDetailsDTO save(EmploymentDetailsDTO employmentDetailsDTO) {
        log.debug("Request to save EmploymentDetails : {}", employmentDetailsDTO);
        EmploymentDetails employmentDetails = employmentDetailsMapper.toEntity(employmentDetailsDTO);
        Long customerId = employmentDetailsDTO.getCustomerId();
        customerRepository.findById(customerId).ifPresent(employmentDetails::customer);
        employmentDetails = employmentDetailsRepository.save(employmentDetails);
        EmploymentDetailsDTO result = employmentDetailsMapper.toDto(employmentDetails);
        return result;
    }

    /**
     * Get all the employmentDetails.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<EmploymentDetailsDTO> findAll() {
        log.debug("Request to get all EmploymentDetails");
        return employmentDetailsRepository.findAll().stream()
            .map(employmentDetailsMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one employmentDetails by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<EmploymentDetailsDTO> findOne(Long id) {
        log.debug("Request to get EmploymentDetails : {}", id);
        return employmentDetailsRepository.findById(id)
            .map(employmentDetailsMapper::toDto);
    }

    /**
     * Delete the employmentDetails by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete EmploymentDetails : {}", id);
        employmentDetailsRepository.deleteById(id);
    }
}
