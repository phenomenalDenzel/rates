package com.qds.rates.service;

import com.qds.rates.domain.OpportunityDocument;
import com.qds.rates.repository.OpportunityDocumentRepository;
import com.qds.rates.service.dto.OpportunityDocumentDTO;
import com.qds.rates.service.mapper.OpportunityDocumentMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link OpportunityDocument}.
 */
@Service
@Transactional
public class OpportunityDocumentService {

    private final Logger log = LoggerFactory.getLogger(OpportunityDocumentService.class);

    private final OpportunityDocumentRepository opportunityDocumentRepository;

    private final OpportunityDocumentMapper opportunityDocumentMapper;

    public OpportunityDocumentService(OpportunityDocumentRepository opportunityDocumentRepository, OpportunityDocumentMapper opportunityDocumentMapper) {
        this.opportunityDocumentRepository = opportunityDocumentRepository;
        this.opportunityDocumentMapper = opportunityDocumentMapper;
    }

    /**
     * Save a opportunityDocument.
     *
     * @param opportunityDocumentDTO the entity to save.
     * @return the persisted entity.
     */
    public OpportunityDocumentDTO save(OpportunityDocumentDTO opportunityDocumentDTO) {
        log.debug("Request to save OpportunityDocument : {}", opportunityDocumentDTO);
        OpportunityDocument opportunityDocument = opportunityDocumentMapper.toEntity(opportunityDocumentDTO);
        opportunityDocument = opportunityDocumentRepository.save(opportunityDocument);
        OpportunityDocumentDTO result = opportunityDocumentMapper.toDto(opportunityDocument);
        return result;
    }

    /**
     * Get all the opportunityDocuments.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<OpportunityDocumentDTO> findAll() {
        log.debug("Request to get all OpportunityDocuments");
        return opportunityDocumentRepository.findAll().stream()
            .map(opportunityDocumentMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one opportunityDocument by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<OpportunityDocumentDTO> findOne(Long id) {
        log.debug("Request to get OpportunityDocument : {}", id);
        return opportunityDocumentRepository.findById(id)
            .map(opportunityDocumentMapper::toDto);
    }

    /**
     * Delete the opportunityDocument by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete OpportunityDocument : {}", id);
        opportunityDocumentRepository.deleteById(id);
    }
}
