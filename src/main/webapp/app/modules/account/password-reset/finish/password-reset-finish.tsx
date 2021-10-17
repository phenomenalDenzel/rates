import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Col, Row, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, Storage } from 'react-jhipster';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';
import OtpInput from 'react-otp-input';

import { handlePasswordResetFinish, handlePasswordResetInit, reset } from '../password-reset.reducer';
import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { AnimateLeft, AnimateUp } from 'app/shared/util/constant';
import Loader from 'app/shared/util/loader';
import { Route } from 'app/shared/model/enumerations/route.model';
import { PasswordValidation, validatePassword } from 'app/shared/components/passwordValidation';

const otpStyle = { width: '30px', height: '40px', margin: '8px' };

export const PasswordResetFinishPage = props => {
  const [password, setPassword] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [OTP, setOTP] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const dispatch = useDispatch();
  const select = useSelector((state: IRootState) => state.passwordReset);

  useEffect(() => () => dispatch(reset()), []);
  useEffect(() => setEmail(Storage.session.get(`email`)), []);
  useEffect(() => {
    if (select.resetPasswordSuccess) {
      Storage.session.remove(`email`);
      props.history.push(Route.LOGIN);
    }
  }, [select.resetPasswordSuccess]);

  const onChangeOTP = otp => setOTP(otp);

  const submit = (newPassword: string) => {
    dispatch(handlePasswordResetFinish('RESET_PASSWORD', email, OTP, newPassword));
  };

  const handleValidSubmit = (event, values) => {
    setIsSubmitted(true);
    OTP.length === 6 && submit(values.newPassword);
  };

  const updatePassword = event => setPassword(event.target.value);

  return (
    <Container fluid={true} className="content-body">
      <Row>
        <Col sm={{ size: '8', offset: '2' }} md={{ size: '6', offset: '3' }} className="content-body container-content">
          <div className="password-reset">
            <span className="in-active cursor">
              <Translate contentKey="login.forgot.password">Reset password</Translate>
            </span>
          </div>
          <div className="activation-note">
            <Translate contentKey="activate.activation.label">Please enter the verification code we just sent to your email</Translate>
          </div>
          <div className="otp-input mb-2">
            <OtpInput value={OTP} onChange={onChangeOTP} numInputs={6} isInputNum={true} shouldAutoFocus={true} inputStyle={otpStyle} />
            {OTP.length !== 6 && isSubmitted && <div className="invalid-feedback">Please enter your OTP.</div>}
          </div>

          <AvForm id="register-form" onValidSubmit={handleValidSubmit}>
            <AvField
              name="newPassword"
              label={translate('global.form.newpassword.label')}
              placeholder={translate('global.form.newpassword.placeholder')}
              type="password"
              validate={{
                async: validatePassword,
                required: { value: true, errorMessage: translate('global.messages.validate.newpassword.required') },
                minLength: { value: 4, errorMessage: translate('global.messages.validate.newpassword.minlength') },
                maxLength: { value: 50, errorMessage: translate('global.messages.validate.newpassword.maxlength') },
              }}
              onChange={updatePassword}
            />
            <PasswordStrengthBar password={password} />
            <PasswordValidation password={password} />

            <AvField
              name="confirmPassword"
              label={translate('global.form.confirmpassword.label')}
              placeholder={translate('global.form.confirmpassword.placeholder')}
              type="password"
              validate={{
                required: { value: true, errorMessage: translate('global.messages.validate.confirmpassword.required') },
                minLength: { value: 4, errorMessage: translate('global.messages.validate.confirmpassword.minlength') },
                maxLength: { value: 50, errorMessage: translate('global.messages.validate.confirmpassword.maxlength') },
                match: { value: 'newPassword', errorMessage: translate('global.messages.error.dontmatch') },
              }}
            />
            <Button className="btn submit-btn success-button" type="submit">
              {select.loading ? <Loader /> : <Translate contentKey="reset.finish.form.button">Validate new password</Translate>}
            </Button>
          </AvForm>
          <div className="resend-link mt-2" onClick={() => dispatch(handlePasswordResetInit(email))}>
            <Translate contentKey="activate.resend.otp">Click here to resend OTP.</Translate>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PasswordResetFinishPage;
