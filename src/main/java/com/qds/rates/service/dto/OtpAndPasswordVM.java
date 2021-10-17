package com.qds.rates.service.dto;

public class OtpAndPasswordVM extends OtpDTO {
    private String newPassword;

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    @Override
    public String toString() {
        return "OtpAndPasswordVM{" +
            "newPassword='" + newPassword + '\'' +
            '}';
    }
}
