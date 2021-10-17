package com.qds.rates.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A EmploymentDetails.
 */
@Entity
@Table(name = "employment_details")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class EmploymentDetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private Long id;

    @NotNull
    @Column(name = "company_name", nullable = false)
    private String companyName;

    @Column(name = "official_website")
    private String officialWebsite;

    @Column(name = "address_line_1")
    private String addressLine1;

    @Column(name = "address_line_2")
    private String addressLine2;

    @OneToOne(optional = false)
    @NotNull

    @MapsId
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne
    @JsonIgnoreProperties(value = "employmentDetails", allowSetters = true)
    private LocalGovt localGovt;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public EmploymentDetails companyName(String companyName) {
        this.companyName = companyName;
        return this;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getOfficialWebsite() {
        return officialWebsite;
    }

    public EmploymentDetails officialWebsite(String officialWebsite) {
        this.officialWebsite = officialWebsite;
        return this;
    }

    public void setOfficialWebsite(String officialWebsite) {
        this.officialWebsite = officialWebsite;
    }

    public String getAddressLine1() {
        return addressLine1;
    }

    public EmploymentDetails addressLine1(String addressLine1) {
        this.addressLine1 = addressLine1;
        return this;
    }

    public void setAddressLine1(String addressLine1) {
        this.addressLine1 = addressLine1;
    }

    public String getAddressLine2() {
        return addressLine2;
    }

    public EmploymentDetails addressLine2(String addressLine2) {
        this.addressLine2 = addressLine2;
        return this;
    }

    public void setAddressLine2(String addressLine2) {
        this.addressLine2 = addressLine2;
    }

    public Customer getCustomer() {
        return customer;
    }

    public EmploymentDetails customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public LocalGovt getLocalGovt() {
        return localGovt;
    }

    public EmploymentDetails localGovt(LocalGovt localGovt) {
        this.localGovt = localGovt;
        return this;
    }

    public void setLocalGovt(LocalGovt localGovt) {
        this.localGovt = localGovt;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EmploymentDetails)) {
            return false;
        }
        return id != null && id.equals(((EmploymentDetails) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EmploymentDetails{" +
            "id=" + getId() +
            ", companyName='" + getCompanyName() + "'" +
            ", officialWebsite='" + getOfficialWebsite() + "'" +
            ", addressLine1='" + getAddressLine1() + "'" +
            ", addressLine2='" + getAddressLine2() + "'" +
            "}";
    }
}
