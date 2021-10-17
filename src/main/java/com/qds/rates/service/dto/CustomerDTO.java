package com.qds.rates.service.dto;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Set;

import com.qds.rates.domain.enumeration.AnnualIncome;
import com.qds.rates.domain.enumeration.EmploymentStatus;
import com.qds.rates.domain.enumeration.Qualification;

/**
 * A DTO for the {@link com.qds.rates.domain.Customer} entity.
 */
public class CustomerDTO implements Serializable {
    
    private Long id;

    private AnnualIncome annualIncome;

    private EmploymentStatus employmentStatus;

    private Qualification qualificationLevel;

    @NotNull
    private String mobile;

    @NotNull
    private String bvn;

    @NotNull
    private LocalDate dob;

    private WalletDTO wallet;

    private Long walletId;

    private EmploymentDetailsDTO employmentDetails;

    private UserDTO user;

    private String countryOfBirth;

    private String nationality;

    private String mothersMaidenName;


    private Long userId;

    private String userLogin;

    private Set<LocationDTO> addresses;

    private String bankAccountNumber;

    private String bankName;

    private Boolean canApplyForOpportunities;

    public Set<NextOfKinDTO> nextOfKins;

    private Set<VerificationDTO> accountVerifications;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AnnualIncome getAnnualIncome() {
        return annualIncome;
    }

    public void setAnnualIncome(AnnualIncome annualIncome) {
        this.annualIncome = annualIncome;
    }

    public EmploymentStatus getEmploymentStatus() {
        return employmentStatus;
    }

    public void setEmploymentStatus(EmploymentStatus employmentStatus) {
        this.employmentStatus = employmentStatus;
    }

    public Qualification getQualificationLevel() {
        return qualificationLevel;
    }

    public void setQualificationLevel(Qualification qualificationLevel) {
        this.qualificationLevel = qualificationLevel;
    }

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

    public Long getWalletId() {
        return walletId;
    }

    public void setWalletId(Long walletId) {
        this.walletId = walletId;
    }

    public EmploymentDetailsDTO getEmploymentDetails() {
        return employmentDetails;
    }

    public void setEmploymentDetails(EmploymentDetailsDTO employmentDetails) {
        this.employmentDetails = employmentDetails;
    }

    public String getCountryOfBirth() {
        return countryOfBirth;
    }

    public void setCountryOfBirth(String countryOfBirth) {
        this.countryOfBirth = countryOfBirth;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getMothersMaidenName() {
        return mothersMaidenName;
    }

    public void setMothersMaidenName(String mothersMaidenName) {
        this.mothersMaidenName = mothersMaidenName;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserLogin() {
        return userLogin;
    }

    public void setUserLogin(String userLogin) {
        this.userLogin = userLogin;
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

    public Boolean isCanApplyForOpportunities() {
        return canApplyForOpportunities;
    }

    public void setCanApplyForOpportunities(Boolean canApplyForOpportunities) {
        this.canApplyForOpportunities = canApplyForOpportunities;
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

    public UserDTO getUser() {
        return user;
    }

    public void setUser(final UserDTO user) {
        this.user = user;
    }


    public WalletDTO getWallet() {
        return wallet;
    }

    public void setWallet(final WalletDTO wallet) {
        this.wallet = wallet;
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CustomerDTO)) {
            return false;
        }

        return id != null && id.equals(((CustomerDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CustomerDTO{" +
            "id=" + getId() +
            ", annualIncome='" + getAnnualIncome() + "'" +
            ", employmentStatus='" + getEmploymentStatus() + "'" +
            ", qualificationLevel='" + getQualificationLevel() + "'" +
            ", mobile='" + getMobile() + "'" +
            ", bvn='" + getBvn() + "'" +
            ", dob='" + getDob() + "'" +
               ", walletId=" + getWalletId() +
            ", countryOfBirth='" + getCountryOfBirth() + "'" +
            ", nationality='" + getNationality() + "'" +
            ", mothersMaidenName='" + getMothersMaidenName() + "'" +
            ", userId=" + getUserId() +
            ", userLogin='" + getUserLogin() + "'" +
            ", bankAccountNumber=" + getBankAccountNumber() +
            ", bankName='" + getBankName() + "'" +
            "}";
    }

}
