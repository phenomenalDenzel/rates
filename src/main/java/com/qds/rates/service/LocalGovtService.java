package com.qds.rates.service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.qds.rates.domain.LocalGovt;
import com.qds.rates.domain.enumeration.State;
import com.qds.rates.repository.LocalGovtRepository;
import com.qds.rates.service.dto.LocalGovtDTO;
import com.qds.rates.service.mapper.LocalGovtMapper;

/**
 * Service Implementation for managing {@link LocalGovt}.
 */
@Service
@Transactional
public class LocalGovtService {

    private final Logger log = LoggerFactory.getLogger(LocalGovtService.class);

    private final LocalGovtRepository localGovtRepository;

    private final LocalGovtMapper localGovtMapper;

    public LocalGovtService(LocalGovtRepository localGovtRepository, LocalGovtMapper localGovtMapper) {
        this.localGovtRepository = localGovtRepository;
        this.localGovtMapper = localGovtMapper;
    }

    /**
     * Save a localGovt.
     *
     * @param localGovtDTO the entity to save.
     * @return the persisted entity.
     */
    public LocalGovtDTO save(LocalGovtDTO localGovtDTO) {
        log.debug("Request to save LocalGovt : {}", localGovtDTO);
        LocalGovt localGovt = localGovtMapper.toEntity(localGovtDTO);
        localGovt = localGovtRepository.save(localGovt);
        LocalGovtDTO result = localGovtMapper.toDto(localGovt);
        return result;
    }

    /**
     * Get all the localGovts.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<LocalGovtDTO> findAll() {
        log.debug("Request to get all LocalGovts");
        return localGovtRepository.findAll().stream()
            .map(localGovtMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one localGovt by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<LocalGovtDTO> findOne(Long id) {
        log.debug("Request to get LocalGovt : {}", id);
        return localGovtRepository.findById(id)
            .map(localGovtMapper::toDto);
    }

    /**
     * Delete the localGovt by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete LocalGovt : {}", id);

        localGovtRepository.deleteById(id);
    }

    public List<LocalGovtDTO> getLocalGovtsByState(State state){
        List<LocalGovt> localGovt = localGovtRepository.findByActiveTrueAndStateOrderByNameAsc(state);
        return localGovtMapper.toDto(localGovt);
    }
}
