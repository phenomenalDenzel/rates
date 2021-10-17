package com.qds.rates.repository;

import com.qds.rates.domain.OpportunityDocument;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the OpportunityDocument entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OpportunityDocumentRepository extends JpaRepository<OpportunityDocument, Long> {
}
