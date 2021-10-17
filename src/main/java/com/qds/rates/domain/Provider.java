package com.qds.rates.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Provider.
 */
@Entity
@Table(name = "provider")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "provider")
public class Provider implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Lob
    @Column(name = "logo")
    private byte[] logo;

    @Column(name = "logo_content_type")
    private String logoContentType;

    @Column(name = "contact_info")
    private String contactInfo;

    @OneToMany(mappedBy = "provider")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Opportunity> opportunities = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Provider name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte[] getLogo() {
        return logo;
    }

    public Provider logo(byte[] logo) {
        this.logo = logo;
        return this;
    }

    public void setLogo(byte[] logo) {
        this.logo = logo;
    }

    public String getLogoContentType() {
        return logoContentType;
    }

    public Provider logoContentType(String logoContentType) {
        this.logoContentType = logoContentType;
        return this;
    }

    public void setLogoContentType(String logoContentType) {
        this.logoContentType = logoContentType;
    }

    public String getContactInfo() {
        return contactInfo;
    }

    public Provider contactInfo(String contactInfo) {
        this.contactInfo = contactInfo;
        return this;
    }

    public void setContactInfo(String contactInfo) {
        this.contactInfo = contactInfo;
    }

    public Set<Opportunity> getOpportunities() {
        return opportunities;
    }

    public Provider opportunities(Set<Opportunity> opportunities) {
        this.opportunities = opportunities;
        return this;
    }

    public Provider addOpportunities(Opportunity opportunity) {
        this.opportunities.add(opportunity);
        opportunity.setProvider(this);
        return this;
    }

    public Provider removeOpportunities(Opportunity opportunity) {
        this.opportunities.remove(opportunity);
        opportunity.setProvider(null);
        return this;
    }

    public void setOpportunities(Set<Opportunity> opportunities) {
        this.opportunities = opportunities;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Provider)) {
            return false;
        }
        return id != null && id.equals(((Provider) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Provider{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", logo='" + getLogo() + "'" +
            ", logoContentType='" + getLogoContentType() + "'" +
            ", contactInfo='" + getContactInfo() + "'" +
            "}";
    }
}
