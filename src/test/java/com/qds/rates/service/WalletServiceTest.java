package com.qds.rates.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.qds.rates.domain.Wallet;
import com.qds.rates.repository.WalletRepository;
import com.qds.rates.service.dto.CustomerDTO;
import com.qds.rates.service.dto.WalletDTO;
import com.qds.rates.service.mapper.WalletMapper;

class WalletServiceTest {

    private static final BigDecimal DEFAULT_BALANCE = new BigDecimal(20000);
    private static final BigDecimal UPDATED_BALANCE = new BigDecimal(10000);

    private final WalletRepository walletRepository = mock(WalletRepository.class);

    private final WalletMapper walletMapper = mock(WalletMapper.class);

    private WalletService walletService;

    @BeforeEach
    void setUp() {
        walletService = new WalletService(walletRepository, walletMapper);
    }

    @Test
    public void isUserBalanceSufficient_ShouldThrowIllegalStateException_WhenWalletDoesNotExist() {
        when(walletRepository.findById(1l)).thenReturn(Optional.empty());

        Assertions.assertThrows(IllegalStateException.class,
                                () -> walletService.isUserBalanceSufficient(new BigDecimal(20000), new CustomerDTO()));
    }

    @Test
    public void isUserBalanceSufficient_ShouldReturnFalse_WhenAmountIsNotSufficient() {
        Wallet wallet = new Wallet();
        when(walletRepository.findById(1l)).thenReturn(Optional.of(wallet));

        WalletDTO walletDTO = new WalletDTO();
        walletDTO.setBalance(new BigDecimal(10000));
        when(walletMapper.toDto(wallet)).thenReturn(walletDTO);

        CustomerDTO customerDTO = new CustomerDTO();
        customerDTO.setId(1l);
        customerDTO.setWalletId(1l);

        boolean result = walletService.isUserBalanceSufficient(DEFAULT_BALANCE, customerDTO);
        assertThat(result).isFalse();
    }

    @Test
    public void isUserBalanceSufficient_ShouldReturnTrue_WhenAmountIsSufficient() {
        Wallet wallet = new Wallet();
        when(walletRepository.findById(1l)).thenReturn(Optional.of(wallet));

        WalletDTO walletDTO = new WalletDTO();
        walletDTO.setBalance(DEFAULT_BALANCE);
        when(walletMapper.toDto(wallet)).thenReturn(walletDTO);

        CustomerDTO customerDTO = new CustomerDTO();
        customerDTO.setId(1l);
        customerDTO.setWalletId(1l);

        boolean result = walletService.isUserBalanceSufficient(DEFAULT_BALANCE, customerDTO);
        assertThat(result).isTrue();
    }

    @Test
    public void performDebitTransaction_ShouldSucceed_WhenWalletExists() {
        Wallet wallet = new Wallet();
        when(walletRepository.findById(1l)).thenReturn(Optional.of(wallet));

        WalletDTO walletDTO = new WalletDTO();
        walletDTO.setBalance(DEFAULT_BALANCE);
        walletDTO.setId(1l);
        when(walletMapper.toDto(wallet)).thenReturn(walletDTO);

        CustomerDTO customerDTO = new CustomerDTO();
        customerDTO.setId(1l);
        customerDTO.setWalletId(1l);

        BigDecimal remainingBalance = DEFAULT_BALANCE.subtract(UPDATED_BALANCE);
        BigDecimal newBalance = walletService.performDebitTransaction(customerDTO, UPDATED_BALANCE);

        //Validate
        assertThat(remainingBalance).isEqualTo(newBalance);
    }

    @Test
    public void performDebitTransaction_ShouldThrowIllegalStateException_WhenWalletDoesNotExist() {
        when(walletRepository.findById(1l)).thenReturn(Optional.empty());

        Assertions.assertThrows(IllegalStateException.class, () -> walletService.performDebitTransaction(new CustomerDTO(), UPDATED_BALANCE));
    }

    @Test
    public void performCreditTransaction_ShouldSucceed_WhenWalletExists() {
        Wallet wallet = new Wallet();
        when(walletRepository.findById(1l)).thenReturn(Optional.of(wallet));

        WalletDTO walletDTO = new WalletDTO();
        walletDTO.setBalance(DEFAULT_BALANCE);
        walletDTO.setId(1l);
        when(walletMapper.toDto(wallet)).thenReturn(walletDTO);

        CustomerDTO customerDTO = new CustomerDTO();
        customerDTO.setId(1l);
        customerDTO.setWalletId(1l);

        BigDecimal remainingBalance = DEFAULT_BALANCE.add(UPDATED_BALANCE);
        BigDecimal newBalance = walletService.performCreditTransaction(customerDTO, UPDATED_BALANCE);

        //Validate
        assertThat(remainingBalance).isEqualTo(newBalance);
    }

    @Test
    public void performCreditTransaction_ShouldThrowIllegalStateException_WhenWalletDoesNotExist() {
        when(walletRepository.findById(1l)).thenReturn(Optional.empty());

        Assertions.assertThrows(IllegalStateException.class, () -> walletService.performDebitTransaction(new CustomerDTO(), UPDATED_BALANCE));
    }
}