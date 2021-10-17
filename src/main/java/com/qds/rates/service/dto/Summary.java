package com.qds.rates.service.dto;

import java.math.BigDecimal;

public class Summary {
    private BigDecimal totalDeposits;
    private BigDecimal totalInvestment;
    private BigDecimal earnings;
    private BigDecimal totalActivePortfolio;

    public static Summary aSummary() { return new Summary(); }

    public BigDecimal getTotalDeposits() {
        return totalDeposits;
    }

    public Summary totalDeposits(final BigDecimal totalDeposits) {
        this.totalDeposits = totalDeposits;
        return this;
    }

    public BigDecimal getTotalInvestment() {
        return totalInvestment;
    }

    public Summary totalInvestment(final BigDecimal totalInvestment) {
        this.totalInvestment = totalInvestment;
        return this;
    }

    public BigDecimal getEarnings() {
        return earnings;
    }

    public Summary earnings(final BigDecimal earnings) {
        this.earnings = earnings;
        return this;
    }

    public BigDecimal getTotalActivePortfolio() {
        return totalActivePortfolio;
    }

    public Summary totalActivePortfolio(final BigDecimal totalActivePortfolio) {
        this.totalActivePortfolio = totalActivePortfolio;
        return this;
    }
}
