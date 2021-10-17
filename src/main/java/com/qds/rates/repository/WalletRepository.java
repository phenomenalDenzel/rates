package com.qds.rates.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.qds.rates.domain.Wallet;

/**
 * Spring Data  repository for the Wallet entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WalletRepository extends JpaRepository<Wallet, Long> {
    Optional<Wallet> findOneByCustomerId(Long customerId);
}
