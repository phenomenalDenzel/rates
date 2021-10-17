package com.qds.rates.web.rest;

import com.qds.rates.service.OpportunityService;
import com.qds.rates.service.dto.FilterOptionDTO;
import com.qds.rates.service.dto.OpportunityDTO;
import com.qds.rates.service.dto.SearchResultDTO;
import com.qds.rates.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.qds.rates.domain.Opportunity}.
 */
@RestController
@RequestMapping("/api")
public class OpportunityResource {

    private final Logger log = LoggerFactory.getLogger(OpportunityResource.class);

    private static final String ENTITY_NAME = "opportunity";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OpportunityService opportunityService;

    public OpportunityResource(OpportunityService opportunityService) {
        this.opportunityService = opportunityService;
    }

    /**
     * {@code POST  /opportunities} : Create a new opportunity.
     *
     * @param opportunityDTO the opportunityDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new opportunityDTO, or with status {@code 400 (Bad Request)} if the opportunity has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/opportunities")
    public ResponseEntity<OpportunityDTO> createOpportunity(@Valid @RequestBody OpportunityDTO opportunityDTO) throws URISyntaxException {
        log.debug("REST request to save Opportunity : {}", opportunityDTO);
        if (opportunityDTO.getId() != null) {
            throw new BadRequestAlertException("A new opportunity cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OpportunityDTO result = opportunityService.save(opportunityDTO);
        return ResponseEntity.created(new URI("/api/opportunities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /opportunities} : Updates an existing opportunity.
     *
     * @param opportunityDTO the opportunityDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated opportunityDTO,
     * or with status {@code 400 (Bad Request)} if the opportunityDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the opportunityDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/opportunities")
    public ResponseEntity<OpportunityDTO> updateOpportunity(@Valid @RequestBody OpportunityDTO opportunityDTO) throws URISyntaxException {
        log.debug("REST request to update Opportunity : {}", opportunityDTO);
        if (opportunityDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OpportunityDTO result = opportunityService.save(opportunityDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, opportunityDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /opportunities} : get all the opportunities.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of opportunities in body.
     */
    @GetMapping("/opportunities")
    public ResponseEntity<List<OpportunityDTO>> getAllOpportunities(Pageable pageable) {
        log.debug("REST request to get a page of Opportunities");
        Page<OpportunityDTO> page = opportunityService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /opportunities/:id} : get the "id" opportunity.
     *
     * @param id the id of the opportunityDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the opportunityDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/opportunities/{id}")
    public ResponseEntity<OpportunityDTO> getOpportunity(@PathVariable Long id) {
        log.debug("REST request to get Opportunity : {}", id);
        Optional<OpportunityDTO> opportunityDTO = opportunityService.findOne(id);
        return ResponseUtil.wrapOrNotFound(opportunityDTO);
    }

    /**
     * {@code DELETE  /opportunities/:id} : delete the "id" opportunity.
     *
     * @param id the id of the opportunityDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/opportunities/{id}")
    public ResponseEntity<Void> deleteOpportunity(@PathVariable Long id) {
        log.debug("REST request to delete Opportunity : {}", id);
        opportunityService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/opportunities?query=:query} : search for the opportunity corresponding
     * to the query.
     *
     * @param query the query of the opportunity search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/opportunities")
    public ResponseEntity<List<OpportunityDTO>> searchOpportunities(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Opportunities for query {}", query);
        Page<OpportunityDTO> page = opportunityService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code SEARCH  /_search/opportunities/filter} : get the appropriate SearchResults for opportunity based
     * on filter options.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body of SearchResult.
     */
    @PostMapping("/_search/opportunities/filter")
    public ResponseEntity<SearchResultDTO> filterOpportunities(@RequestBody List<FilterOptionDTO> filterOptions, Pageable pageable){
        return ResponseEntity.ok().body(opportunityService.filter(filterOptions,pageable));
    }

}
