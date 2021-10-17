import React, { useCallback, useEffect, useState } from 'react';
import { Storage, translate, Translate } from 'react-jhipster';
import { Button, Col, Container, FormGroup, Row } from 'reactstrap';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';

import { IRootState } from 'app/shared/reducers';
import { login, reset as resetErrorMessage } from 'app/shared/reducers/authentication';
import { setUserRecord, validateEmailUsername } from 'app/modules/account/register/register.reducer';
import Loader from 'app/shared/util/loader';
import { LoginType } from 'app/shared/model/enumerations/login-type.model';
import { Route } from 'app/shared/model/enumerations/route.model';
import { reset } from 'app/entities/application/application.reducer';
import { PasswordValidation, validatePassword } from 'app/shared/components/passwordValidation';
import { OtpAction } from 'app/shared/model/enumerations/otp-action.model';
import { generateOTP } from 'app/modules/account/activate/activate.reducer';
import { useHistory } from 'react-router-dom';

import './login.scss';

export interface ILoginInfo {
  password?: string;
  email?: string;
}

let myEmail = '';

function Login() {
  const dispatch = useDispatch();
  const history = useHistory()
  const select = useSelector((state: IRootState) => {
    return { auth: state.authentication, register: state.register, emailUsername: state.register.emailUsername };
  });
  const [emailMessage, setEmailMessage] = useState<string>('');
  const { isAuthenticated, authNavType, loading } = select.auth;
  const [loginInfo, setLoginInfo] = useState<ILoginInfo>({});

  const [authType, setAuthType] = useState(LoginType.LOGIN);
  const [record, setRecord] = useState({});

  const setFormData = event => {
    const { name, value } = event.target;
    const info = { ...loginInfo, [name]: value };
    setLoginInfo(info);
  };

  useEffect(() => {
    const error = select.auth.errorMessage;
    if (error && error['response']['status'] === 412) {
      dispatch(resetErrorMessage());
      dispatch(generateOTP({ email: loginInfo.email, action: OtpAction.ACTIVATION }));
      Storage.session.set('email', loginInfo.email);
      history.push(Route.OTP_ACTIVATION);
    }
  }, [select.auth.errorMessage && select.auth.errorMessage['response']['status']]);

  useEffect(() => setAuthType(authNavType), []);

  useEffect(() => {
    if (isAuthenticated) {
      history.push(Route.DASHBOARD);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const user = select.register.userRecord;
    setRecord(user);
    loginInfo['email'] = user.email;
    loginInfo['password'] = user.password;
    setLoginInfo(loginInfo);
    dispatch(reset());
    user.email &&
      authType === LoginType.REGISTRATION &&
      dispatch(
        validateEmailUsername({
          login: user.email,
          email: user.email,
        })
      );
  }, []);

  const handleLogin = (rememberMe = false) => dispatch(login(loginInfo.email, loginInfo.password, rememberMe));
  const resetPassword = () => history.push(Route.RESET_INIT);

  const recordDetails = () => {
    const payload = { ...record, login: loginInfo.email, email: loginInfo.email, password: loginInfo.password };
    dispatch(setUserRecord({ ...select.register.userRecord, ...payload }));
    history.push(Route.REGISTER);
  };

  const debounceLoadData = useCallback(
    debounce(ctx => {
      const ctxEmail = ctx.email;
      if (ctxEmail && myEmail !== ctxEmail) {
        myEmail = ctxEmail;
        dispatch(validateEmailUsername({ login: ctxEmail, email: ctxEmail }));
      }
    }, 500),
    []
  );

  const emailValidator = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
    if (!re.test(String(email).toLowerCase())) {
      setEmailMessage(translate('login.messages.validate.login.email.pattern'));
      return false;
    }
    return true;
  };

  const validateEmail = (value, ctx, input, cb) => {
    if (value !== '' && authType === LoginType.REGISTRATION) {
      debounceLoadData(ctx);
      const { emailExists } = select.emailUsername || {};
      setEmailMessage(translate('login.messages.error.usernameexists'));
      return cb(!emailExists && emailValidator(value));
    } else if (value === '') {
      setEmailMessage(translate('global.messages.validate.email.required'));
      return cb(false);
    }
    return cb(emailValidator(value));
  };

  const clickAction = () => (authType === LoginType.REGISTRATION ? recordDetails() : handleLogin());
  const buttonLabel = authType === LoginType.REGISTRATION ? translate('login.button.create') : translate('login.button.login');
  const passwordFieldValidator = typeStatus => {
    if (typeStatus === LoginType.REGISTRATION) {
      return {
        async: validatePassword,
      };
    } else {
      return {
        required: { value: true, errorMessage: translate('global.messages.validate.newpassword.required') },
        minLength: { value: 4, errorMessage: translate('global.messages.validate.newpassword.minlength') },
        maxLength: { value: 50, errorMessage: translate('global.messages.validate.newpassword.maxlength') },
      };
    }
  };

  return (
    <Container fluid={true} className="content-body">
      <Row>
        <Col sm={{ size: '8', offset: '2' }} md={{ size: '6', offset: '3' }} className="content-body container-content">
          <div className="form-title">
            <Translate contentKey="login.title">Register on Rates.ng</Translate>
          </div>
          <div className="sub-title-1">
            <Translate contentKey="login.subtitle">Join Rates.ng and get the best price for any services.</Translate>
          </div>
          <div className="navigation-link">
            <span
              className={`${authType === LoginType.REGISTRATION ? 'active' : 'in-active'} cursor register`}
              onClick={() => setAuthType(LoginType.REGISTRATION)}
            >
              <Translate contentKey="login.nav.register">Register</Translate>
            </span>
            <span
              className={`${authType === LoginType.LOGIN ? 'active' : 'in-active'} cursor`}
              onClick={() => setAuthType(LoginType.LOGIN)}
            >
              <Translate contentKey="login.nav.login">Login</Translate>
            </span>
          </div>
          <AvForm id="register-form" onValidSubmit={clickAction}>
            <AvField
              name="email"
              value={loginInfo.email}
              placeholder={translate('global.form.email.placeholder')}
              type="text"
              onChange={setFormData}
              errorMessage={emailMessage}
              validate={{
                async: validateEmail,
                required: { value: true, errorMessage: translate('global.messages.validate.email.required') },
                minLength: { value: 5, errorMessage: translate('global.messages.validate.email.minlength') },
                maxLength: { value: 254, errorMessage: translate('global.messages.validate.email.maxlength') },
              }}
            />
            <AvField
              name="password"
              placeholder={authType === LoginType.REGISTRATION ? translate('global.form.newpassword.placeholder') : translate('global.form.password.placeholder')}
              type="password"
              value={loginInfo.password}
              onChange={setFormData}
              validate={passwordFieldValidator(authType)}
            />
            {authType === LoginType.REGISTRATION && <PasswordValidation password={loginInfo.password} />}
            <FormGroup>
              <Button className="btn submit-btn success-button">{loading ? <Loader /> : buttonLabel}</Button>
            </FormGroup>
          </AvForm>
          <div className="siginup-you">
            <Translate contentKey="login.text.signup">By siginup you agree with Rates.ng</Translate>
            <span onClick={resetPassword}>
              <Translate contentKey="login.forgot.password">Forgot password</Translate>
            </span>
          </div>
          <div className="terms">
            <Translate contentKey="login.text.terms">Terms and conditions and privacy policy</Translate>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
