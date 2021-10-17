package com.qds.rates.service.dto.builders;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import com.qds.rates.config.Constants;
import com.qds.rates.domain.enumeration.AnnualIncome;
import com.qds.rates.domain.enumeration.EmploymentStatus;
import com.qds.rates.domain.enumeration.Qualification;
import com.qds.rates.domain.enumeration.RelationshipType;
import com.qds.rates.domain.enumeration.VerificationItem;
import com.qds.rates.security.AuthoritiesConstants;
import com.qds.rates.service.dto.EmploymentDetailsDTO;
import com.qds.rates.service.dto.LocationDTO;
import com.qds.rates.service.dto.NextOfKinDTO;
import com.qds.rates.service.dto.VerificationDTO;
import com.qds.rates.web.rest.vm.ManagedCustomerVM;

public class ManagedCustomerVMBuilder {


    public static Builder builder(String login) {
        return new Builder(login);
    }

    public static class Builder {
        private Set<LocationDTO> addresses = new HashSet<>();

        private EntityManager em;

        private static final String DEFAULT_MOBILE = "AAAAAAAAAA";
        private static final String DEFAULT_BVN = "AAAAAAAAAA";
        private static final LocalDate DEFAULT_DOB = LocalDate.ofEpochDay(0L);
        public static final String EMAIL = "john.doe@jhipster.com";
        private static final String DEFAULT_FIRST_NAME = "Customer";
        private static final String DEFAULT_LAST_NAME = "Customer";
        private static final String DEFAULT_PASSWORD = "@1Apassword";
        private static final String DEFAULT_COUNTRY_OF_BIRTH = "Nigeria";
        private static final String DEFAULT_NATIONALITY = "Israel";
        private static final AnnualIncome DEFAULT_ANNUAL_INCOME = AnnualIncome.ABOVE_20M;
        private static final Qualification DEFAULT_QUALIFICATION = Qualification.BACHELORS_DEGREE;
        private static final String DEFAULT_IMAGE_URI = "http://placehold.it/50x50";
        private static final String DEFAULT_BANK_NAME = "Bank of Israel";
        private static final String DEFAULT_BANK_ACCOUNT_NUMBER ="6894579012";
        public static final String DEFAULT_MOTHERS_MAIDEN_NAME = "mothers Maiden Name";

        private String login;
        private String password = DEFAULT_PASSWORD;
        private String mobile = DEFAULT_MOBILE;
        private String bvn = DEFAULT_BVN;
        private String email = EMAIL;
        private LocalDate dob = DEFAULT_DOB;
        private String firstName = DEFAULT_FIRST_NAME;
        private String lastName = DEFAULT_LAST_NAME;
        private String countryOfBirth = DEFAULT_COUNTRY_OF_BIRTH;
        private String nationality = DEFAULT_NATIONALITY;
        private AnnualIncome annualIncome = DEFAULT_ANNUAL_INCOME;
        private Qualification qualification = DEFAULT_QUALIFICATION;
        private Set<String> authorities = Collections.singleton(AuthoritiesConstants.USER);
        private String imageUri = DEFAULT_IMAGE_URI;
        private String langKey = Constants.DEFAULT_LANGUAGE;
        private String bankName = DEFAULT_BANK_NAME;
        private String bankAccountNumber = DEFAULT_BANK_ACCOUNT_NUMBER;
        private String mothersMaidenName = DEFAULT_MOTHERS_MAIDEN_NAME;

        public Builder(String login) {
            this.login = login;
        }
        public Builder withEmail(final String email) {
            this.email = email;
            return this;
        }

        public Builder withMobile(String mobile) {
            this.mobile = mobile;
            return this;
        }

        public Builder withBvn(String bvn) {
            this.bvn = bvn;
            return this;
        }

        public Builder withDob(LocalDate dob) {
            this.dob = dob;
            return this;
        }

        public Builder withLocation(LocationDTO location){
            this.addresses.add(location);
            return this;
        }

        public ManagedCustomerVM build() {
//            verified not set to match real life scenario, as field wont exist on register form
            ManagedCustomerVM customer = new ManagedCustomerVM();
            customer.setLogin(login);
            customer.setEmail(email);
            customer.setPassword(password);
            customer.setMobile(mobile);
            customer.setBvn(bvn);
            customer.setDob(dob);
            customer.setCountryOfBirth(countryOfBirth);
            customer.setNationality(nationality);
            customer.setMothersMaidenName(mothersMaidenName);
            customer.setFirstName(firstName);
            customer.setLastName(lastName);
            customer.setAnnualIncome(annualIncome);
            customer.setQualificationLevel(qualification);
            customer.setAuthorities(authorities);
            customer.setBankName(bankName);
            customer.setBankAccountNumber(bankAccountNumber);
            customer.setImageUrl(imageUri);
            customer.setLangKey(langKey);
            customer.setEmploymentStatus(EmploymentStatus.EMPLOYED);
            customer.setEmploymentDetails(createEmploymentDetails());
            customer.setAddresses(addresses);
            customer.setAccountVerifications(createVerifications());
            customer.setNextOfKins(createNextOfKin());
            return customer;
        }

        private EmploymentDetailsDTO createEmploymentDetails(){
            EmploymentDetailsDTO employmentDetails = new EmploymentDetailsDTO();
            employmentDetails.setAddressLine1("Some Address1");
            employmentDetails.setAddressLine2("Some Address2");
            employmentDetails.setLocalGovtId(addresses.iterator().next().getLocalGovtId());
            employmentDetails.setCompanyName("Some Company Name");
            employmentDetails.setOfficialWebsite("www.somecompany.co.ng");
            return employmentDetails;
        }

        private Set<VerificationDTO> createVerifications(){
            VerificationDTO verification = new VerificationDTO();
            Set<VerificationDTO> verifications = new HashSet<>();
            verification.setArchived(true);
            verification.setArchiveUrl("someUrl.com");
            verification.setDescription("some desc");
            String image = "SomeImage==";
            verification.setImage(image.getBytes());
            verification.setItemName(VerificationItem.PICTURE);
            verification.setImageContentType("image/png");
            verifications.add(verification);
            return  verifications;
        }

        private Set<NextOfKinDTO> createNextOfKin() {
            Set<NextOfKinDTO> nextOfKins = new HashSet<>();
            NextOfKinDTO nextOfKin = new NextOfKinDTO();
            nextOfKin.setName("NAME NAME");
            nextOfKin.setPhoneNumber("+90999999939");
            nextOfKin.setRelation(RelationshipType.SIBLING);
            nextOfKins.add(nextOfKin);
            return nextOfKins;
        }
    }
}
