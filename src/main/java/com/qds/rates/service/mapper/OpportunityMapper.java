package com.qds.rates.service.mapper;


import com.qds.rates.domain.*;
import com.qds.rates.service.dto.OpportunityDTO;

import org.mapstruct.*;
import org.springframework.stereotype.Component;

/**
 * Mapper for the entity {@link Opportunity} and its DTO {@link OpportunityDTO}.
 */
@Mapper(componentModel = "spring", uses = {ProviderMapper.class})
@Component
public interface OpportunityMapper extends EntityMapper<OpportunityDTO, Opportunity> {

    @Mapping(source = "provider.id", target = "providerId")
    @Mapping(source = "provider.name", target = "providerName")
    OpportunityDTO toDto(Opportunity opportunity);

    @Mapping(target = "documents", ignore = true)
    @Mapping(target = "removeDocuments", ignore = true)
    @Mapping(source = "providerId", target = "provider")
    Opportunity toEntity(OpportunityDTO opportunityDTO);

    default Opportunity fromId(Long id) {
        if (id == null) {
            return null;
        }
        Opportunity opportunity = new Opportunity();
        opportunity.setId(id);
        return opportunity;
    }
}
