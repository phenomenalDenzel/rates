package com.qds.rates.service.dto;

import java.util.ArrayList;
import java.util.List;

public class SearchResultDTO {
    private List<OpportunityFacetDTO> facets = new ArrayList<>();
    private List<OpportunitySearchDTO> opportunities = new ArrayList<>();

    public List<OpportunityFacetDTO> getFacets() {
        return facets;
    }

    public SearchResultDTO setFacets(List<OpportunityFacetDTO> facets) {
        this.facets = facets;
        return this;
    }

    public List<OpportunitySearchDTO> getOpportunities() {
        return opportunities;
    }

    public SearchResultDTO setOpportunities(List<OpportunitySearchDTO> opportunities) {
        this.opportunities = opportunities;
        return this;
    }
}
