package com.qds.rates.service.dto;

import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.Lob;
import com.qds.rates.domain.enumeration.OpportunityType;

/**
 * A DTO for the {@link com.qds.rates.domain.Opportunity} entity.
 */
public class OpportunityDTO implements Serializable {
    
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private OpportunityType type;

    @Lob
    private String summary;

    private String fundSize;

    @NotNull
    private Instant startDate;

    @NotNull
    private Instant endDate;

    private Boolean visible;

    private Double interestRate;

    private Integer tenor;

    private Double effectiveApr;

    private BigDecimal minimumInvestment;

    private BigDecimal denomination;


    private Long providerId;

    private String providerName;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public OpportunityType getType() {
        return type;
    }

    public void setType(OpportunityType type) {
        this.type = type;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getFundSize() {
        return fundSize;
    }

    public void setFundSize(String fundSize) {
        this.fundSize = fundSize;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public Boolean isVisible() {
        return visible;
    }

    public void setVisible(Boolean visible) {
        this.visible = visible;
    }

    public Double getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(Double interestRate) {
        this.interestRate = interestRate;
    }

    public Integer getTenor() {
        return tenor;
    }

    public void setTenor(Integer tenor) {
        this.tenor = tenor;
    }

    public Double getEffectiveApr() {
        return effectiveApr;
    }

    public void setEffectiveApr(Double effectiveApr) {
        this.effectiveApr = effectiveApr;
    }

    public BigDecimal getMinimumInvestment() {
        return minimumInvestment;
    }

    public void setMinimumInvestment(BigDecimal minimumInvestment) {
        this.minimumInvestment = minimumInvestment;
    }

    public BigDecimal getDenomination() {
        return denomination;
    }

    public void setDenomination(BigDecimal denomination) {
        this.denomination = denomination;
    }

    public Long getProviderId() {
        return providerId;
    }

    public void setProviderId(Long providerId) {
        this.providerId = providerId;
    }

    public String getProviderName() {
        return providerName;
    }

    public void setProviderName(String providerName) {
        this.providerName = providerName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OpportunityDTO)) {
            return false;
        }

        return id != null && id.equals(((OpportunityDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "OpportunityDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", type='" + getType() + "'" +
            ", summary='" + getSummary() + "'" +
            ", fundSize='" + getFundSize() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            ", visible='" + isVisible() + "'" +
            ", interestRate=" + getInterestRate() +
            ", tenor=" + getTenor() +
            ", effectiveApr=" + getEffectiveApr() +
            ", minimumInvestment=" + getMinimumInvestment() +
            ", denomination=" + getDenomination() +
            ", providerId=" + getProviderId() +
            ", providerName='" + getProviderName() + "'" +
            "}";
    }
}
