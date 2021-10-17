package com.qds.rates.repository;

import com.qds.rates.domain.WalletOperation;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the WalletOperation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WalletOperationRepository extends JpaRepository<WalletOperation, Long> {
}
