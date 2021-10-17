package com.qds.rates.service.dto;

import com.qds.rates.domain.User;

public class EmailContext {
    private User user;

    private OtpDTO otpDTO;

    public User getUser() {
        return user;
    }

    public EmailContext user(User user) {
        this.user = user;
        return this;
    }

    public OtpDTO getOtpDTO() {
        return otpDTO;
    }

    public EmailContext otpDTO(OtpDTO otpDTO){
        this.otpDTO = otpDTO;
        return this;
    }
}
