package com.qds.rates.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.qds.rates.domain.enumeration.ApplicationStatus;

/**
 * A Application.
 */
@Entity
@Table(name = "application")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Application extends AbstractAuditingEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "application_id", nullable = false)
    private String applicationId;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ApplicationStatus status;

    @NotNull
    @Column(name = "amount", precision = 21, scale = 2, nullable = false)
    private BigDecimal amount;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "applications", allowSetters = true)
    private Customer customer;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "applications", allowSetters = true)
    private Opportunity opportunity;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getApplicationId() {
        return applicationId;
    }

    public Application applicationId(String applicationId) {
        this.applicationId = applicationId;
        return this;
    }

    public void setApplicationId(String applicationId) {
        this.applicationId = applicationId;
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public Application status(ApplicationStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public Application amount(BigDecimal amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Customer getCustomer() {
        return customer;
    }

    public Application customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Opportunity getOpportunity() {
        return opportunity;
    }

    public Application opportunity(Opportunity opportunity) {
        this.opportunity = opportunity;
        return this;
    }

    public void setOpportunity(Opportunity opportunity) {
        this.opportunity = opportunity;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Application)) {
            return false;
        }
        return id != null && id.equals(((Application) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Application{" +
            "id=" + getId() +
            ", applicationId='" + getApplicationId() + "'" +
            ", status='" + getStatus() + "'" +
            ", amount=" + getAmount() +
            "}";
    }
}
