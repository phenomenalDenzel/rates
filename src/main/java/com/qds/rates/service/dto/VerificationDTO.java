package com.qds.rates.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import javax.persistence.Lob;
import com.qds.rates.domain.enumeration.VerificationItem;

/**
 * A DTO for the {@link com.qds.rates.domain.Verification} entity.
 */
public class VerificationDTO implements Serializable {
    
    private Long id;

    private VerificationItem itemName;

    private String description;

    @Lob
    private byte[] image;

    private String imageContentType;
    private Boolean archived;

    private String archiveUrl;


    private Long customerId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public VerificationItem getItemName() {
        return itemName;
    }

    public void setItemName(VerificationItem itemName) {
        this.itemName = itemName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public Boolean isArchived() {
        return archived;
    }

    public void setArchived(Boolean archived) {
        this.archived = archived;
    }

    public String getArchiveUrl() {
        return archiveUrl;
    }

    public void setArchiveUrl(String archiveUrl) {
        this.archiveUrl = archiveUrl;
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
        if (!(o instanceof VerificationDTO)) {
            return false;
        }

        return id != null && id.equals(((VerificationDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "VerificationDTO{" +
            "id=" + getId() +
            ", itemName='" + getItemName() + "'" +
            ", description='" + getDescription() + "'" +
            ", image='" + getImage() + "'" +
            ", archived='" + isArchived() + "'" +
            ", archiveUrl='" + getArchiveUrl() + "'" +
            ", customerId=" + getCustomerId() +
            "}";
    }
}
