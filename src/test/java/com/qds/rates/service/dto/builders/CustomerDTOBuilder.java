package com.qds.rates.service.dto.builders;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.qds.rates.domain.User;
import com.qds.rates.domain.enumeration.RelationshipType;
import com.qds.rates.domain.enumeration.VerificationItem;
import com.qds.rates.security.AuthoritiesConstants;
import com.qds.rates.service.UserService;
import com.qds.rates.service.dto.CustomerDTO;
import com.qds.rates.service.dto.EmploymentDetailsDTO;
import com.qds.rates.service.dto.LocationDTO;
import com.qds.rates.service.dto.NextOfKinDTO;
import com.qds.rates.service.dto.UserDTO;
import com.qds.rates.service.dto.VerificationDTO;

public class CustomerDTOBuilder {

    public static Builder builder(UserService userService, String login) {
        return new Builder(userService, login);
    }

    public static class Builder {

        //Temporary till customerservice has method that will create user too
        private UserService userService;

        private Set<LocationDTO> addresses = new HashSet<>();

        private static final String DEFAULT_MOBILE = "AAAAAAAAAA";
        private static final String DEFAULT_BVN = "AAAAAAAAAA";
        private static final LocalDate DEFAULT_DOB = LocalDate.ofEpochDay(0L);
        public static final String EMAIL = "john.doe@jhipster.com";
        public static final boolean DEFAULT_VERIFIED = true;

        private String login;
        private String mobile = DEFAULT_MOBILE;
        private String bvn = DEFAULT_BVN;
        private String email = EMAIL;
        private boolean verified = DEFAULT_VERIFIED;
        private LocalDate dob = DEFAULT_DOB;

        public Builder(UserService userService, String login) {
            this.userService = userService;
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

        public CustomerDTO build() {
            CustomerDTO customer = new CustomerDTO();
            customer.setMobile(mobile);
            customer.setBvn(bvn);
            customer.setDob(dob);
            customer.setCanApplyForOpportunities(verified);
            customer.setUserId(createUser().getId());
            customer.setAddresses(addresses);
            customer.setAccountVerifications(createVerifications());
            customer.setNextOfKins(createNextOfKin());
            customer.setEmploymentDetails(createEmploymentDetails());
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

        private User createUser() {
            Set<String> authorities = new HashSet<>();
            authorities.add(AuthoritiesConstants.USER);

            UserDTO user = new UserDTO();
            user.setLogin(login);
            user.setFirstName("john");
            user.setLastName("doe");
            user.setEmail(email);
            user.setImageUrl("http://placehold.it/50x50");
            user.setLangKey("en");
            user.setAuthorities(authorities);

            return userService.createUser(user);
        }
    }
}
