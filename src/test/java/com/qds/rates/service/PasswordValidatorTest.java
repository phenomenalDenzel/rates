package com.qds.rates.service;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

public class PasswordValidatorTest {

    @Test
    public void passwordValidator_ShouldReturnFalse_WhenPasswordIsInvalid(){
        String passwordString = "Ab4;";
        assertThat(PasswordValidator.validatePassword(passwordString)).isFalse();
    }

    @Test
    public void passwordValidator_ShouldReturnTrue_WhenPasswordIsValid(){
        String passwordString = "@As3ghwt";
        assertThat(PasswordValidator.validatePassword(passwordString)).isTrue();
    }

    @Test
    public void passwordValidator_ShouldReturnFalse_WhenPasswordDoesNotContainUpperCase(){
        String passwordString = "sd3s$sde";
        assertThat(PasswordValidator.validatePassword(passwordString)).isFalse();
    }

    @Test
    public void passwordValidator_ShouldReturnFalse_WhenPasswordDoesNotContainLowerCase(){
        String passwordString = "SD3S$SDE";
        assertThat(PasswordValidator.validatePassword(passwordString)).isFalse();
    }

    @Test
    public void passwordValidator_ShouldReturnFalse_WhenPasswordDoesNotContainSymbol(){
        String passwordString = "sd3sAsFde";
        assertThat(PasswordValidator.validatePassword(passwordString)).isFalse();
    }

    @Test
    public void passwordValidator_ShouldReturnFalse_WhenPasswordDoesNotContainNumber(){
        String passwordString = "sdtGs$sde";
        assertThat(PasswordValidator.validatePassword(passwordString)).isFalse();
    }

    @Test
    public void passwordValidator_ShouldReturnTrue_WhenPasswordContainWhiteSpace(){
        String passwordString = "sd tGsSsd6e";
        assertThat(PasswordValidator.validatePassword(passwordString)).isTrue();
    }

    @Test
    public void passwordValidator_ShouldReturnFalse_WhenPasswordContainsInvalidCharacter(){
        String passwordString = "sd$tGsSsd6e\u20ac";
        assertThat(PasswordValidator.validatePassword(passwordString)).isFalse();
    }
}
