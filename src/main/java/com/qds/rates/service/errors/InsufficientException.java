package com.qds.rates.service.errors;

import org.zalando.problem.AbstractThrowableProblem;
import org.zalando.problem.Status;

public class InsufficientException extends AbstractThrowableProblem {

    private static final long serialVersionUID = 1L;

    public InsufficientException(String message){
        super(ErrorConstants.INSUFFICIENT_TYPE, message, Status.PRECONDITION_FAILED);
    }
}
