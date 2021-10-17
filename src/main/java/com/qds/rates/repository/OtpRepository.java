package com.qds.rates.repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.qds.rates.domain.Otp;
import com.qds.rates.domain.enumeration.OtpAction;

/**
 * Spring Data  repository for the Otp entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OtpRepository extends JpaRepository<Otp, Long> {

    Optional<Otp> findFirstByActionAndEmailAndCreatedTimeGreaterThanEqualOrderByCreatedTimeDesc(OtpAction action,
                                                                                                  String email,
                                                                                                  Instant createdTime);

    List<Otp> findAllByCreatedTimeLessThanEqual(Instant createdTime);
}
