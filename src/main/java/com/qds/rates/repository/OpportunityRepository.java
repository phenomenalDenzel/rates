package com.qds.rates.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.qds.rates.domain.Opportunity;

/**
 * Spring Data  repository for the Opportunity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OpportunityRepository extends JpaRepository<Opportunity, Long> {
}
