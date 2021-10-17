package com.qds.rates.repository.search;

import java.util.HashMap;
import java.util.Map;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.qds.rates.domain.Opportunity;


/**
 * Spring Data Elasticsearch repository for the {@link Opportunity} entity.
 */
public interface OpportunitySearchRepository extends ElasticsearchRepository<Opportunity, Long> {

    String INDEX_NAME = "opportunity";
    String FACET_NAME = "facet";

    default Map<String, String> getFacets(){
        return new HashMap<String, String>() {{
            put(FacetType.TENOR, FacetType.TENOR);
            put(FacetType.EFFECTIVE_APR, FacetType.EFFECTIVE_APR);
            put(FacetType.INTEREST_RATE, FacetType.INTEREST_RATE);
            put(FacetType.MINIMUM_INVESTMENT, FacetType.MINIMUM_INVESTMENT);
            put(FacetType.OPPORTUNITY_TYPE, FacetType.OPPORTUNITY_TYPE);
            put(FacetType.PROVIDER, FacetType.PROVIDER_FIELD);
        }};

    }

    class FacetType {
        public static final String TENOR= "tenor";
        public static final String INTEREST_RATE= "interestRate";
        public static final String MINIMUM_INVESTMENT= "minimumInvestment";
        public static final String EFFECTIVE_APR= "effectiveApr";
        public static final String OPPORTUNITY_TYPE= "type";
        public static final String PROVIDER= "provider";
        public static final String PROVIDER_FIELD= "provider.name.keyword";
    }
}
