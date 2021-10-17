package com.qds.rates.service;

import org.apache.commons.lang3.StringUtils;

public class PasswordValidator {

    private static boolean matches;

    public static boolean validatePassword(String password){
        if(!StringUtils.isEmpty(password)){
            int passwordLength = password.length();
            if(passwordLength >= 7 && passwordLength <= 64 ){
                if(hasRequiredPasswordField(password)){
                    return true;
                }
            }
        }
        return false;
    }

    public static boolean hasRequiredPasswordField(String password) {
        boolean hasLower = false, hasUpper = false, hasDigit = false, hasSymbol = false, hasUnwantedSymbol = false;

        if(password.matches(".*[0-9].*"))
            hasDigit = true;
        if(password.matches(".*[A-Z].*"))
            hasUpper = true;
        if(password.matches(".*[a-z].*"))
            hasLower = true;
        if(password.matches(".*[!\"#$%&'()*+,-./:;<=>?@\\[\\]^_`{|}~\\s].*"))
            hasSymbol = true;
        if(password.matches(".*[^A-Za-z0-9!\"#$%&'()*+,-./:;<=>?@\\[\\]^_`{|}~\\s].*"))
            hasUnwantedSymbol = true;

        return hasUpper && hasLower && hasDigit && hasSymbol && !hasUnwantedSymbol;
    }
}
