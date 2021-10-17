package com.qds.rates.service.dto;

public class UsernameEmailValidationRespDto {
    private boolean emailExists;
    private boolean usernameExists;

    public UsernameEmailValidationRespDto() {
    }

    public boolean isEmailExists() {
        return emailExists;
    }

    public void setEmailExists(boolean emailExists) {
        this.emailExists = emailExists;
    }

    public boolean isUsernameExists() {
        return usernameExists;
    }

    public void setUsernameExists(boolean usernameExists) {
        this.usernameExists = usernameExists;
    }

    @Override
    public String toString() {
        return "UsernameEmailValidationRespDto{" +
            "emailExists=" + emailExists +
            ", usernameExists=" + usernameExists +
            '}';
    }
}
