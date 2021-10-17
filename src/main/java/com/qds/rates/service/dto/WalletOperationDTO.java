package com.qds.rates.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import com.qds.rates.domain.enumeration.OperationType;

/**
 * A DTO for the {@link com.qds.rates.domain.WalletOperation} entity.
 */
public class WalletOperationDTO implements Serializable {
    
    private Long id;

    private String description;

    @NotNull
    private BigDecimal amount;

    @NotNull
    private OperationType operation;


    private Long walletId;

    private String walletExternalId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public OperationType getOperation() {
        return operation;
    }

    public void setOperation(OperationType operation) {
        this.operation = operation;
    }

    public Long getWalletId() {
        return walletId;
    }

    public void setWalletId(Long walletId) {
        this.walletId = walletId;
    }

    public String getWalletExternalId() {
        return walletExternalId;
    }

    public void setWalletExternalId(String walletExternalId) {
        this.walletExternalId = walletExternalId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WalletOperationDTO)) {
            return false;
        }

        return id != null && id.equals(((WalletOperationDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WalletOperationDTO{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", amount=" + getAmount() +
            ", operation='" + getOperation() + "'" +
            ", walletId=" + getWalletId() +
            ", walletExternalId='" + getWalletExternalId() + "'" +
            "}";
    }
}
