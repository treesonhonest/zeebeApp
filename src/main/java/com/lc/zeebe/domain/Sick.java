package com.lc.zeebe.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Sick.
 */
@Entity
@Table(name = "sick")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Sick implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "reason")
    private String reason;

    @Column(name = "days")
    private Integer days;

    @Column(name = "job_key")
    private Long jobKey;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReason() {
        return reason;
    }

    public Sick reason(String reason) {
        this.reason = reason;
        return this;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public Integer getDays() {
        return days;
    }

    public Sick days(Integer days) {
        this.days = days;
        return this;
    }

    public void setDays(Integer days) {
        this.days = days;
    }

    public Long getJobKey() {
        return jobKey;
    }

    public Sick jobKey(Long jobKey) {
        this.jobKey = jobKey;
        return this;
    }

    public void setJobKey(Long jobKey) {
        this.jobKey = jobKey;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Sick)) {
            return false;
        }
        return id != null && id.equals(((Sick) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Sick{" +
            "id=" + getId() +
            ", reason='" + getReason() + "'" +
            ", days=" + getDays() +
            ", jobKey=" + getJobKey() +
            "}";
    }
}
