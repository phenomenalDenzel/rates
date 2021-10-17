import React, { useState, useEffect } from 'react';
import { Translate, translate } from 'react-jhipster';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Label, FormGroup, Input, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { savePassword } from 'app/modules/account/password/password.reducer';
import { IRootState } from 'app/shared/reducers';
import Loader from 'app/shared/util/loader';
import { PasswordValidation, validatePassword } from 'app/shared/components/passwordValidation';
import '../user-profile.scss';

interface IUserInfo {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const AccountProfile = () => {
  const dispatch = useDispatch();
  const select = useSelector((state: IRootState) => state.password);
  const [userInfo, setUserInfo] = useState<IUserInfo>({});

  const setRecord = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const info = { ...userInfo, [name]: value };
    setUserInfo(info);
  };

  const validateForm = () => {
    const { currentPassword, newPassword } = userInfo;
    dispatch(savePassword(currentPassword, newPassword));
  };

  return (
    <>
      <Row className="user-profile">
        <Col>
          <AvForm className="user-update" onValidSubmit={validateForm}>
            <Row>
              <Col>
                <Row className="form-field">
                  <Col xs="12" sm="6" md="3">
                    <div className="form-label">Password</div>
                    <div className="form-sub-label">Please provide your current password </div>
                  </Col>
                  <Col xs="12" sm="6" md="3">
                    <AvField
                      name="currentPassword"
                      placeholder={translate('global.form.currentpassword.placeholder')}
                      type="password"
                      value={userInfo.currentPassword}
                      onChange={setRecord}
                      validate={{
                        required: { value: true, errorMessage: translate('global.messages.validate.currentpassword.required') },
                        minLength: { value: 4, errorMessage: translate('global.messages.validate.currentpassword.minlength') },
                        maxLength: { value: 50, errorMessage: translate('global.messages.validate.currentpassword.maxlength') },
                      }}
                    />
                    <AvField
                      name="newPassword"
                      placeholder={translate('global.form.newpassword.placeholder')}
                      type="password"
                      value={userInfo.newPassword}
                      onChange={setRecord}
                      validate={{
                        async: validatePassword,
                        required: { value: true, errorMessage: translate('global.messages.validate.newpassword.required') },
                        minLength: { value: 4, errorMessage: translate('global.messages.validate.newpassword.minlength') },
                        maxLength: { value: 50, errorMessage: translate('global.messages.validate.newpassword.maxlength') },
                      }}
                    />
                    <PasswordValidation password={userInfo.newPassword} />
                    <AvField
                      name="confirmPassword"
                      placeholder={translate('global.form.retypepassword.placeholder')}
                      type="password"
                      onChange={setRecord}
                      value={userInfo.confirmPassword}
                      validate={{
                        required: { value: true, errorMessage: translate('global.messages.validate.confirmpassword.required') },
                        minLength: { value: 4, errorMessage: translate('global.messages.validate.confirmpassword.minlength') },
                        maxLength: { value: 50, errorMessage: translate('global.messages.validate.confirmpassword.maxlength') },
                        match: { value: 'newPassword', errorMessage: translate('global.messages.error.dontmatch') },
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col className="fixed-bottom">
                <FormGroup className="text-center">
                  <Button className="btn user-update-btn success-button">{select.loading ? <Loader /> : 'Update Password'}</Button>
                </FormGroup>
              </Col>
            </Row>
          </AvForm>
        </Col>
      </Row>
    </>
  );
};

export default AccountProfile;
