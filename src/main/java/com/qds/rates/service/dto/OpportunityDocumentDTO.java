package com.qds.rates.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import javax.persistence.Lob;

/**
 * A DTO for the {@link com.qds.rates.domain.OpportunityDocument} entity.
 */
public class OpportunityDocumentDTO implements Serializable {
    
    private Long id;

    @NotNull
    private String name;

    private String description;

    @Lob
    private byte[] file;

    private String fileContentType;
    private Boolean archived;

    private String archiveUrl;


    private Long opportunityId;

    private String opportunityName;
    
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getFile() {
        return file;
    }

    public void setFile(byte[] file) {
        this.file = file;
    }

    public String getFileContentType() {
        return fileContentType;
    }

    public void setFileContentType(String fileContentType) {
        this.fileContentType = fileContentType;
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

    public Long getOpportunityId() {
        return opportunityId;
    }

    public void setOpportunityId(Long opportunityId) {
        this.opportunityId = opportunityId;
    }

    public String getOpportunityName() {
        return opportunityName;
    }

    public void setOpportunityName(String opportunityName) {
        this.opportunityName = opportunityName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OpportunityDocumentDTO)) {
            return false;
        }

        return id != null && id.equals(((OpportunityDocumentDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "OpportunityDocumentDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", file='" + getFile() + "'" +
            ", archived='" + isArchived() + "'" +
            ", archiveUrl='" + getArchiveUrl() + "'" +
            ", opportunityId=" + getOpportunityId() +
            ", opportunityName='" + getOpportunityName() + "'" +
            "}";
    }
}
