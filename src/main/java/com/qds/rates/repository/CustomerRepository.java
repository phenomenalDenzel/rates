package com.qds.rates.repository;

import java.util.Optional;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.qds.rates.domain.Customer;

/**
 * Spring Data  repository for the Customer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    String CUSTOMERS_BY_LOGIN_CACHE = "customersByLogin";

    @Cacheable(cacheNames = CUSTOMERS_BY_LOGIN_CACHE)
    Optional<Customer> findOneByUserLogin(final String login);

    Optional<Customer> findOneByBvn(final String bvn);
}
