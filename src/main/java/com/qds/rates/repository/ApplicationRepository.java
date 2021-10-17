package com.qds.rates.repository;

import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.qds.rates.domain.Application;

/**
 * Spring Data  repository for the Application entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    String APPLICATIONS_BY_CUSTOMERS_CACHE = "applicationsByLogin";

    @Cacheable(cacheNames = APPLICATIONS_BY_CUSTOMERS_CACHE)
    Page<Application> findAllByCustomerId(Pageable pageable, Long customerId);

    List<Application> findAllByCustomerIdOrderByCreatedDateDesc(Long customerId);
}
