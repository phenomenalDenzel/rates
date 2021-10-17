package com.qds.rates.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

import com.qds.rates.domain.enumeration.VerificationItem;

/**
 * A Verification.
 */
@Entity
@Table(name = "verification")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Verification implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "item_name")
    private VerificationItem itemName;

    @Column(name = "description")
    private String description;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @Column(name = "image_content_type")
    private String imageContentType;

    @Column(name = "archived")
    private Boolean archived;

    @Column(name = "archive_url")
    private String archiveUrl;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = "accountVerifications", allowSetters = true)
    private Customer customer;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public VerificationItem getItemName() {
        return itemName;
    }

    public Verification itemName(VerificationItem itemName) {
        this.itemName = itemName;
        return this;
    }

    public void setItemName(VerificationItem itemName) {
        this.itemName = itemName;
    }

    public String getDescription() {
        return description;
    }

    public Verification description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getImage() {
        return image;
    }

    public Verification image(byte[] image) {
        this.image = image;
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public Verification imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public Boolean isArchived() {
        return archived;
    }

    public Verification archived(Boolean archived) {
        this.archived = archived;
        return this;
    }

    public void setArchived(Boolean archived) {
        this.archived = archived;
    }

    public String getArchiveUrl() {
        return archiveUrl;
    }

    public Verification archiveUrl(String archiveUrl) {
        this.archiveUrl = archiveUrl;
        return this;
    }

    public void setArchiveUrl(String archiveUrl) {
        this.archiveUrl = archiveUrl;
    }

    public Customer getCustomer() {
        return customer;
    }

    public Verification customer(Customer customer) {
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
        if (!(o instanceof Verification)) {
            return false;
        }
        return id != null && id.equals(((Verification) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Verification{" +
            "id=" + getId() +
            ", itemName='" + getItemName() + "'" +
            ", description='" + getDescription() + "'" +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
            ", archived='" + isArchived() + "'" +
            ", archiveUrl='" + getArchiveUrl() + "'" +
            "}";
    }
}
