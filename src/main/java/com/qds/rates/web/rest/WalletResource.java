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

import com.qds.rates.service.WalletService;
import com.qds.rates.service.dto.WalletDTO;
import com.qds.rates.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link com.qds.rates.domain.Wallet}.
 */
@RestController
@RequestMapping("/api")
public class WalletResource {

    private final Logger log = LoggerFactory.getLogger(WalletResource.class);

    private static final String ENTITY_NAME = "wallet";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final WalletService walletService;

    public WalletResource(WalletService walletService) {
        this.walletService = walletService;
    }

    /**
     * {@code POST  /wallets} : Create a new wallet.
     *
     * @param walletDTO the walletDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new walletDTO, or with status {@code 400 (Bad Request)} if the wallet has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/wallets")
    public ResponseEntity<WalletDTO> createWallet(@Valid @RequestBody WalletDTO walletDTO) throws URISyntaxException {
        log.debug("REST request to save Wallet : {}", walletDTO);
        if (walletDTO.getId() != null) {
            throw new BadRequestAlertException("A new wallet cannot already have an ID", ENTITY_NAME, "idexists");
        }
        WalletDTO result = walletService.save(walletDTO);
        return ResponseEntity.created(new URI("/api/wallets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /wallets} : Updates an existing wallet.
     *
     * @param walletDTO the walletDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated walletDTO,
     * or with status {@code 400 (Bad Request)} if the walletDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the walletDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/wallets")
    public ResponseEntity<WalletDTO> updateWallet(@Valid @RequestBody WalletDTO walletDTO) throws URISyntaxException {
        log.debug("REST request to update Wallet : {}", walletDTO);
        if (walletDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        WalletDTO result = walletService.save(walletDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, walletDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /wallets} : get all the wallets.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of wallets in body.
     */
    @GetMapping("/wallets")
    public List<WalletDTO> getAllWallets() {
        log.debug("REST request to get all Wallets");
        return walletService.findAll();
    }

    /**
     * {@code GET  /wallets/:id} : get the "id" wallet.
     *
     * @param id the id of the walletDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the walletDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/wallets/{id}")
    public ResponseEntity<WalletDTO> getWallet(@PathVariable Long id) {
        log.debug("REST request to get Wallet : {}", id);
        Optional<WalletDTO> walletDTO = walletService.findOne(id);
        return ResponseUtil.wrapOrNotFound(walletDTO);
    }

    /**
     * {@code DELETE  /wallets/:id} : delete the "id" wallet.
     *
     * @param id the id of the walletDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/wallets/{id}")
    public ResponseEntity<Void> deleteWallet(@PathVariable Long id) {
        log.debug("REST request to delete Wallet : {}", id);
        walletService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

}
