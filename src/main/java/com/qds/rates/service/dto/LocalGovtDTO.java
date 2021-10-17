package com.qds.rates.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import com.qds.rates.domain.enumeration.State;

/**
 * A DTO for the {@link com.qds.rates.domain.LocalGovt} entity.
 */
public class LocalGovtDTO implements Serializable {
    
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private State state;

    private Boolean active;

    
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

    public State getState() {
        return state;
    }

    public void setState(State state) {
        this.state = state;
    }

    public Boolean isActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LocalGovtDTO)) {
            return false;
        }

        return id != null && id.equals(((LocalGovtDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LocalGovtDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", state='" + getState() + "'" +
            ", active='" + isActive() + "'" +
            "}";
    }
}
