package com.qds.rates.service.mapper;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.qds.rates.domain.Application;
import com.qds.rates.service.dto.ApplicationDTO;

/**
 * Mapper for the entity {@link Application} and its DTO {@link ApplicationDTO}.
 */
@Mapper(componentModel = "spring", uses = {CustomerMapper.class, OpportunityMapper.class})
public interface ApplicationMapper extends EntityMapper<ApplicationDTO, Application> {

    @Mapping(source = "customer.id", target = "customerId")
    @Mapping(source = "opportunity.id", target = "opportunityId")
    @Mapping(source = "opportunity.name", target = "opportunityName")
    ApplicationDTO toDto(Application application);

    @Mapping(source = "customerId", target = "customer")
    @Mapping(source = "opportunityId", target = "opportunity")
    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "lastModifiedBy", ignore = true)
    @Mapping(target = "lastModifiedDate", ignore = true)
    Application toEntity(ApplicationDTO applicationDTO);

    default Application fromId(Long id) {
        if (id == null) {
            return null;
        }
        Application application = new Application();
        application.setId(id);
        return application;
    }
}
