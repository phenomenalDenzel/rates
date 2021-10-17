package com.qds.rates.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A OpportunityDocument.
 */
@Entity
@Table(name = "opportunity_document")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "opportunitydocument")
public class OpportunityDocument implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Lob
    @Column(name = "file")
    private byte[] file;

    @Column(name = "file_content_type")
    private String fileContentType;

    @Column(name = "archived")
    private Boolean archived;

    @Column(name = "archive_url")
    private String archiveUrl;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "documents", allowSetters = true)
    private Opportunity opportunity;

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

    public OpportunityDocument name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public OpportunityDocument description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getFile() {
        return file;
    }

    public OpportunityDocument file(byte[] file) {
        this.file = file;
        return this;
    }

    public void setFile(byte[] file) {
        this.file = file;
    }

    public String getFileContentType() {
        return fileContentType;
    }

    public OpportunityDocument fileContentType(String fileContentType) {
        this.fileContentType = fileContentType;
        return this;
    }

    public void setFileContentType(String fileContentType) {
        this.fileContentType = fileContentType;
    }

    public Boolean isArchived() {
        return archived;
    }

    public OpportunityDocument archived(Boolean archived) {
        this.archived = archived;
        return this;
    }

    public void setArchived(Boolean archived) {
        this.archived = archived;
    }

    public String getArchiveUrl() {
        return archiveUrl;
    }

    public OpportunityDocument archiveUrl(String archiveUrl) {
        this.archiveUrl = archiveUrl;
        return this;
    }

    public void setArchiveUrl(String archiveUrl) {
        this.archiveUrl = archiveUrl;
    }

    public Opportunity getOpportunity() {
        return opportunity;
    }

    public OpportunityDocument opportunity(Opportunity opportunity) {
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
        if (!(o instanceof OpportunityDocument)) {
            return false;
        }
        return id != null && id.equals(((OpportunityDocument) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "OpportunityDocument{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", file='" + getFile() + "'" +
            ", fileContentType='" + getFileContentType() + "'" +
            ", archived='" + isArchived() + "'" +
            ", archiveUrl='" + getArchiveUrl() + "'" +
            "}";
    }
}
