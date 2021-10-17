package com.qds.rates.web.rest;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.qds.rates.service.ApplicationService;
import com.qds.rates.service.dto.ApplicationDTO;
import com.qds.rates.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link com.qds.rates.domain.Application}.
 */
@RestController
@RequestMapping("/api")
public class ApplicationResource {

    private final Logger log = LoggerFactory.getLogger(ApplicationResource.class);

    private static final String ENTITY_NAME = "application";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ApplicationService applicationService;

    public ApplicationResource(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    /**
     * {@code POST  /applications} : Create a new application.
     *
     * @param applicationDTO the applicationDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new applicationDTO, or with status {@code 400 (Bad Request)} if the application has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/applications")
    public ResponseEntity<ApplicationDTO> createApplication(@Valid @RequestBody ApplicationDTO applicationDTO) throws URISyntaxException {
        log.debug("REST request to save Application : {}", applicationDTO);
        if (applicationDTO.getId() != null) {
            throw new BadRequestAlertException("A new application cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ApplicationDTO result = applicationService.createApplicationForCustomer(applicationDTO);
        return ResponseEntity.created(new URI("/api/applications/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /applications} : Updates an existing application.
     *
     * @param applicationDTO the applicationDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated applicationDTO,
     * or with status {@code 400 (Bad Request)} if the applicationDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the applicationDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/applications")
    public ResponseEntity<ApplicationDTO> updateApplication(@Valid @RequestBody ApplicationDTO applicationDTO) throws URISyntaxException {
        log.debug("REST request to update Application : {}", applicationDTO);
        if (applicationDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ApplicationDTO result = applicationService.save(applicationDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, applicationDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /applications} : get all the applications.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of applications in body.
     */
    @GetMapping("/applications")
    public ResponseEntity<List<ApplicationDTO>> getAllApplications(Pageable pageable) {
        log.debug("REST request to get a page of Applications");
        Page<ApplicationDTO> page = applicationService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /applications/:id} : get the "id" application.
     *
     * @param id the id of the applicationDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the applicationDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/applications/{id}")
    public ResponseEntity<ApplicationDTO> getApplication(@PathVariable Long id) {
        log.debug("REST request to get Application : {}", id);
        Optional<ApplicationDTO> applicationDTO = applicationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(applicationDTO);
    }

    /**
     * {@code DELETE  /applications/:id} : delete the "id" application.
     *
     * @param id the id of the applicationDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/applications/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long id) {
        log.debug("REST request to delete Application : {}", id);
        applicationService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code POST  /opportunity/apply} : Creates a new application of opportunity for a customer.
     *
     * @param applicationDTO the opportunityDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new applicationDTO.
     */
    @PostMapping("applications/customer/apply")
    public ResponseEntity<ApplicationDTO> applyForOpportunity(@RequestBody ApplicationDTO applicationDTO){
        if (applicationDTO.getId() != null) {
            throw new BadRequestAlertException("A new application cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return ResponseEntity.status(HttpStatus.CREATED)
                             .body(applicationService.createApplicationAsCurrentCustomer(applicationDTO));
    }
}
