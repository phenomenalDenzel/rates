package com.qds.rates.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.qds.rates.domain.enumeration.OperationType;

/**
 * A WalletOperation.
 */
@Entity
@Table(name = "wallet_operation")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class WalletOperation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "description")
    private String description;

    @NotNull
    @Column(name = "amount", precision = 21, scale = 2, nullable = false)
    private BigDecimal amount;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "operation", nullable = false)
    private OperationType operation;

    @ManyToOne(optional = false)
    @JoinColumn
    @NotNull
    @JsonIgnoreProperties(value = "transactions", allowSetters = true)
    private Wallet wallet;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public WalletOperation description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public WalletOperation amount(BigDecimal amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public OperationType getOperation() {
        return operation;
    }

    public WalletOperation operation(OperationType operation) {
        this.operation = operation;
        return this;
    }

    public void setOperation(OperationType operation) {
        this.operation = operation;
    }

    public Wallet getWallet() {
        return wallet;
    }

    public WalletOperation wallet(Wallet wallet) {
        this.wallet = wallet;
        return this;
    }

    public void setWallet(Wallet wallet) {
        this.wallet = wallet;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WalletOperation)) {
            return false;
        }
        return id != null && id.equals(((WalletOperation) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WalletOperation{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", amount=" + getAmount() +
            ", operation='" + getOperation() + "'" +
            "}";
    }
}
