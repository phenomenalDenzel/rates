package com.qds.rates.service.mapper;


import com.qds.rates.domain.*;
import com.qds.rates.service.dto.NextOfKinDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link NextOfKin} and its DTO {@link NextOfKinDTO}.
 */
@Mapper(componentModel = "spring", uses = {CustomerMapper.class})
public interface NextOfKinMapper extends EntityMapper<NextOfKinDTO, NextOfKin> {

    @Mapping(source = "customer.id", target = "customerId")
    NextOfKinDTO toDto(NextOfKin nextOfKin);

    @Mapping(source = "customerId", target = "customer")
    NextOfKin toEntity(NextOfKinDTO nextOfKinDTO);

    default NextOfKin fromId(Long id) {
        if (id == null) {
            return null;
        }
        NextOfKin nextOfKin = new NextOfKin();
        nextOfKin.setId(id);
        return nextOfKin;
    }
}
