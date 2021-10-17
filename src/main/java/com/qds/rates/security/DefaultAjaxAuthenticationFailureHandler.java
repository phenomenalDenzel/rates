package com.qds.rates.security;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

/**
 * Returns a 401 error code (Unauthorized) to the client, when Ajax authentication fails.
 * Returns a 412 error code (Precondition Failed) to the client, when Ajax authentication fails due to inactive user.
 */
public class DefaultAjaxAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    /**
     * Constant <code>UNAUTHORIZED_MESSAGE="Authentication failed"</code>
     */
    public static final String UNAUTHORIZED_MESSAGE = "Authentication failed";
    /**
     * Constant <code>INACTIVE_MESSAGE="User not activated"</code>
     */
    public static final String INACTIVE_MESSAGE = "User not activated";

    /**
     * {@inheritDoc}
     */
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        if (exception.getCause() instanceof UserNotActivatedException) {
            response.sendError(HttpServletResponse.SC_PRECONDITION_FAILED, INACTIVE_MESSAGE);
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, UNAUTHORIZED_MESSAGE);
        }
    }
}
