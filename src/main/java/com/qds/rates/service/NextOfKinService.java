package com.qds.rates.service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.qds.rates.domain.NextOfKin;
import com.qds.rates.repository.NextOfKinRepository;
import com.qds.rates.service.dto.NextOfKinDTO;
import com.qds.rates.service.mapper.NextOfKinMapper;

/**
 * Service Implementation for managing {@link NextOfKin}.
 */
@Service
@Transactional
public class NextOfKinService {

    private final Logger log = LoggerFactory.getLogger(NextOfKinService.class);

    private final NextOfKinRepository nextOfKinRepository;

    private final NextOfKinMapper nextOfKinMapper;

    public NextOfKinService(NextOfKinRepository nextOfKinRepository, NextOfKinMapper nextOfKinMapper) {
        this.nextOfKinRepository = nextOfKinRepository;
        this.nextOfKinMapper = nextOfKinMapper;
    }

    /**
     * Save a nextOfKin.
     *
     * @param nextOfKinDTO the entity to save.
     * @return the persisted entity.
     */
    public NextOfKinDTO save(NextOfKinDTO nextOfKinDTO) {
        log.debug("Request to save NextOfKin : {}", nextOfKinDTO);
        NextOfKin nextOfKin = nextOfKinMapper.toEntity(nextOfKinDTO);
        nextOfKin = nextOfKinRepository.save(nextOfKin);
        NextOfKinDTO result = nextOfKinMapper.toDto(nextOfKin);
        return result;
    }

    /**
     * Get all the nextOfKins.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<NextOfKinDTO> findAll() {
        log.debug("Request to get all NextOfKins");
        return nextOfKinRepository.findAll().stream()
            .map(nextOfKinMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one nextOfKin by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<NextOfKinDTO> findOne(Long id) {
        log.debug("Request to get NextOfKin : {}", id);
        return nextOfKinRepository.findById(id)
            .map(nextOfKinMapper::toDto);
    }

    /**
     * Delete the nextOfKin by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete NextOfKin : {}", id);
        nextOfKinRepository.deleteById(id);
    }

}
