package com.qds.rates.security;

import static org.mockito.Mockito.verify;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;

@ExtendWith(MockitoExtension.class)
public class DefaultAjaxAuthenticationFailureHandlerTest {

    @Mock
    private HttpServletRequest request;
    @Mock
    private HttpServletResponse response;

    private AuthenticationException exception;

    private DefaultAjaxAuthenticationFailureHandler handler;

    @BeforeEach
    public void setUp() {
        handler = new DefaultAjaxAuthenticationFailureHandler();

    }

    @Test
    public void onAuthenticationFailureShouldReturnPreconditionFailedWhenUserIsInactive() throws IOException, ServletException {
        exception = new InternalAuthenticationServiceException("Testing", new UserNotActivatedException("user not " +
                                                                                                        "active"));
        handler.onAuthenticationFailure(request, response, exception);

        verify(response).sendError(HttpServletResponse.SC_PRECONDITION_FAILED, "User not activated");
    }

    @Test
    public void onAuthenticationFailureShouldReturnPreconditionFailedWhenUserLoginFails() throws IOException, ServletException {
        exception = new InternalAuthenticationServiceException("Testing", new CredentialsExpiredException("Credential" +
                                                                                                          " Expired"));
        handler.onAuthenticationFailure(request, response, exception);

        verify(response).sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authentication failed");

    }
}