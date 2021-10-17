package com.qds.rates.service;

import com.qds.rates.domain.WalletOperation;
import com.qds.rates.repository.WalletOperationRepository;
import com.qds.rates.service.dto.WalletOperationDTO;
import com.qds.rates.service.mapper.WalletOperationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link WalletOperation}.
 */
@Service
@Transactional
public class WalletOperationService {

    private final Logger log = LoggerFactory.getLogger(WalletOperationService.class);

    private final WalletOperationRepository walletOperationRepository;

    private final WalletOperationMapper walletOperationMapper;

    public WalletOperationService(WalletOperationRepository walletOperationRepository, WalletOperationMapper walletOperationMapper) {
        this.walletOperationRepository = walletOperationRepository;
        this.walletOperationMapper = walletOperationMapper;
    }

    /**
     * Save a walletOperation.
     *
     * @param walletOperationDTO the entity to save.
     * @return the persisted entity.
     */
    public WalletOperationDTO save(WalletOperationDTO walletOperationDTO) {
        log.debug("Request to save WalletOperation : {}", walletOperationDTO);
        WalletOperation walletOperation = walletOperationMapper.toEntity(walletOperationDTO);
        walletOperation = walletOperationRepository.save(walletOperation);
        WalletOperationDTO result = walletOperationMapper.toDto(walletOperation);
        return result;
    }

    /**
     * Get all the walletOperations.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<WalletOperationDTO> findAll(Pageable pageable) {
        log.debug("Request to get all WalletOperations");
        return walletOperationRepository.findAll(pageable)
            .map(walletOperationMapper::toDto);
    }


    /**
     * Get one walletOperation by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<WalletOperationDTO> findOne(Long id) {
        log.debug("Request to get WalletOperation : {}", id);
        return walletOperationRepository.findById(id)
            .map(walletOperationMapper::toDto);
    }

    /**
     * Delete the walletOperation by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete WalletOperation : {}", id);
        walletOperationRepository.deleteById(id);
    }
}
