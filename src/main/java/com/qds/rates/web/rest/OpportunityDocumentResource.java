package com.qds.rates.web.rest;

import com.qds.rates.service.OpportunityDocumentService;
import com.qds.rates.service.dto.OpportunityDocumentDTO;
import com.qds.rates.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.qds.rates.domain.OpportunityDocument}.
 */
@RestController
@RequestMapping("/api")
public class OpportunityDocumentResource {

    private final Logger log = LoggerFactory.getLogger(OpportunityDocumentResource.class);

    private static final String ENTITY_NAME = "opportunityDocument";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OpportunityDocumentService opportunityDocumentService;

    public OpportunityDocumentResource(OpportunityDocumentService opportunityDocumentService) {
        this.opportunityDocumentService = opportunityDocumentService;
    }

    /**
     * {@code POST  /opportunity-documents} : Create a new opportunityDocument.
     *
     * @param opportunityDocumentDTO the opportunityDocumentDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new opportunityDocumentDTO, or with status {@code 400 (Bad Request)} if the opportunityDocument has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/opportunity-documents")
    public ResponseEntity<OpportunityDocumentDTO> createOpportunityDocument(@Valid @RequestBody OpportunityDocumentDTO opportunityDocumentDTO) throws URISyntaxException {
        log.debug("REST request to save OpportunityDocument : {}", opportunityDocumentDTO);
        if (opportunityDocumentDTO.getId() != null) {
            throw new BadRequestAlertException("A new opportunityDocument cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OpportunityDocumentDTO result = opportunityDocumentService.save(opportunityDocumentDTO);
        return ResponseEntity.created(new URI("/api/opportunity-documents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /opportunity-documents} : Updates an existing opportunityDocument.
     *
     * @param opportunityDocumentDTO the opportunityDocumentDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated opportunityDocumentDTO,
     * or with status {@code 400 (Bad Request)} if the opportunityDocumentDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the opportunityDocumentDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/opportunity-documents")
    public ResponseEntity<OpportunityDocumentDTO> updateOpportunityDocument(@Valid @RequestBody OpportunityDocumentDTO opportunityDocumentDTO) throws URISyntaxException {
        log.debug("REST request to update OpportunityDocument : {}", opportunityDocumentDTO);
        if (opportunityDocumentDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OpportunityDocumentDTO result = opportunityDocumentService.save(opportunityDocumentDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, opportunityDocumentDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /opportunity-documents} : get all the opportunityDocuments.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of opportunityDocuments in body.
     */
    @GetMapping("/opportunity-documents")
    public List<OpportunityDocumentDTO> getAllOpportunityDocuments() {
        log.debug("REST request to get all OpportunityDocuments");
        return opportunityDocumentService.findAll();
    }

    /**
     * {@code GET  /opportunity-documents/:id} : get the "id" opportunityDocument.
     *
     * @param id the id of the opportunityDocumentDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the opportunityDocumentDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/opportunity-documents/{id}")
    public ResponseEntity<OpportunityDocumentDTO> getOpportunityDocument(@PathVariable Long id) {
        log.debug("REST request to get OpportunityDocument : {}", id);
        Optional<OpportunityDocumentDTO> opportunityDocumentDTO = opportunityDocumentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(opportunityDocumentDTO);
    }

    /**
     * {@code DELETE  /opportunity-documents/:id} : delete the "id" opportunityDocument.
     *
     * @param id the id of the opportunityDocumentDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/opportunity-documents/{id}")
    public ResponseEntity<Void> deleteOpportunityDocument(@PathVariable Long id) {
        log.debug("REST request to delete OpportunityDocument : {}", id);
        opportunityDocumentService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
