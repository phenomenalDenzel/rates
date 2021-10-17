package com.qds.rates.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.qds.rates.domain.enumeration.OtpAction;

/**
 * A Otp.
 */
@Entity
@Table(name = "otp")
public class Otp implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "code", nullable = false)
    private String code;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "action", nullable = false)
    private OtpAction action;

    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

    @CreatedDate
    @NotNull
    @Column(name = "created_time",updatable = false)
    private Instant createdTime = Instant.now();

    @NotNull
    @Column(name = "used", nullable = false)
    private Boolean used;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public Otp code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public OtpAction getAction() {
        return action;
    }

    public Otp action(OtpAction action) {
        this.action = action;
        return this;
    }

    public void setAction(OtpAction action) {
        this.action = action;
    }

    public String getEmail() {
        return email;
    }

    public Otp email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Instant getCreatedTime() {
        return createdTime;
    }

    public Otp createdTime(Instant createdTime) {
        this.createdTime = createdTime;
        return this;
    }

    public void setCreatedTime(Instant createdTime) {
        this.createdTime = createdTime;
    }

    public Boolean isUsed() {
        return used;
    }

    public Otp used(Boolean used) {
        this.used = used;
        return this;
    }

    public void setUsed(Boolean used) {
        this.used = used;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Otp)) {
            return false;
        }
        return id != null && id.equals(((Otp) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Otp{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", action='" + getAction() + "'" +
            ", email='" + getEmail() + "'" +
            ", createdTime='" + getCreatedTime() + "'" +
            ", used='" + isUsed() + "'" +
            "}";
    }
}
