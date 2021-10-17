package com.qds.rates.service.dto;

import java.io.Serializable;
import java.util.Objects;

public class OpportunityFacetTermDTO implements Serializable {
    private String term;
    private int count;

    public OpportunityFacetTermDTO(){}

    public OpportunityFacetTermDTO(String term){
        this.term = term;
    }
    public String getTerm() {
        return term;
    }

    public void setTerm(String term) {
        this.term = term;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OpportunityFacetTermDTO that = (OpportunityFacetTermDTO) o;
        return count == that.count &&
            term.equals(that.term);
    }

    @Override
    public int hashCode() {
        return Objects.hash(term, count);
    }
}
