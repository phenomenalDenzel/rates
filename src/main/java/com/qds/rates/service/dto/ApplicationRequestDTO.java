package com.qds.rates.service.dto;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;

/**
 * A DTO for the {@link com.qds.rates.domain.Application} entity.
 */
public class ApplicationRequestDTO implements Serializable {

    @NotNull
    private BigDecimal amount;

    private Long customerId;

    @NotNull
    private Long opportunityId;

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
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


    @Override
    public int hashCode() {
        return 31;
    }
    // prettier-ignore

    @Override
    public String toString() {
        return "ApplicationDTO{" +
            "opportunityId="  + getOpportunityId() +
            ", amount=" + getAmount() +
            ", customerId=" + getCustomerId() +
            "}";
    }
}
