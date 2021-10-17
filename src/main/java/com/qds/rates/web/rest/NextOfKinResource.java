package com.qds.rates.web.rest;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.qds.rates.service.NextOfKinService;
import com.qds.rates.service.dto.NextOfKinDTO;
import com.qds.rates.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link com.qds.rates.domain.NextOfKin}.
 */
@RestController
@RequestMapping("/api")
public class NextOfKinResource {

    private final Logger log = LoggerFactory.getLogger(NextOfKinResource.class);

    private static final String ENTITY_NAME = "nextOfKin";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NextOfKinService nextOfKinService;

    public NextOfKinResource(NextOfKinService nextOfKinService) {
        this.nextOfKinService = nextOfKinService;
    }

    /**
     * {@code POST  /next-of-kins} : Create a new nextOfKin.
     *
     * @param nextOfKinDTO the nextOfKinDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new nextOfKinDTO, or with status {@code 400 (Bad Request)} if the nextOfKin has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/next-of-kins")
    public ResponseEntity<NextOfKinDTO> createNextOfKin(@Valid @RequestBody NextOfKinDTO nextOfKinDTO) throws URISyntaxException {
        log.debug("REST request to save NextOfKin : {}", nextOfKinDTO);
        if (nextOfKinDTO.getId() != null) {
            throw new BadRequestAlertException("A new nextOfKin cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NextOfKinDTO result = nextOfKinService.save(nextOfKinDTO);
        return ResponseEntity.created(new URI("/api/next-of-kins/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /next-of-kins} : Updates an existing nextOfKin.
     *
     * @param nextOfKinDTO the nextOfKinDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated nextOfKinDTO,
     * or with status {@code 400 (Bad Request)} if the nextOfKinDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the nextOfKinDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/next-of-kins")
    public ResponseEntity<NextOfKinDTO> updateNextOfKin(@Valid @RequestBody NextOfKinDTO nextOfKinDTO) throws URISyntaxException {
        log.debug("REST request to update NextOfKin : {}", nextOfKinDTO);
        if (nextOfKinDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NextOfKinDTO result = nextOfKinService.save(nextOfKinDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, nextOfKinDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /next-of-kins} : get all the nextOfKins.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of nextOfKins in body.
     */
    @GetMapping("/next-of-kins")
    public List<NextOfKinDTO> getAllNextOfKins() {
        log.debug("REST request to get all NextOfKins");
        return nextOfKinService.findAll();
    }

    /**
     * {@code GET  /next-of-kins/:id} : get the "id" nextOfKin.
     *
     * @param id the id of the nextOfKinDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the nextOfKinDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/next-of-kins/{id}")
    public ResponseEntity<NextOfKinDTO> getNextOfKin(@PathVariable Long id) {
        log.debug("REST request to get NextOfKin : {}", id);
        Optional<NextOfKinDTO> nextOfKinDTO = nextOfKinService.findOne(id);
        return ResponseUtil.wrapOrNotFound(nextOfKinDTO);
    }

    /**
     * {@code DELETE  /next-of-kins/:id} : delete the "id" nextOfKin.
     *
     * @param id the id of the nextOfKinDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/next-of-kins/{id}")
    public ResponseEntity<Void> deleteNextOfKin(@PathVariable Long id) {
        log.debug("REST request to delete NextOfKin : {}", id);
        nextOfKinService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
