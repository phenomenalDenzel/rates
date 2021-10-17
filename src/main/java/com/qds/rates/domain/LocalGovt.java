package com.qds.rates.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

import com.qds.rates.domain.enumeration.State;

/**
 * A LocalGovt.
 */
@Entity
@Table(name = "local_govt")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class LocalGovt implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "state", nullable = false)
    private State state;

    @Column(name = "active")
    private Boolean active;

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

    public LocalGovt name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public State getState() {
        return state;
    }

    public LocalGovt state(State state) {
        this.state = state;
        return this;
    }

    public void setState(State state) {
        this.state = state;
    }

    public Boolean isActive() {
        return active;
    }

    public LocalGovt active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LocalGovt)) {
            return false;
        }
        return id != null && id.equals(((LocalGovt) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LocalGovt{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", state='" + getState() + "'" +
            ", active='" + isActive() + "'" +
            "}";
    }
}
