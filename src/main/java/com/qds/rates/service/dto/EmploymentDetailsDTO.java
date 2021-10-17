package com.qds.rates.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;

/**
 * A DTO for the {@link com.qds.rates.domain.EmploymentDetails} entity.
 */
public class EmploymentDetailsDTO implements Serializable {
    
    private Long id;

    @NotNull
    private String companyName;

    private String officialWebsite;

    private String addressLine1;

    private String addressLine2;


    private Long customerId;

    private Long localGovtId;

    private String localGovtName;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getOfficialWebsite() {
        return officialWebsite;
    }

    public void setOfficialWebsite(String officialWebsite) {
        this.officialWebsite = officialWebsite;
    }

    public String getAddressLine1() {
        return addressLine1;
    }

    public void setAddressLine1(String addressLine1) {
        this.addressLine1 = addressLine1;
    }

    public String getAddressLine2() {
        return addressLine2;
    }

    public void setAddressLine2(String addressLine2) {
        this.addressLine2 = addressLine2;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Long getLocalGovtId() {
        return localGovtId;
    }

    public void setLocalGovtId(Long localGovtId) {
        this.localGovtId = localGovtId;
    }

    public String getLocalGovtName() {
        return localGovtName;
    }

    public void setLocalGovtName(String localGovtName) {
        this.localGovtName = localGovtName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EmploymentDetailsDTO)) {
            return false;
        }

        return id != null && id.equals(((EmploymentDetailsDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EmploymentDetailsDTO{" +
            "id=" + getId() +
            ", companyName='" + getCompanyName() + "'" +
            ", officialWebsite='" + getOfficialWebsite() + "'" +
            ", addressLine1='" + getAddressLine1() + "'" +
            ", addressLine2='" + getAddressLine2() + "'" +
            ", customerId=" + getCustomerId() +
            ", localGovtId=" + getLocalGovtId() +
            ", localGovtName='" + getLocalGovtName() + "'" +
            "}";
    }
}
