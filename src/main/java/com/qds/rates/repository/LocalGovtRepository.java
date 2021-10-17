package com.qds.rates.repository;

import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.qds.rates.domain.LocalGovt;
import com.qds.rates.domain.enumeration.State;

/**
 * Spring Data  repository for the LocalGovt entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LocalGovtRepository extends JpaRepository<LocalGovt, Long> {

    String ACTIVE_LOCAL_GOVTS_BY_STATE = "activeLocalGovtsByState";

    @Cacheable(cacheNames = ACTIVE_LOCAL_GOVTS_BY_STATE )
    List<LocalGovt> findByActiveTrueAndStateOrderByNameAsc(State state);
}
