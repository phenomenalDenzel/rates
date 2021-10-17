import React, { useState, useEffect } from 'react';
import { Translate, translate, Storage } from 'react-jhipster';
import { Button, Col, Container, FormGroup, Row } from 'reactstrap';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { useDispatch, useSelector } from 'react-redux';

import { IRootState } from 'app/shared/reducers';
import { AnimateUp } from 'app/shared/util/constant';
import Loader from 'app/shared/util/loader';
import { handlePasswordResetInit } from 'app/modules/account/password-reset/password-reset.reducer';
import { Route } from 'app/shared/model/enumerations/route.model';

import 'app/modules/login/login.scss';

const PasswordResetInit = props => {
  const dispatch = useDispatch();
  const select = useSelector((state: IRootState) => state.passwordReset);
  const [email, setEmail] = useState('');

  const updateEmail = event => setEmail(event.target.value);
  const reset = () => {
    Storage.session.set('email', email);
    dispatch(handlePasswordResetInit(email));
  };

  const loginPage = () => {
    props.history.push(Route.LOGIN);
  };

  useEffect(() => {
    if (select.resetPasswordInitSuccess) {
      props.history.push(Route.RESET_FINISH);
    }
  }, [select.resetPasswordInitSuccess]);

  return (
    <Container fluid={true} className="content-body">
      <Row>
        <Col sm={{ size: '8', offset: '2' }} md={{ size: '6', offset: '3' }} className="content-body container-content">
          <div className="password-reset">
            <span className="in-active cursor register">
              <Translate contentKey="login.forgot.password">Password reset</Translate>
            </span>
          </div>

          <AvForm id="register-form" onValidSubmit={reset}>
            <AvField
              name="email"
              placeholder={translate('global.form.email.placeholder')}
              type="email"
              onChange={updateEmail}
              validate={{
                required: { value: true, errorMessage: translate('global.messages.validate.email.required') },
                minLength: { value: 5, errorMessage: translate('global.messages.validate.email.minlength') },
                maxLength: { value: 254, errorMessage: translate('global.messages.validate.email.maxlength') },
              }}
            />

            <FormGroup>{select.loadingInit ? <Loader /> : <Button className="btn submit-btn success-button">Reset</Button>}</FormGroup>
          </AvForm>
          <div className="sub-title-2">
            <span onClick={loginPage}>
              <Translate contentKey="login.nav.login.page">Back to login</Translate>
            </span>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PasswordResetInit;
