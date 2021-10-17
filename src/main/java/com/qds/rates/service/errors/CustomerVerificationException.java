package com.qds.rates.service.errors;

import org.zalando.problem.AbstractThrowableProblem;
import org.zalando.problem.Status;

public class CustomerVerificationException extends AbstractThrowableProblem{
    private static final long serialVersionUID = 1L;

    public CustomerVerificationException(String message){
        super(ErrorConstants.UNRECOGNIZED_TYPE, message, Status.PRECONDITION_FAILED);
    }
}
