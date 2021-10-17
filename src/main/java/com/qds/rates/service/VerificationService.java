package com.qds.rates.service;

import com.qds.rates.domain.Verification;
import com.qds.rates.repository.VerificationRepository;
import com.qds.rates.service.dto.VerificationDTO;
import com.qds.rates.service.mapper.VerificationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Verification}.
 */
@Service
@Transactional
public class VerificationService {

    private final Logger log = LoggerFactory.getLogger(VerificationService.class);

    private final VerificationRepository verificationRepository;

    private final VerificationMapper verificationMapper;

    public VerificationService(VerificationRepository verificationRepository, VerificationMapper verificationMapper) {
        this.verificationRepository = verificationRepository;
        this.verificationMapper = verificationMapper;
    }

    /**
     * Save a verification.
     *
     * @param verificationDTO the entity to save.
     * @return the persisted entity.
     */
    public VerificationDTO save(VerificationDTO verificationDTO) {
        log.debug("Request to save Verification : {}", verificationDTO);
        Verification verification = verificationMapper.toEntity(verificationDTO);
        verification = verificationRepository.save(verification);
        VerificationDTO result = verificationMapper.toDto(verification);
        return result;
    }

    /**
     * Get all the verifications.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<VerificationDTO> findAll() {
        log.debug("Request to get all Verifications");
        return verificationRepository.findAll().stream()
            .map(verificationMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one verification by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<VerificationDTO> findOne(Long id) {
        log.debug("Request to get Verification : {}", id);
        return verificationRepository.findById(id)
            .map(verificationMapper::toDto);
    }

    /**
     * Delete the verification by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Verification : {}", id);
        verificationRepository.deleteById(id);
    }

}
