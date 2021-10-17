package com.qds.rates.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Wallet.
 */
@Entity
@Table(name = "wallet")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Wallet implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "external_id", nullable = false)
    private String externalId;

    @NotNull
    @Column(name = "balance", precision = 21, scale = 2, nullable = false)
    private BigDecimal balance;

    @Column(name = "total_deposit", precision = 21, scale = 2)
    private BigDecimal totalDeposit = BigDecimal.ZERO;

    @Column(name = "total_archived", precision = 21, scale = 2)
    private BigDecimal totalArchived = BigDecimal.ZERO;

    @OneToMany(mappedBy = "wallet")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<WalletOperation> transactions = new HashSet<>();

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private Customer customer;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getExternalId() {
        return externalId;
    }

    public Wallet externalId(String externalId) {
        this.externalId = externalId;
        return this;
    }

    public void setExternalId(String externalId) {
        this.externalId = externalId;
    }

    public BigDecimal getBalance() {
        return balance;
    }

    public Wallet balance(BigDecimal balance) {
        this.balance = balance;
        return this;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    public BigDecimal getTotalDeposit() {
        return totalDeposit;
    }

    public Wallet totalDeposit(BigDecimal totalDeposit) {
        this.totalDeposit = totalDeposit;
        return this;
    }

    public void setTotalDeposit(BigDecimal totalDeposit) {
        this.totalDeposit = totalDeposit;
    }

    public BigDecimal getTotalArchived() {
        return totalArchived;
    }

    public Wallet totalArchived(BigDecimal totalArchived) {
        this.totalArchived = totalArchived;
        return this;
    }

    public void setTotalArchived(BigDecimal totalArchived) {
        this.totalArchived = totalArchived;
    }

    public Set<WalletOperation> getTransactions() {
        return transactions;
    }

    public Wallet transactions(Set<WalletOperation> walletOperations) {
        this.transactions = walletOperations;
        return this;
    }

    public Wallet addTransactions(WalletOperation walletOperation) {
        this.transactions.add(walletOperation);
        walletOperation.setWallet(this);
        return this;
    }

    public Wallet removeTransactions(WalletOperation walletOperation) {
        this.transactions.remove(walletOperation);
        walletOperation.setWallet(null);
        return this;
    }

    public void setTransactions(Set<WalletOperation> walletOperations) {
        this.transactions = walletOperations;
    }

    public Customer getCustomer() {
        return customer;
    }

    public Wallet customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Wallet)) {
            return false;
        }
        return id != null && id.equals(((Wallet) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Wallet{" +
            "id=" + getId() +
            ", externalId='" + getExternalId() + "'" +
            ", balance=" + getBalance() +
            ", totalDeposit=" + getTotalDeposit() +
            ", totalArchived=" + getTotalArchived() +
            "}";
    }
}
