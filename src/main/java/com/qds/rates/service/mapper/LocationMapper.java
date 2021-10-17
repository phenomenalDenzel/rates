package com.qds.rates.service.mapper;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.qds.rates.domain.Location;
import com.qds.rates.service.dto.LocationDTO;

/**
 * Mapper for the entity {@link Location} and its DTO {@link LocationDTO}.
 */
@Mapper(componentModel = "spring", uses = {CustomerMapper.class, LocalGovtMapper.class})
public interface LocationMapper extends EntityMapper<LocationDTO, Location> {

    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "localGovt.id", target = "localGovtId")
    @Mapping(source = "localGovt.name", target = "localGovtName")
    LocationDTO toDto(Location location);

    @Mapping(source = "customerId", target = "customer")
    @Mapping(source = "localGovtId", target = "localGovt")
    Location toEntity(LocationDTO locationDTO);

    default Location fromId(Long id) {
        if (id == null) {
            return null;
        }
        Location location = new Location();
        location.setId(id);
        return location;
    }
}
