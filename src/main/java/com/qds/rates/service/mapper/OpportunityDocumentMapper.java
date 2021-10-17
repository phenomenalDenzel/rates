package com.qds.rates.service.mapper;


import com.qds.rates.domain.*;
import com.qds.rates.service.dto.OpportunityDocumentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link OpportunityDocument} and its DTO {@link OpportunityDocumentDTO}.
 */
@Mapper(componentModel = "spring", uses = {OpportunityMapper.class})
public interface OpportunityDocumentMapper extends EntityMapper<OpportunityDocumentDTO, OpportunityDocument> {

    @Mapping(source = "opportunity.id", target = "opportunityId")
    @Mapping(source = "opportunity.name", target = "opportunityName")
    OpportunityDocumentDTO toDto(OpportunityDocument opportunityDocument);

    @Mapping(source = "opportunityId", target = "opportunity")
    OpportunityDocument toEntity(OpportunityDocumentDTO opportunityDocumentDTO);

    default OpportunityDocument fromId(Long id) {
        if (id == null) {
            return null;
        }
        OpportunityDocument opportunityDocument = new OpportunityDocument();
        opportunityDocument.setId(id);
        return opportunityDocument;
    }
}
