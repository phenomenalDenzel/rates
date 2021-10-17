package com.qds.rates.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Properties specific to Rates.
 * <p>
 * Properties are configured in the {@code application.yml} file.
 * See {@link io.github.jhipster.config.JHipsterProperties} for a good example.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {

    private int otpLength = 6;
    private long otpValidityMinutes = 15l;

    public int getOtpLength() {
        return otpLength;
    }

    public void setOtpLength(int otpLength) {
        this.otpLength = otpLength;
    }

    public long getOtpValidityMinutes() {
        return otpValidityMinutes;
    }

    public void setOtpValidityMinutes(long otpValidityMinutes) {
        this.otpValidityMinutes = otpValidityMinutes;
    }
}
