package com.qds.rates.service.mapper;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.qds.rates.domain.Verification;
import com.qds.rates.service.dto.VerificationDTO;

/**
 * Mapper for the entity {@link Verification} and its DTO {@link VerificationDTO}.
 */
@Mapper(componentModel = "spring", uses = {CustomerMapper.class})
public interface VerificationMapper extends EntityMapper<VerificationDTO, Verification> {

    @Mapping(source = "customer.id", target = "customerId")
    VerificationDTO toDto(Verification verification);

    @Mapping(source = "customerId", target = "customer")
    Verification toEntity(VerificationDTO verificationDTO);

    default Verification fromId(Long id) {
        if (id == null) {
            return null;
        }
        Verification verification = new Verification();
        verification.setId(id);
        return verification;
    }
}
