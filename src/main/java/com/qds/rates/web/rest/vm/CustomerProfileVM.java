package com.qds.rates.web.rest.vm;

import javax.validation.constraints.Size;
import java.time.LocalDate;

public class CustomerProfileVM {
    @Size(max = 50)
    private String firstName;

    @Size(max = 50)
    private String lastName;

    private String email;

    private String mobile;

    private LocalDate dob;

    private boolean verified = false;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(final String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(final String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(final String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(final String mobile) {
        this.mobile = mobile;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(final LocalDate dob) {
        this.dob = dob;
    }

    public boolean isVerified() {
        return verified;
    }

    public void setVerified(final boolean verified) {
        this.verified = verified;
    }
}
