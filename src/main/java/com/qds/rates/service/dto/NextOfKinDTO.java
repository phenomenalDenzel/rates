package com.qds.rates.service.dto;

import java.io.Serializable;

import com.qds.rates.domain.enumeration.RelationshipType;
import com.qds.rates.domain.enumeration.Title;

/**
 * A DTO for the {@link com.qds.rates.domain.NextOfKin} entity.
 */
public class NextOfKinDTO implements Serializable {
    
    private Long id;

    private Title title;

    private RelationshipType relation;

    private String name;

    private String phoneNumber;


    private Long customerId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Title getTitle() {
        return title;
    }

    public void setTitle(Title title) {
        this.title = title;
    }

    public RelationshipType getRelation() {
        return relation;
    }

    public void setRelation(RelationshipType relation) {
        this.relation = relation;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
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
        if (!(o instanceof NextOfKinDTO)) {
            return false;
        }

        return id != null && id.equals(((NextOfKinDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NextOfKinDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", relation='" + getRelation() + "'" +
            ", name='" + getName() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", customerId=" + getCustomerId() +
            "}";
    }
}
