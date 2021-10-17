package com.qds.rates.web.rest;

import com.qds.rates.service.WalletOperationService;
import com.qds.rates.service.dto.WalletOperationDTO;
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
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.qds.rates.domain.WalletOperation}.
 */
@RestController
@RequestMapping("/api")
public class WalletOperationResource {

    private final Logger log = LoggerFactory.getLogger(WalletOperationResource.class);

    private static final String ENTITY_NAME = "walletOperation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final WalletOperationService walletOperationService;

    public WalletOperationResource(WalletOperationService walletOperationService) {
        this.walletOperationService = walletOperationService;
    }

    /**
     * {@code POST  /wallet-operations} : Create a new walletOperation.
     *
     * @param walletOperationDTO the walletOperationDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new walletOperationDTO, or with status {@code 400 (Bad Request)} if the walletOperation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/wallet-operations")
    public ResponseEntity<WalletOperationDTO> createWalletOperation(@Valid @RequestBody WalletOperationDTO walletOperationDTO) throws URISyntaxException {
        log.debug("REST request to save WalletOperation : {}", walletOperationDTO);
        if (walletOperationDTO.getId() != null) {
            throw new BadRequestAlertException("A new walletOperation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        WalletOperationDTO result = walletOperationService.save(walletOperationDTO);
        return ResponseEntity.created(new URI("/api/wallet-operations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /wallet-operations} : Updates an existing walletOperation.
     *
     * @param walletOperationDTO the walletOperationDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated walletOperationDTO,
     * or with status {@code 400 (Bad Request)} if the walletOperationDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the walletOperationDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/wallet-operations")
    public ResponseEntity<WalletOperationDTO> updateWalletOperation(@Valid @RequestBody WalletOperationDTO walletOperationDTO) throws URISyntaxException {
        log.debug("REST request to update WalletOperation : {}", walletOperationDTO);
        if (walletOperationDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        WalletOperationDTO result = walletOperationService.save(walletOperationDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, walletOperationDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /wallet-operations} : get all the walletOperations.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of walletOperations in body.
     */
    @GetMapping("/wallet-operations")
    public ResponseEntity<List<WalletOperationDTO>> getAllWalletOperations(Pageable pageable) {
        log.debug("REST request to get a page of WalletOperations");
        Page<WalletOperationDTO> page = walletOperationService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /wallet-operations/:id} : get the "id" walletOperation.
     *
     * @param id the id of the walletOperationDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the walletOperationDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/wallet-operations/{id}")
    public ResponseEntity<WalletOperationDTO> getWalletOperation(@PathVariable Long id) {
        log.debug("REST request to get WalletOperation : {}", id);
        Optional<WalletOperationDTO> walletOperationDTO = walletOperationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(walletOperationDTO);
    }

    /**
     * {@code DELETE  /wallet-operations/:id} : delete the "id" walletOperation.
     *
     * @param id the id of the walletOperationDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/wallet-operations/{id}")
    public ResponseEntity<Void> deleteWalletOperation(@PathVariable Long id) {
        log.debug("REST request to delete WalletOperation : {}", id);
        walletOperationService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
