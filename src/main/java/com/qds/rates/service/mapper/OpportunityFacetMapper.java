package com.qds.rates.service.mapper;

import com.qds.rates.service.dto.OpportunityFacetDTO;
import io.searchbox.core.search.aggregation.TermsAggregation;
import org.elasticsearch.search.aggregations.bucket.terms.Terms;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring", uses = {OpportunityFacetTermMapper.class})
@Component
public interface OpportunityFacetMapper{
    @Mapping(source = "name", target = "key")
    @Mapping(source="buckets", target = "terms")
    OpportunityFacetDTO toDto(TermsAggregation terms);
}
