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
import org.springframework.web.bind.annotation.RestController;

import com.qds.rates.domain.enumeration.State;
import com.qds.rates.service.LocalGovtService;
import com.qds.rates.service.dto.LocalGovtDTO;
import com.qds.rates.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link com.qds.rates.domain.LocalGovt}.
 */
@RestController
@RequestMapping("/api")
public class LocalGovtResource {

    private final Logger log = LoggerFactory.getLogger(LocalGovtResource.class);

    private static final String ENTITY_NAME = "localGovt";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LocalGovtService localGovtService;

    public LocalGovtResource(LocalGovtService localGovtService) {
        this.localGovtService = localGovtService;
    }

    /**
     * {@code POST  /local-govts} : Create a new localGovt.
     *
     * @param localGovtDTO the localGovtDTO to create.
     *
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new localGovtDTO, or with status {@code 400 (Bad Request)} if the localGovt has already an ID.
     *
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/local-govts")
    public ResponseEntity<LocalGovtDTO> createLocalGovt(@Valid @RequestBody LocalGovtDTO localGovtDTO) throws URISyntaxException {
        log.debug("REST request to save LocalGovt : {}", localGovtDTO);
        if (localGovtDTO.getId() != null) {
            throw new BadRequestAlertException("A new localGovt cannot already have an ID", ENTITY_NAME, "idexists");
        }
        LocalGovtDTO result = localGovtService.save(localGovtDTO);
        return ResponseEntity.created(new URI("/api/local-govts/" + result.getId()))
                             .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId()
                                                                                                                     .toString()))
                             .body(result);
    }

    /**
     * {@code PUT  /local-govts} : Updates an existing localGovt.
     *
     * @param localGovtDTO the localGovtDTO to update.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated localGovtDTO,
     * or with status {@code 400 (Bad Request)} if the localGovtDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the localGovtDTO couldn't be updated.
     *
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/local-govts")
    public ResponseEntity<LocalGovtDTO> updateLocalGovt(@Valid @RequestBody LocalGovtDTO localGovtDTO) throws URISyntaxException {
        log.debug("REST request to update LocalGovt : {}", localGovtDTO);
        if (localGovtDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        LocalGovtDTO result = localGovtService.save(localGovtDTO);
        return ResponseEntity.ok()
                             .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, localGovtDTO.getId()
                                                                                                                         .toString()))
                             .body(result);
    }

    /**
     * {@code GET  /local-govts} : get all the localGovts.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of localGovts in body.
     */
    @GetMapping("/local-govts")
    public List<LocalGovtDTO> getAllLocalGovts() {
        log.debug("REST request to get all LocalGovts");
        return localGovtService.findAll();
    }

    /**
     * {@code GET  /local-govts/:id} : get the "id" localGovt.
     *
     * @param id the id of the localGovtDTO to retrieve.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the localGovtDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/local-govts/{id}")
    public ResponseEntity<LocalGovtDTO> getLocalGovt(@PathVariable Long id) {
        log.debug("REST request to get LocalGovt : {}", id);
        Optional<LocalGovtDTO> localGovtDTO = localGovtService.findOne(id);
        return ResponseUtil.wrapOrNotFound(localGovtDTO);
    }

    /**
     * {@code DELETE  /local-govts/:id} : delete the "id" localGovt.
     *
     * @param id the id of the localGovtDTO to delete.
     *
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/local-govts/{id}")
    public ResponseEntity<Void> deleteLocalGovt(@PathVariable Long id) {
        log.debug("REST request to delete LocalGovt : {}", id);

        localGovtService.delete(id);
        return ResponseEntity.noContent()
                             .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
                             .build();
    }

    /**
     * {@code GET  /local-govts/state/{state}} : get all the localGovts by state.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of localGovts in body.
     */
    @GetMapping("/local-govts/state/{state}")
    public List<LocalGovtDTO> getLocalGovtsByState(@PathVariable State state) {
        return localGovtService.getLocalGovtsByState(state);
    }
}
