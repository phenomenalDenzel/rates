package com.qds.rates.service.dto;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonIgnore;

import com.qds.rates.domain.enumeration.OtpAction;

/**
 * A DTO for the {@link com.qds.rates.domain.Otp} entity.
 */
public class OtpDTO implements Serializable {

    @JsonIgnore
    private Long id;

    private String code;

    @NotNull
    private OtpAction action;

    @NotNull
    private String email;

    @JsonIgnore
    private Instant createdTime;

    @JsonIgnore
    private Boolean used;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public OtpAction getAction() {
        return action;
    }

    public void setAction(OtpAction action) {
        this.action = action;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Instant getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Instant createdTime) {
        this.createdTime = createdTime;
    }

    public Boolean isUsed() {
        return used;
    }

    public void setUsed(Boolean used) {
        this.used = used;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OtpDTO)) {
            return false;
        }

        return id != null && id.equals(((OtpDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "OtpDTO{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", action='" + getAction() + "'" +
            ", email='" + getEmail() + "'" +
            ", createdTime='" + getCreatedTime() + "'" +
            ", used='" + isUsed() + "'" +
            "}";
    }
}
