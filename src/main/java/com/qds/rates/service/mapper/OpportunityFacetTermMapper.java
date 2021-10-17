package com.qds.rates.service.mapper;

import io.searchbox.core.search.aggregation.TermsAggregation;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.qds.rates.service.dto.OpportunityFacetTermDTO;

@Mapper(componentModel = "spring", uses = {})
public interface OpportunityFacetTermMapper{

    @Mapping(target = "term", source="keyAsString")
    @Mapping(target = "count", source="count")
    OpportunityFacetTermDTO toDTO(TermsAggregation.Entry entry);
}
