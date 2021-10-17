package com.qds.rates.web.rest.vm;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Set;

import com.qds.rates.domain.enumeration.AnnualIncome;
import com.qds.rates.domain.enumeration.EmploymentStatus;
import com.qds.rates.domain.enumeration.Qualification;
import com.qds.rates.service.dto.EmploymentDetailsDTO;
import com.qds.rates.service.dto.LocationDTO;
import com.qds.rates.service.dto.NextOfKinDTO;
import com.qds.rates.service.dto.VerificationDTO;

/**
 * View Model extending the ManagedUserVM, which is meant to be used in the customer management UI.
 */
public class ManagedCustomerVM extends ManagedUserVM {

    public ManagedCustomerVM() {
        // Empty constructor needed for Jackson.
    }

    @NotNull
    private String mobile;

    @NotNull
    private String bvn;

    @NotNull
    private LocalDate dob;

    private boolean canApplyForOpportunities;

    @NotNull
    private AnnualIncome annualIncome;

    @NotNull
    private EmploymentStatus employmentStatus;

    @NotNull
    private Qualification qualificationLevel;

    private EmploymentDetailsDTO employmentDetails;

    @NotNull
    private String countryOfBirth;

    @NotNull
    private Set<LocationDTO> addresses;

    @NotNull
    public Set<NextOfKinDTO> nextOfKins;

    @NotNull
    private Set<VerificationDTO> accountVerifications;

    private String bankAccountNumber;

    private String bankName;

    @NotNull
    private String nationality;

    @NotNull
    private String mothersMaidenName;

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getBvn() {
        return bvn;
    }

    public void setBvn(String bvn) {
        this.bvn = bvn;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public boolean isCanApplyForOpportunities() {
        return canApplyForOpportunities;
    }

    public void setCanApplyForOpportunities(boolean canApplyForOpportunities) {
        this.canApplyForOpportunities = canApplyForOpportunities;
    }

    public AnnualIncome getAnnualIncome() {
        return annualIncome;
    }

    public void setAnnualIncome(final AnnualIncome annualIncome) {
        this.annualIncome = annualIncome;
    }

    public EmploymentStatus getEmploymentStatus() {
        return employmentStatus;
    }

    public void setEmploymentStatus(final EmploymentStatus employmentStatus) {
        this.employmentStatus = employmentStatus;
    }

    public Qualification getQualificationLevel() {
        return qualificationLevel;
    }

    public  void setQualificationLevel(final Qualification qualificationLevel) {
        this.qualificationLevel = qualificationLevel;
    }

    public EmploymentDetailsDTO getEmploymentDetails() {
        return employmentDetails;
    }

    public void setEmploymentDetails(EmploymentDetailsDTO employmentDetails) {
        this.employmentDetails = employmentDetails;
    }

    public  String getCountryOfBirth() {
        return countryOfBirth;
    }

    public  void setCountryOfBirth(final String countryOfBirth) {
        this.countryOfBirth = countryOfBirth;
    }

    public Set<LocationDTO> getAddresses() {
        return addresses;
    }

    public void setAddresses(Set<LocationDTO> addresses) {
        this.addresses = addresses;
    }

    public Set<NextOfKinDTO> getNextOfKins() {
        return nextOfKins;
    }

    public void setNextOfKins(Set<NextOfKinDTO> nextOfKins) {
        this.nextOfKins = nextOfKins;
    }

    public Set<VerificationDTO> getAccountVerifications() {
        return accountVerifications;
    }

    public void setAccountVerifications(final Set<VerificationDTO> accountVerifications) {
        this.accountVerifications = accountVerifications;
    }

    public String getBankAccountNumber() {
        return bankAccountNumber;
    }

    public void setBankAccountNumber(String bankAccountNumber) {
        this.bankAccountNumber = bankAccountNumber;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(final String nationality) {
        this.nationality = nationality;
    }

    public String getMothersMaidenName() {
        return mothersMaidenName;
    }

    public void setMothersMaidenName(final String mothersMaidenName) {
        this.mothersMaidenName = mothersMaidenName;
    }

    @Override
    public String toString() {
        return "ManagedCustomerVM{" +
            "mobile='" + mobile + '\'' +
            ", bvn='" + bvn + '\'' +
            ", dob=" + dob +
            " " + super.toString() +
            '}';
    }
}
