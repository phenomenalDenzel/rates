package com.qds.rates.web.rest;

import com.qds.rates.service.ProviderService;
import com.qds.rates.service.dto.ProviderDTO;
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
 * REST controller for managing {@link com.qds.rates.domain.Provider}.
 */
@RestController
@RequestMapping("/api")
public class ProviderResource {

    private final Logger log = LoggerFactory.getLogger(ProviderResource.class);

    private static final String ENTITY_NAME = "provider";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProviderService providerService;

    public ProviderResource(ProviderService providerService) {
        this.providerService = providerService;
    }

    /**
     * {@code POST  /providers} : Create a new provider.
     *
     * @param providerDTO the providerDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new providerDTO, or with status {@code 400 (Bad Request)} if the provider has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/providers")
    public ResponseEntity<ProviderDTO> createProvider(@Valid @RequestBody ProviderDTO providerDTO) throws URISyntaxException {
        log.debug("REST request to save Provider : {}", providerDTO);
        if (providerDTO.getId() != null) {
            throw new BadRequestAlertException("A new provider cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProviderDTO result = providerService.save(providerDTO);
        return ResponseEntity.created(new URI("/api/providers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /providers} : Updates an existing provider.
     *
     * @param providerDTO the providerDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated providerDTO,
     * or with status {@code 400 (Bad Request)} if the providerDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the providerDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/providers")
    public ResponseEntity<ProviderDTO> updateProvider(@Valid @RequestBody ProviderDTO providerDTO) throws URISyntaxException {
        log.debug("REST request to update Provider : {}", providerDTO);
        if (providerDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProviderDTO result = providerService.save(providerDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, providerDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /providers} : get all the providers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of providers in body.
     */
    @GetMapping("/providers")
    public List<ProviderDTO> getAllProviders() {
        log.debug("REST request to get all Providers");
        return providerService.findAll();
    }

    /**
     * {@code GET  /providers/:id} : get the "id" provider.
     *
     * @param id the id of the providerDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the providerDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/providers/{id}")
    public ResponseEntity<ProviderDTO> getProvider(@PathVariable Long id) {
        log.debug("REST request to get Provider : {}", id);
        Optional<ProviderDTO> providerDTO = providerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(providerDTO);
    }

    /**
     * {@code DELETE  /providers/:id} : delete the "id" provider.
     *
     * @param id the id of the providerDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/providers/{id}")
    public ResponseEntity<Void> deleteProvider(@PathVariable Long id) {
        log.debug("REST request to delete Provider : {}", id);
        providerService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
