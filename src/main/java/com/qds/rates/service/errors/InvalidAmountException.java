package com.qds.rates.service.errors;

import org.zalando.problem.AbstractThrowableProblem;
import org.zalando.problem.Status;

public class InvalidAmountException extends AbstractThrowableProblem {

    private static final long serialVersionUID = 1L;

    public InvalidAmountException(String message){
        super(ErrorConstants.INVALID_AMOUNT_TYPE, message, Status.PRECONDITION_FAILED);
    }
}
