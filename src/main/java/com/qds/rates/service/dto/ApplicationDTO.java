package com.qds.rates.service.dto;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;

import com.qds.rates.domain.enumeration.ApplicationStatus;

/**
 * A DTO for the {@link com.qds.rates.domain.Application} entity.
 */
public class ApplicationDTO implements Serializable {

    private Long id;

    private String applicationId;

    private ApplicationStatus status;

    @NotNull
    private BigDecimal amount;

    private Instant createdDate;

    private Long customerId;

    private Long opportunityId;

    private String opportunityName;

    private OpportunityDTO opportunity;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(String applicationId) {
        this.applicationId = applicationId;
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(final Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Long getOpportunityId() {
        return opportunityId;
    }

    public void setOpportunityId(Long opportunityId) {
        this.opportunityId = opportunityId;
    }

    public String getOpportunityName() {
        return opportunityName;
    }

    public void setOpportunityName(String opportunityName) {
        this.opportunityName = opportunityName;
    }

    public OpportunityDTO getOpportunity() {
        return opportunity;
    }

    public void setOpportunity(final OpportunityDTO opportunity) {
        this.opportunity = opportunity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ApplicationDTO)) {
            return false;
        }

        return id != null && id.equals(((ApplicationDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }
    // prettier-ignore

    @Override
    public String toString() {
        return "ApplicationDTO{" +
            "id=" + getId() +
            ", applicationId='" + getApplicationId() + "'" +
            ", status='" + getStatus() + "'" +
            ", amount=" + getAmount() +
            ", customerId=" + getCustomerId() +
            ", opportunityId=" + getOpportunityId() +
            ", opportunityName='" + getOpportunityName() + "'" +
            "}";
    }
}
