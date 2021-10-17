package com.qds.rates.web.rest;

import com.qds.rates.service.VerificationService;
import com.qds.rates.service.dto.VerificationDTO;
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
 * REST controller for managing {@link com.qds.rates.domain.Verification}.
 */
@RestController
@RequestMapping("/api")
public class VerificationResource {

    private final Logger log = LoggerFactory.getLogger(VerificationResource.class);

    private static final String ENTITY_NAME = "verification";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VerificationService verificationService;

    public VerificationResource(VerificationService verificationService) {
        this.verificationService = verificationService;
    }

    /**
     * {@code POST  /verifications} : Create a new verification.
     *
     * @param verificationDTO the verificationDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new verificationDTO, or with status {@code 400 (Bad Request)} if the verification has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/verifications")
    public ResponseEntity<VerificationDTO> createVerification(@Valid @RequestBody VerificationDTO verificationDTO) throws URISyntaxException {
        log.debug("REST request to save Verification : {}", verificationDTO);
        if (verificationDTO.getId() != null) {
            throw new BadRequestAlertException("A new verification cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VerificationDTO result = verificationService.save(verificationDTO);
        return ResponseEntity.created(new URI("/api/verifications/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /verifications} : Updates an existing verification.
     *
     * @param verificationDTO the verificationDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated verificationDTO,
     * or with status {@code 400 (Bad Request)} if the verificationDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the verificationDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/verifications")
    public ResponseEntity<VerificationDTO> updateVerification(@Valid @RequestBody VerificationDTO verificationDTO) throws URISyntaxException {
        log.debug("REST request to update Verification : {}", verificationDTO);
        if (verificationDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        VerificationDTO result = verificationService.save(verificationDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, verificationDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /verifications} : get all the verifications.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of verifications in body.
     */
    @GetMapping("/verifications")
    public List<VerificationDTO> getAllVerifications() {
        log.debug("REST request to get all Verifications");
        return verificationService.findAll();
    }

    /**
     * {@code GET  /verifications/:id} : get the "id" verification.
     *
     * @param id the id of the verificationDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the verificationDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/verifications/{id}")
    public ResponseEntity<VerificationDTO> getVerification(@PathVariable Long id) {
        log.debug("REST request to get Verification : {}", id);
        Optional<VerificationDTO> verificationDTO = verificationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(verificationDTO);
    }

    /**
     * {@code DELETE  /verifications/:id} : delete the "id" verification.
     *
     * @param id the id of the verificationDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/verifications/{id}")
    public ResponseEntity<Void> deleteVerification(@PathVariable Long id) {
        log.debug("REST request to delete Verification : {}", id);
        verificationService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
