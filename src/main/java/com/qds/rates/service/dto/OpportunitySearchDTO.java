package com.qds.rates.service.dto;

public class OpportunitySearchDTO extends OpportunityDTO {
    private int closingDays;

    public int getClosingDays() {
        return closingDays;
    }

    public void setClosingDays(final int closingDays) {
        this.closingDays = closingDays;
    }
}
