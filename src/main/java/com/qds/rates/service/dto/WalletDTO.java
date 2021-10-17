package com.qds.rates.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;

/**
 * A DTO for the {@link com.qds.rates.domain.Wallet} entity.
 */
public class WalletDTO implements Serializable {
    
    private Long id;

    @NotNull
    private String externalId;

    @NotNull
    private BigDecimal balance;

    private BigDecimal totalDeposit;

    private BigDecimal totalArchived;


    private Long customerId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getExternalId() {
        return externalId;
    }

    public void setExternalId(String externalId) {
        this.externalId = externalId;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public BigDecimal getTotalDeposit() {
        return totalDeposit;
    }

    public void setTotalDeposit(BigDecimal totalDeposit) {
        this.totalDeposit = totalDeposit;
    }

    public BigDecimal getTotalArchived() {
        return totalArchived;
    }

    public void setTotalArchived(BigDecimal totalArchived) {
        this.totalArchived = totalArchived;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WalletDTO)) {
            return false;
        }

        return id != null && id.equals(((WalletDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WalletDTO{" +
            "id=" + getId() +
            ", externalId='" + getExternalId() + "'" +
            ", balance=" + getBalance() +
            ", totalDeposit=" + getTotalDeposit() +
            ", totalArchived=" + getTotalArchived() +
            ", customerId=" + getCustomerId() +
            "}";
    }
}
