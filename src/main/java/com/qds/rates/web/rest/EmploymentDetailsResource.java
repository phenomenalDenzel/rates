package com.qds.rates.web.rest;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.qds.rates.service.EmploymentDetailsService;
import com.qds.rates.service.dto.EmploymentDetailsDTO;
import com.qds.rates.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link com.qds.rates.domain.EmploymentDetails}.
 */
@RestController
@RequestMapping("/api")
public class EmploymentDetailsResource {

    private final Logger log = LoggerFactory.getLogger(EmploymentDetailsResource.class);

    private static final String ENTITY_NAME = "employmentDetails";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EmploymentDetailsService employmentDetailsService;

    public EmploymentDetailsResource(EmploymentDetailsService employmentDetailsService) {
        this.employmentDetailsService = employmentDetailsService;
    }

    /**
     * {@code POST  /employment-details} : Create a new employmentDetails.
     *
     * @param employmentDetailsDTO the employmentDetailsDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new employmentDetailsDTO, or with status {@code 400 (Bad Request)} if the employmentDetails has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/employment-details")
    public ResponseEntity<EmploymentDetailsDTO> createEmploymentDetails(@Valid @RequestBody EmploymentDetailsDTO employmentDetailsDTO) throws URISyntaxException {
        log.debug("REST request to save EmploymentDetails : {}", employmentDetailsDTO);
        if (employmentDetailsDTO.getId() != null) {
            throw new BadRequestAlertException("A new employmentDetails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        if (Objects.isNull(employmentDetailsDTO.getCustomerId())) {
            throw new BadRequestAlertException("Invalid association value provided", ENTITY_NAME, "null");
        }
        EmploymentDetailsDTO result = employmentDetailsService.save(employmentDetailsDTO);
        return ResponseEntity.created(new URI("/api/employment-details/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /employment-details} : Updates an existing employmentDetails.
     *
     * @param employmentDetailsDTO the employmentDetailsDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated employmentDetailsDTO,
     * or with status {@code 400 (Bad Request)} if the employmentDetailsDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the employmentDetailsDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/employment-details")
    public ResponseEntity<EmploymentDetailsDTO> updateEmploymentDetails(@Valid @RequestBody EmploymentDetailsDTO employmentDetailsDTO) throws URISyntaxException {
        log.debug("REST request to update EmploymentDetails : {}", employmentDetailsDTO);
        if (employmentDetailsDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EmploymentDetailsDTO result = employmentDetailsService.save(employmentDetailsDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, employmentDetailsDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /employment-details} : get all the employmentDetails.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of employmentDetails in body.
     */
    @GetMapping("/employment-details")
    public List<EmploymentDetailsDTO> getAllEmploymentDetails() {
        log.debug("REST request to get all EmploymentDetails");
        return employmentDetailsService.findAll();
    }

    /**
     * {@code GET  /employment-details/:id} : get the "id" employmentDetails.
     *
     * @param id the id of the employmentDetailsDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the employmentDetailsDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/employment-details/{id}")
    public ResponseEntity<EmploymentDetailsDTO> getEmploymentDetails(@PathVariable Long id) {
        log.debug("REST request to get EmploymentDetails : {}", id);
        Optional<EmploymentDetailsDTO> employmentDetailsDTO = employmentDetailsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(employmentDetailsDTO);
    }

    /**
     * {@code DELETE  /employment-details/:id} : delete the "id" employmentDetails.
     *
     * @param id the id of the employmentDetailsDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/employment-details/{id}")
    public ResponseEntity<Void> deleteEmploymentDetails(@PathVariable Long id) {
        log.debug("REST request to delete EmploymentDetails : {}", id);
        employmentDetailsService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
