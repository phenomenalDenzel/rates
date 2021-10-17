package com.qds.rates.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import com.qds.rates.domain.enumeration.OpportunityType;

/**
 * A Opportunity.
 */
@Entity
@Table(name = "opportunity")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "opportunity")
public class Opportunity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    @Field(type = FieldType.Keyword)
    private OpportunityType type;

    @Lob
    @Column(name = "summary")
    @JsonIgnore
    private String summary;

    @Column(name = "fund_size")
    @JsonIgnore
    private String fundSize;

    @NotNull
    @Column(name = "start_date", nullable = false)
    private Instant startDate;

    @NotNull
    @Column(name = "end_date", nullable = false)
    private Instant endDate;

    @Column(name = "visible")
    private Boolean visible;

    @Column(name = "interest_rate")
    private Double interestRate;

    @Column(name = "tenor")
    @Field(type=FieldType.Integer)
    private Integer tenor;

    @Column(name = "effective_apr")
    private Double effectiveApr;

    @Column(name = "minimum_investment", precision = 21, scale = 2)
    private BigDecimal minimumInvestment;

    @Column(name = "denomination", precision = 21, scale = 2)
    private BigDecimal denomination;

    @OneToMany(mappedBy = "opportunity")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<OpportunityDocument> documents = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = {"logo","logoContentType","contactInfo","opportunities"}, allowSetters = true)
    private Provider provider;

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

    public Opportunity name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public OpportunityType getType() {
        return type;
    }

    public Opportunity type(OpportunityType type) {
        this.type = type;
        return this;
    }

    public void setType(OpportunityType type) {
        this.type = type;
    }

    public String getSummary() {
        return summary;
    }

    public Opportunity summary(String summary) {
        this.summary = summary;
        return this;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getFundSize() {
        return fundSize;
    }

    public Opportunity fundSize(String fundSize) {
        this.fundSize = fundSize;
        return this;
    }

    public void setFundSize(String fundSize) {
        this.fundSize = fundSize;
    }

    public Instant getStartDate() {
        return startDate;
    }

    public Opportunity startDate(Instant startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(Instant startDate) {
        this.startDate = startDate;
    }

    public Instant getEndDate() {
        return endDate;
    }

    public Opportunity endDate(Instant endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public Boolean isVisible() {
        return visible;
    }

    public Opportunity visible(Boolean visible) {
        this.visible = visible;
        return this;
    }

    public void setVisible(Boolean visible) {
        this.visible = visible;
    }

    public Double getInterestRate() {
        return interestRate;
    }

    public Opportunity interestRate(Double interestRate) {
        this.interestRate = interestRate;
        return this;
    }

    public void setInterestRate(Double interestRate) {
        this.interestRate = interestRate;
    }

    public Integer getTenor() {
        return tenor;
    }

    public Opportunity tenor(Integer tenor) {
        this.tenor = tenor;
        return this;
    }

    public void setTenor(Integer tenor) {
        this.tenor = tenor;
    }

    public Double getEffectiveApr() {
        return effectiveApr;
    }

    public Opportunity effectiveApr(Double effectiveApr) {
        this.effectiveApr = effectiveApr;
        return this;
    }

    public void setEffectiveApr(Double effectiveApr) {
        this.effectiveApr = effectiveApr;
    }

    public BigDecimal getMinimumInvestment() {
        return minimumInvestment;
    }

    public Opportunity minimumInvestment(BigDecimal minimumInvestment) {
        this.minimumInvestment = minimumInvestment;
        return this;
    }

    public void setMinimumInvestment(BigDecimal minimumInvestment) {
        this.minimumInvestment = minimumInvestment;
    }

    public BigDecimal getDenomination() {
        return denomination;
    }

    public Opportunity denomination(BigDecimal denomination) {
        this.denomination = denomination;
        return this;
    }

    public void setDenomination(BigDecimal denomination) {
        this.denomination = denomination;
    }

    public Set<OpportunityDocument> getDocuments() {
        return documents;
    }

    public Opportunity documents(Set<OpportunityDocument> opportunityDocuments) {
        this.documents = opportunityDocuments;
        return this;
    }

    public Opportunity addDocuments(OpportunityDocument opportunityDocument) {
        this.documents.add(opportunityDocument);
        opportunityDocument.setOpportunity(this);
        return this;
    }

    public Opportunity removeDocuments(OpportunityDocument opportunityDocument) {
        this.documents.remove(opportunityDocument);
        opportunityDocument.setOpportunity(null);
        return this;
    }

    public void setDocuments(Set<OpportunityDocument> opportunityDocuments) {
        this.documents = opportunityDocuments;
    }

    public Provider getProvider() {
        return provider;
    }

    public Opportunity provider(Provider provider) {
        this.provider = provider;
        return this;
    }

    public void setProvider(Provider provider) {
        this.provider = provider;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Opportunity)) {
            return false;
        }
        return id != null && id.equals(((Opportunity) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Opportunity{" +
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
            "}";
    }
}
