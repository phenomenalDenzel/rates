package com.qds.rates.repository;

import com.qds.rates.domain.EmploymentDetails;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the EmploymentDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmploymentDetailsRepository extends JpaRepository<EmploymentDetails, Long> {
}
