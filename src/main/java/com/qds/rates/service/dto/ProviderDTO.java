package com.qds.rates.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import javax.persistence.Lob;

/**
 * A DTO for the {@link com.qds.rates.domain.Provider} entity.
 */
public class ProviderDTO implements Serializable {
    
    private Long id;

    @NotNull
    private String name;

    @Lob
    private byte[] logo;

    private String logoContentType;
    private String contactInfo;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte[] getLogo() {
        return logo;
    }

    public void setLogo(byte[] logo) {
        this.logo = logo;
    }

    public String getLogoContentType() {
        return logoContentType;
    }

    public void setLogoContentType(String logoContentType) {
        this.logoContentType = logoContentType;
    }

    public String getContactInfo() {
        return contactInfo;
    }

    public void setContactInfo(String contactInfo) {
        this.contactInfo = contactInfo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProviderDTO)) {
            return false;
        }

        return id != null && id.equals(((ProviderDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProviderDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", logo='" + getLogo() + "'" +
            ", contactInfo='" + getContactInfo() + "'" +
            "}";
    }
}
