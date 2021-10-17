package com.qds.rates.service;

import static com.qds.rates.repository.search.OpportunitySearchRepository.FACET_NAME;
import static com.qds.rates.repository.search.OpportunitySearchRepository.INDEX_NAME;
import static org.elasticsearch.index.query.QueryBuilders.matchAllQuery;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.elasticsearch.search.aggregations.AggregationBuilders.terms;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import com.github.vanroy.springdata.jest.aggregation.AggregatedPage;
import io.searchbox.core.search.aggregation.FilterAggregation;
import io.searchbox.core.search.aggregation.MetricAggregation;
import io.searchbox.core.search.aggregation.TermsAggregation;
import org.elasticsearch.action.search.SearchType;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.bucket.filter.FilterAggregationBuilder;
import org.elasticsearch.search.aggregations.bucket.terms.TermsAggregationBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.qds.rates.domain.Opportunity;
import com.qds.rates.repository.OpportunityRepository;
import com.qds.rates.repository.search.OpportunitySearchRepository;
import com.qds.rates.service.dto.FilterOptionDTO;
import com.qds.rates.service.dto.OpportunityDTO;
import com.qds.rates.service.dto.OpportunityFacetDTO;
import com.qds.rates.service.dto.OpportunitySearchDTO;
import com.qds.rates.service.dto.SearchResultDTO;
import com.qds.rates.service.mapper.OpportunityFacetMapper;
import com.qds.rates.service.mapper.OpportunityMapper;
import com.qds.rates.service.mapper.OpportunitySearchMapper;

/**
 * Service Implementation for managing {@link Opportunity}.
 */
@Service
@Transactional
public class OpportunityService {

    private final Logger log = LoggerFactory.getLogger(OpportunityService.class);

    private final String DEFAULT_DATE_PATTERN = "yyyy-MM-dd";

    private final OpportunityRepository opportunityRepository;

    private final OpportunityMapper opportunityMapper;

    private final OpportunitySearchMapper opportunitySearchMapper;

    private final OpportunityFacetMapper opportunityFacetMapper;

    private final OpportunitySearchRepository opportunitySearchRepository;

    private final ElasticsearchOperations elasticSearchTemplate;

    public OpportunityService(OpportunityRepository opportunityRepository, OpportunityMapper opportunityMapper, OpportunitySearchMapper opportunitySearchMapper, OpportunitySearchRepository opportunitySearchRepository, OpportunityFacetMapper opportunityFacetMapper, ElasticsearchOperations elasticSearchTemplate) {
        this.opportunityRepository = opportunityRepository;
        this.opportunityMapper = opportunityMapper;
        this.opportunitySearchMapper = opportunitySearchMapper;
        this.opportunitySearchRepository = opportunitySearchRepository;
        this.opportunityFacetMapper = opportunityFacetMapper;
        this.elasticSearchTemplate = elasticSearchTemplate;
    }

    /**
     * Save a opportunity.
     *
     * @param opportunityDTO the entity to save.
     *
     * @return the persisted entity.
     */
    public OpportunityDTO save(OpportunityDTO opportunityDTO) {
        log.debug("Request to save Opportunity : {}", opportunityDTO);
        Opportunity opportunity = opportunityMapper.toEntity(opportunityDTO);
        opportunity = opportunityRepository.save(opportunity);
        OpportunityDTO result = opportunityMapper.toDto(opportunity);
        opportunitySearchRepository.save(opportunity);
        return result;
    }

