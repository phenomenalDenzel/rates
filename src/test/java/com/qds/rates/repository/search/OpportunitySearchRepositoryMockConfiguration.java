package com.qds.rates.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link OpportunitySearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class OpportunitySearchRepositoryMockConfiguration {

    @MockBean
    private OpportunitySearchRepository mockOpportunitySearchRepository;

}
