package com.qds.rates.service.errors;

import java.net.URI;

public final class ErrorConstants {

    public static final String PROBLEM_BASE_URL = "https://www.jhipster.tech/problem";
    public static final URI INSUFFICIENT_TYPE = URI.create(PROBLEM_BASE_URL + "/insufficient-amount");
    public static final URI INVALID_AMOUNT_TYPE = URI.create(PROBLEM_BASE_URL + "/invalid-amount");
    public static final URI UNRECOGNIZED_TYPE = URI.create(PROBLEM_BASE_URL + "/not-verified");

    private ErrorConstants(){}
}
