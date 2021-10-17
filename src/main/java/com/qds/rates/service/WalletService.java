package com.qds.rates.service;

import java.math.BigDecimal;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.qds.rates.domain.Wallet;
import com.qds.rates.repository.WalletRepository;
import com.qds.rates.service.dto.CustomerDTO;
import com.qds.rates.service.dto.WalletDTO;
import com.qds.rates.service.mapper.WalletMapper;

/**
 * Service Implementation for managing {@link Wallet}.
 */
@Service
@Transactional
public class WalletService {

    private final Logger log = LoggerFactory.getLogger(WalletService.class);

    private final WalletRepository walletRepository;

    private final WalletMapper walletMapper;

    public WalletService(WalletRepository walletRepository, WalletMapper walletMapper) {
        this.walletRepository = walletRepository;
        this.walletMapper = walletMapper;
    }

    /**
     * Save a wallet.
     *
     * @param walletDTO the entity to save.
     * @return the persisted entity.
     */
    public WalletDTO save(WalletDTO walletDTO) {
        log.debug("Request to save Wallet : {}", walletDTO);
        Wallet wallet = walletMapper.toEntity(walletDTO);
        wallet = walletRepository.save(wallet);
        WalletDTO result = walletMapper.toDto(wallet);
        return result;
    }

    /**
     * Get all the wallets.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<WalletDTO> findAll() {
        log.debug("Request to get all Wallets");
        return walletRepository.findAll().stream()
            .map(walletMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one wallet by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<WalletDTO> findOne(Long id) {
        log.debug("Request to get Wallet : {}", id);
        return walletRepository.findById(id)
            .map(walletMapper::toDto);
    }

    /**
     * Delete the wallet by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Wallet : {}", id);
        walletRepository.deleteById(id);
    }

    public WalletDTO findWalletByCustomerId(Long customerId){
        Optional<Wallet> walletOptional = walletRepository.findOneByCustomerId(customerId);
        if(!walletOptional.isPresent()){
            throw new IllegalStateException("Customer not attached to any Wallet");
        }
        return walletOptional.map(walletMapper::toDto).get();
    }

    /**
     * Checks if customer wallet balance is sufficient and deducts the balance if true.
     *
     * @param amount for the application.
     */
    public boolean isUserBalanceSufficient(BigDecimal amount, CustomerDTO customerDTO){
        Optional<WalletDTO> optionalWalletDTO = findOne(customerDTO.getWalletId());
        if(optionalWalletDTO.isPresent()){
            WalletDTO walletDTO =  optionalWalletDTO.get();
            BigDecimal remainingBalance = walletDTO.getBalance().subtract(amount);
            if(remainingBalance.doubleValue()>=0){
                return true;
            }else return false;
        }else throw new IllegalStateException("No Wallet Found");
    }

    /**
     * Debits customer's wallet.
     *
     * @param customerDTO
     * @param amount to be debited out of the wallet
     */
    public BigDecimal performDebitTransaction(CustomerDTO customerDTO, BigDecimal amount){
        Optional<WalletDTO> walletOptional = findOne(customerDTO.getWalletId());
        if(!walletOptional.isPresent()){
            throw new IllegalStateException("No Wallet Found");
        }
        WalletDTO walletDTO = walletOptional.get();
        BigDecimal newBalance = walletDTO.getBalance()
                                         .subtract(amount);
        walletDTO.setBalance(newBalance);
        save(walletDTO);
        return newBalance;
    }

    /**
     * Credits customer's wallet.
     *
     * @param customerDTO
     * @param amount to be credited into the wallet
     */
    public BigDecimal performCreditTransaction(CustomerDTO customerDTO, BigDecimal amount){
        Optional<WalletDTO> walletOptional = findOne(customerDTO.getWalletId());
        if(!walletOptional.isPresent()){
            throw new IllegalStateException("No Wallet Found");
        }
        WalletDTO walletDTO = walletOptional.get();
        BigDecimal newBalance = walletDTO.getBalance()
                                         .add(amount);
        walletDTO.setBalance(newBalance);
        save(walletDTO);
        return newBalance;
    }
}
