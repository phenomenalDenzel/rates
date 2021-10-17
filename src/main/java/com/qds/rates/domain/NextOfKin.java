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

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.qds.rates.domain.enumeration.RelationshipType;
import com.qds.rates.domain.enumeration.Title;

/**
 * A NextOfKin.
 */
@Entity
@Table(name = "next_of_kin")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "nextofkin")
public class NextOfKin implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "title")
    private Title title;

    @Enumerated(EnumType.STRING)
    @Column(name = "relation")
    private RelationshipType relation;

    @Column(name = "name")
    private String name;

    @Column(name = "phone_number")
    private String phoneNumber;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "nextOfKins", allowSetters = true)
    private Customer customer;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Title getTitle() {
        return title;
    }

    public NextOfKin title(Title title) {
        this.title = title;
        return this;
    }

    public void setTitle(Title title) {
        this.title = title;
    }

    public RelationshipType getRelation() {
        return relation;
    }

    public NextOfKin relation(RelationshipType relation) {
        this.relation = relation;
        return this;
    }

    public void setRelation(RelationshipType relation) {
        this.relation = relation;
    }

    public String getName() {
        return name;
    }

    public NextOfKin name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public NextOfKin phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Customer getCustomer() {
        return customer;
    }

    public NextOfKin customer(Customer customer) {
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
        if (!(o instanceof NextOfKin)) {
            return false;
        }
        return id != null && id.equals(((NextOfKin) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NextOfKin{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", relation='" + getRelation() + "'" +
            ", name='" + getName() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            "}";
    }
}
