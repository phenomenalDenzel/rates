package com.qds.rates.repository;

import com.qds.rates.domain.NextOfKin;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the NextOfKin entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NextOfKinRepository extends JpaRepository<NextOfKin, Long> {
}
