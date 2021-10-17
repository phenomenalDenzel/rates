package com.qds.rates.repository;

import com.qds.rates.domain.Verification;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Verification entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VerificationRepository extends JpaRepository<Verification, Long> {
}
