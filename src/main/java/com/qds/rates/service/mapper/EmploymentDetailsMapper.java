package com.qds.rates.service.mapper;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.qds.rates.domain.EmploymentDetails;
import com.qds.rates.service.dto.EmploymentDetailsDTO;

/**
 * Mapper for the entity {@link EmploymentDetails} and its DTO {@link EmploymentDetailsDTO}.
 */
@Mapper(componentModel = "spring", uses = {CustomerMapper.class, LocalGovtMapper.class})
public interface EmploymentDetailsMapper extends EntityMapper<EmploymentDetailsDTO, EmploymentDetails> {

    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "localGovt.id", target = "localGovtId")
    @Mapping(source = "localGovt.name", target = "localGovtName")
    EmploymentDetailsDTO toDto(EmploymentDetails employmentDetails);

    @Mapping(source = "customerId", target = "customer")
    @Mapping(source = "localGovtId", target = "localGovt")
    EmploymentDetails toEntity(EmploymentDetailsDTO employmentDetailsDTO);

    default EmploymentDetails fromId(Long id) {
        if (id == null) {
            return null;
        }
        EmploymentDetails employmentDetails = new EmploymentDetails();
        employmentDetails.setId(id);
        return employmentDetails;
    }
}
