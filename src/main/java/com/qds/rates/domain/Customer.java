package com.qds.rates.domain;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.qds.rates.domain.enumeration.AnnualIncome;
import com.qds.rates.domain.enumeration.EmploymentStatus;
import com.qds.rates.domain.enumeration.Qualification;

/**
 * A Customer.
 */
@Entity
@Table(name = "customer")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Customer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "annual_income")
    private AnnualIncome annualIncome;

    @Enumerated(EnumType.STRING)
    @Column(name = "employment_status")
    private EmploymentStatus employmentStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "qualification_level")
    private Qualification qualificationLevel;

    @NotNull
    @Column(name = "mobile", nullable = false)
    private String mobile;

    @NotNull
    @Column(name = "bvn", nullable = false, unique = true)
    private String bvn;

    @NotNull
    @Column(name = "dob", nullable = false)
    private LocalDate dob;

    @Column(name = "country_of_birth")
    private String countryOfBirth;

    @Column(name = "nationality")
    private String nationality;

    @Column(name = "mothers_maiden_name")
    private String mothersMaidenName;

    @NotNull
    @Column(name = "verified", nullable = false)
    private Boolean verified = false;

    @OneToOne(optional = false)
    @NotNull

    @MapsId
    @JoinColumn(name = "id")
    private User user;

    @OneToMany(mappedBy = "customer",cascade = CascadeType.ALL)
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Verification> accountVerifications = new HashSet<>();

    @OneToMany(mappedBy = "customer",cascade = CascadeType.ALL)
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<NextOfKin> nextOfKins = new HashSet<>();

    @OneToMany(mappedBy = "customer",cascade = CascadeType.ALL)
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Location> addresses = new HashSet<>();

    @OneToMany(mappedBy = "customer")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Application> applications = new HashSet<>();

    @OneToOne(mappedBy = "customer",cascade = CascadeType.ALL)
    @JsonIgnore
    private EmploymentDetails employmentDetails;

    @OneToOne(mappedBy = "customer",cascade = CascadeType.ALL)
    @JsonIgnore
    private Wallet wallet;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AnnualIncome getAnnualIncome() {
        return annualIncome;
    }

    public Customer annualIncome(AnnualIncome annualIncome) {
        this.annualIncome = annualIncome;
        return this;
    }

    public void setAnnualIncome(AnnualIncome annualIncome) {
        this.annualIncome = annualIncome;
    }

    public EmploymentStatus getEmploymentStatus() {
        return employmentStatus;
    }

    public Customer employmentStatus(EmploymentStatus employmentStatus) {
        this.employmentStatus = employmentStatus;
        return this;
    }

    public void setEmploymentStatus(EmploymentStatus employmentStatus) {
        this.employmentStatus = employmentStatus;
    }

    public Qualification getQualificationLevel() {
        return qualificationLevel;
    }

    public Customer qualificationLevel(Qualification qualificationLevel) {
        this.qualificationLevel = qualificationLevel;
        return this;
    }

    public void setQualificationLevel(Qualification qualificationLevel) {
        this.qualificationLevel = qualificationLevel;
    }

    public String getMobile() {
        return mobile;
    }

    public Customer mobile(String mobile) {
        this.mobile = mobile;
        return this;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getBvn() {
        return bvn;
    }

    public Customer bvn(String bvn) {
        this.bvn = bvn;
        return this;
    }

    public void setBvn(String bvn) {
        this.bvn = bvn;
    }

    public LocalDate getDob() {
        return dob;
    }

    public Customer dob(LocalDate dob) {
        this.dob = dob;
        return this;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public String getCountryOfBirth() {
        return countryOfBirth;
    }

    public Customer countryOfBirth(String countryOfBirth) {
        this.countryOfBirth = countryOfBirth;
        return this;
    }

    public void setCountryOfBirth(String countryOfBirth) {
        this.countryOfBirth = countryOfBirth;
    }

    public String getNationality() {
        return nationality;
    }

    public Customer nationality(String nationality) {
        this.nationality = nationality;
        return this;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getMothersMaidenName() {
        return mothersMaidenName;
    }

    public Customer mothersMaidenName(String mothersMaidenName) {
        this.mothersMaidenName = mothersMaidenName;
        return this;
    }

    public void setMothersMaidenName(String mothersMaidenName) {
        this.mothersMaidenName = mothersMaidenName;
    }

    public Boolean isVerified() {
        return verified;
    }

    public Customer verified(Boolean verified) {
        this.verified = verified;
        return this;
    }

    public void setVerified(Boolean verified) {
        this.verified = verified;
    }

    public User getUser() {
        return user;
    }

    public Customer user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Verification> getAccountVerifications() {
        return accountVerifications;
    }

    public Customer accountVerifications(Set<Verification> verifications) {
        this.accountVerifications = verifications;
        return this;
    }

    public Customer addAccountVerifications(Verification verification) {
        this.accountVerifications.add(verification);
        verification.setCustomer(this);
        return this;
    }

    public Customer removeAccountVerifications(Verification verification) {
        this.accountVerifications.remove(verification);
        verification.setCustomer(null);
        return this;
    }

    public void setAccountVerifications(Set<Verification> verifications) {
        this.accountVerifications = verifications;
    }

    public Set<NextOfKin> getNextOfKins() {
        return nextOfKins;
    }

    public Customer nextOfKins(Set<NextOfKin> nextOfKins) {
        this.nextOfKins = nextOfKins;
        return this;
    }

    public Customer addNextOfKin(NextOfKin nextOfKin) {
        this.nextOfKins.add(nextOfKin);
        nextOfKin.setCustomer(this);
        return this;
    }

    public Customer removeNextOfKin(NextOfKin nextOfKin) {
        this.nextOfKins.remove(nextOfKin);
        nextOfKin.setCustomer(null);
        return this;
    }

    public void setNextOfKins(Set<NextOfKin> nextOfKins) {
        this.nextOfKins = nextOfKins;
    }

    public Set<Location> getAddresses() {
        return addresses;
    }

    public Customer addresses(Set<Location> locations) {
        this.addresses = locations;
        return this;
    }

    public Customer addAddress(Location location) {
        this.addresses.add(location);
        location.setCustomer(this);
        return this;
    }

    public Customer removeAddress(Location location) {
        this.addresses.remove(location);
        location.setCustomer(null);
        return this;
    }

    public void setAddresses(Set<Location> locations) {
        this.addresses = locations;
    }

    public Set<Application> getApplications() {
        return applications;
    }

    public Customer applications(Set<Application> applications) {
        this.applications = applications;
        return this;
    }

    public Customer addApplications(Application application) {
        this.applications.add(application);
        application.setCustomer(this);
        return this;
    }

    public Customer removeApplications(Application application) {
        this.applications.remove(application);
        application.setCustomer(null);
        return this;
    }

    public void setApplications(Set<Application> applications) {
        this.applications = applications;
    }

    public EmploymentDetails getEmploymentDetails() {
        return employmentDetails;
    }

    public Customer employmentDetails(EmploymentDetails employmentDetails) {
        this.employmentDetails = employmentDetails;
        return this;
    }

    public void setEmploymentDetails(EmploymentDetails employmentDetails) {
        this.employmentDetails = employmentDetails;
    }

    public Wallet getWallet() {
        return wallet;
    }

    public Customer wallet(Wallet wallet) {
        this.wallet = wallet;
        return this;
    }

    public void setWallet(Wallet wallet) {
        this.wallet = wallet;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Customer)) {
            return false;
        }
        return id != null && id.equals(((Customer) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Customer{" +
            "id=" + getId() +
            ", annualIncome='" + getAnnualIncome() + "'" +
            ", employmentStatus='" + getEmploymentStatus() + "'" +
            ", qualificationLevel='" + getQualificationLevel() + "'" +
            ", mobile='" + getMobile() + "'" +
            ", bvn='" + getBvn() + "'" +
            ", dob='" + getDob() + "'" +
            ", countryOfBirth='" + getCountryOfBirth() + "'" +
            ", nationality='" + getNationality() + "'" +
            ", mothersMaidenName='" + getMothersMaidenName() + "'" +
            ", verified='" + isVerified() + "'" +
            "}";
    }
}
