package com.qds.rates.service.dto;

import com.qds.rates.domain.Opportunity;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

public class OpportunityFacetDTO implements Serializable {
    private String key;
    private Set<OpportunityFacetTermDTO> terms = new HashSet<>();

    public OpportunityFacetDTO(){}

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public Set<OpportunityFacetTermDTO> getTerms() {
        return terms;
    }

    public void setTerms(Set<OpportunityFacetTermDTO> terms) {
        this.terms = terms;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OpportunityFacetDTO that = (OpportunityFacetDTO) o;
        return Objects.equals(key, that.key) &&
            Objects.equals(terms, that.terms);
    }

    @Override
    public int hashCode() {
        return Objects.hash(key, terms);
    }
}
