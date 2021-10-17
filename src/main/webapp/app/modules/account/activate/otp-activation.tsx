import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Translate, Storage } from 'react-jhipster';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import OtpInput from 'react-otp-input';

import { IRootState } from 'app/shared/reducers';
import { validateOTP, generateOTP } from 'app/modules/account/activate/activate.reducer';
import Header from 'app/shared/layout/header/header-logout';
import { AnimateLeft, AnimateUp } from 'app/shared/util/constant';
import Loader from 'app/shared/util/loader';
import { Route } from 'app/shared/model/enumerations/route.model';
import { OtpAction } from 'app/shared/model/enumerations/otp-action.model';

import './activate.scss';

const otpStyle = { width: '30px', height: '40px', margin: '8px' };

export const OtpActivation = props => {
  const [OTP, setOTP] = useState<string>('');
  const dispatch = useDispatch();
  const select = useSelector((state: IRootState) => state.activate);
  const { updating, otpResponse, loading } = select;

  const activate = (otp = OTP) => {
    if (otp.length === 6 || OTP.length === 6) {
      const email = Storage.session.get(`email`);
      dispatch(validateOTP({ email, code: otp, action: OtpAction.ACTIVATION }));
    }
  };

  const resend = () => {
    const email = Storage.session.get(`email`);
    dispatch(generateOTP({ email, action: OtpAction.ACTIVATION }));
  };

  const onChangeOTP = otp => {
    setOTP(otp);
    otp.length === 6 && activate(otp);
  };
  useEffect(() => {
    if (!updating && otpResponse) {
      Storage.session.remove(`email`);
      props.history.push(Route.LOGIN);
    }
  }, [!updating && otpResponse]);

  return (
    <Container fluid={true} className="content-body">
      <Row>
        <Col sm={{ size: '8', offset: '2' }} md={{ size: '6', offset: '3' }} className="otp-activate content-body container-content">
          <div className="check-email">
            <Translate contentKey="activate.check.email">Check your mail</Translate>
          </div>
          <div className="activation-note">
            <Translate contentKey="activate.activation.note">
              We ve sent verification codes to your email and its needed to activate your account.
              <br />
              (Do check the spam folder of not in your inbox.)
            </Translate>
          </div>
          <div className="activate-account">
            <Translate contentKey="activate.activate.account">Activate Your Account</Translate>
          </div>
          <div className="activation-note">
            <Translate contentKey="activate.activation.label">Please enter the verification code we just sent to your email</Translate>
          </div>

          <div className="otp-input">
            <OtpInput value={OTP} onChange={onChangeOTP} numInputs={6} isInputNum={true} shouldAutoFocus={true} inputStyle={otpStyle} />
          </div>

          <Button className="btn submit-btn success-button" onClick={activate} type="submit">
            {!updating ? <Translate contentKey="activate.activate.btn">Activate your account</Translate> : <Loader />}
          </Button>

          <div className="mt-2">
            <span className="activation-note">
              <Translate contentKey="activate.get.email">Didnt get am email?</Translate>
            </span>
            <span className="resend-link" onClick={resend}>
              <Translate contentKey="activate.resend.link">Click here to resend.</Translate>
            </span>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default OtpActivation;