    /**
     * Get all the opportunities.
     *
     * @param pageable the pagination information.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<OpportunityDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Opportunities");
        return opportunityRepository.findAll(pageable)
                                    .map(opportunityMapper::toDto);
    }


    /**
     * Get one opportunity by id.
     *
     * @param id the id of the entity.
     *
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<OpportunityDTO> findOne(Long id) {
        log.debug("Request to get Opportunity : {}", id);
        return opportunityRepository.findById(id)
                                    .map(opportunityMapper::toDto);
    }

    /**
     * Delete the opportunity by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Opportunity : {}", id);
        opportunityRepository.deleteById(id);
        opportunitySearchRepository.deleteById(id);
    }

    /**
     * Search for the opportunity corresponding to the query.
     *
     * @param query    the query of the search.
     * @param pageable the pagination information.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<OpportunityDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Opportunities for query {}", query);
        return opportunitySearchRepository.search(queryStringQuery(query), pageable)
                                          .map(opportunityMapper::toDto);
    }

    /**
     * Get the appropriate search results for opportunity.
     *
     * @return the Response Entity that wraps either the SearchResult or the OpportunityFacets.
     */
    @Transactional(readOnly = true)
    public SearchResultDTO filter(List<FilterOptionDTO> filterOptions, Pageable pageable) {

        Map<String, String> facets = opportunitySearchRepository.getFacets();

        NativeSearchQueryBuilder searchQueryBuilder = new NativeSearchQueryBuilder().withQuery(matchAllQuery())
                                                                                    .withSearchType(SearchType.DEFAULT)
                                                                                    .withIndices(INDEX_NAME)
                                                                                    .withTypes(INDEX_NAME);

        List<TermsAggregationBuilder> aggregationBuilders = facets.entrySet()
                                                                  .stream()
                                                                  .map(facet -> terms(facet.getKey()).field(facet.getValue()))
                                                                  .collect(Collectors.toList());

        String today = DateTimeFormatter.ofPattern(DEFAULT_DATE_PATTERN)
                                        .withZone(ZoneId.of("UTC"))
                                        .format(Instant.now().truncatedTo(ChronoUnit.DAYS));
        BoolQueryBuilder filterQueryBuilder = QueryBuilders.boolQuery()
                                                           .filter(QueryBuilders.matchQuery("visible", true))
                                                           .filter(QueryBuilders.rangeQuery("startDate")
                                                                              .format(DEFAULT_DATE_PATTERN)
                                                                              .lte(today))
                                                           .filter(QueryBuilders.rangeQuery("endDate")
                                                                              .format(DEFAULT_DATE_PATTERN)
                                                                              .gte(today));

        for (FilterOptionDTO filterOption : filterOptions) {
            filterQueryBuilder.filter(QueryBuilders.termsQuery(facets.get(filterOption.getKey()),
                                                          filterOption.getSelectedValues()));
        }
        searchQueryBuilder.withFilter(filterQueryBuilder);

        FilterAggregationBuilder filterAggregationBuilder = AggregationBuilders.filter(FACET_NAME, filterQueryBuilder);
        aggregationBuilders.forEach(filterAggregationBuilder::subAggregation);
        searchQueryBuilder.addAggregation(filterAggregationBuilder);

        NativeSearchQuery searchQuery = searchQueryBuilder.withPageable(pageable)
                                                          .build();

        AggregatedPage<Opportunity> aggregatedOpportunities =
                (AggregatedPage<Opportunity>) opportunitySearchRepository.search(searchQuery);

        List<OpportunitySearchDTO> opportunities = aggregatedOpportunities.getContent()
                                                                          .stream()
                                                                          .map(opportunitySearchMapper::toDto)
                                                                          .collect(Collectors.toList());

        List<OpportunityFacetDTO> opportunityFacetDTOS = new ArrayList<>();
        MetricAggregation aggregation = aggregatedOpportunities.getAggregation(FACET_NAME, FilterAggregation.class);
        for (String key : facets.keySet()) {
            TermsAggregation termsAggregation = aggregation.getTermsAggregation(key);
            opportunityFacetDTOS.add(opportunityFacetMapper.toDto(termsAggregation));
        }

        return new SearchResultDTO().setFacets(opportunityFacetDTOS)
                                    .setOpportunities(opportunities);
    }

    /**
     * Checks if amount to be invested is valid for the opportunity..
     *
     * @param opportunityId for the opportunity.
     * @param amount        to be invested.
     */
    public boolean isAmountValidForOpportunity(long opportunityId, BigDecimal amount) {
        Optional<OpportunityDTO> opportunityOptional = findOne(opportunityId);
        if (opportunityOptional.isPresent()) {
            OpportunityDTO opportunityDTO = opportunityOptional.get();
            if (amount.doubleValue() >= opportunityDTO.getMinimumInvestment()
                                                      .doubleValue()) {
                BigDecimal remainingAmount = amount.subtract(opportunityDTO.getMinimumInvestment());
                BigDecimal denomination = opportunityDTO.getDenomination();

                return remainingAmount.doubleValue() == 0 || remainingAmount.doubleValue() % denomination.doubleValue() == 0;
            } else {
                return false;
            }
        }
        throw new IllegalArgumentException("Invalid Opportunity");
    }
}
