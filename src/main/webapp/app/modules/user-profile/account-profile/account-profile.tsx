import React, { useState, useEffect } from 'react';
import { Translate, translate } from 'react-jhipster';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Label, FormGroup, Input, Button } from 'reactstrap';
import { AvForm, AvField, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
import { updateProfile, getCustomerProfile } from 'app/entities/customer/customer.reducer';
import { GenderStatus } from 'app/shared/model/enumerations/gender-status.model';
import { IRootState } from 'app/shared/reducers';
import Loader from 'app/shared/util/loader';

import '../user-profile.scss';
import './account-profile.scss';

interface IUserInfo {
  firstName?: string;
  lastName?: string;
  dob?: string;
  email?: string;
  mobile?: string;
}

const AccountProfile = () => {
  const dispatch = useDispatch();
  const select = useSelector((state: IRootState) => state.customer);
  const [userInfo, setUserInfo] = useState<IUserInfo>({});

  const { firstName, lastName, email, dob, mobile } = userInfo;

  const setRecord = event => {
    const { name, value } = event.target;
    userInfo[name] = value;
    setUserInfo(userInfo);
  };

  const validateForm = () => {
    dispatch(updateProfile({ ...userInfo }));
  };

  useEffect(() => {
    dispatch(getCustomerProfile());
  }, []);

  useEffect(() => {
    if (select.entity) {
      setUserInfo(select.entity);
    }
  }, [select.entity]);
  return (
    <>
      <Row className="user-profile">
        <Col>
          <AvForm className="user-update" onValidSubmit={validateForm}>
            <Row>
              <Col className="form-content">
                <Row className="form-field">
                  <Col xs="12" sm="4" md="3">
                    <div className="form-label">Edit Full Name</div>
                    <div className="form-sub-label">Your full name</div>
                  </Col>
                  <Col xs="12" sm="6" md="3">
                    <AvField
                      name="firstName"
                      value={firstName}
                      type="text"
                      className="form-control"
                      placeholder={translate('global.form.firstname.placeholder')}
                      onChange={setRecord}
                      validate={{
                        required: { value: true, errorMessage: translate('global.messages.validate.firstname.required') },
                        pattern: {
                          value: '^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$',
                          errorMessage: translate('global.messages.validate.firstname.required'),
                        },
                        minLength: { value: 2, errorMessage: translate('global.messages.validate.firstname.minlength') },
                        maxLength: { value: 50, errorMessage: translate('global.messages.validate.firstname.maxlength') },
                      }}
                    />
                  </Col>
                  <Col xs="12" sm="6" md="3">
                    <AvField
                      name="lastName"
                      value={lastName}
                      type="text"
                      className="form-control"
                      placeholder="Last name"
                      onChange={setRecord}
                      validate={{
                        required: { value: true, errorMessage: translate('global.messages.validate.lastname.required') },
                        pattern: {
                          value: '^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$',
                          errorMessage: translate('global.messages.validate.lastname.required'),
                        },
                        minLength: { value: 2, errorMessage: translate('global.messages.validate.lastname.minlength') },
                        maxLength: { value: 50, errorMessage: translate('login.messages.validate.lastname.maxlength') },
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-field">
                  <Col xs="12" sm="6" md="3">
                    <div className="form-label">Email Address</div>
                    <div className="form-sub-label">
                      we send saving notifications and other sccount updates to your confirmed email address.
                    </div>
                  </Col>
                  <Col xs="12" sm="6" md="3">
                    <AvField
                      name="email"
                      placeholder={translate('global.form.email.address')}
                      type="email"
                      value={email}
                      onChange={setRecord}
                      validate={{
                        required: { value: true, errorMessage: translate('global.messages.validate.email.required') },
                        minLength: { value: 5, errorMessage: translate('global.messages.validate.email.minlength') },
                        maxLength: { value: 254, errorMessage: translate('global.messages.validate.email.maxlength') },
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-field">
                  <Col xs="12" sm="6" md="3">
                    <div className="form-label">Phone Number</div>
                    <div className="form-sub-label">we send verification messages to your phone number.</div>
                  </Col>
                  <Col xs="12" sm="6" md="3">
                    <AvField
                      name="mobile"
                      value={mobile}
                      onChange={setRecord}
                      className="form-control"
                      placeholder={translate('global.form.phone.number')}
                      type="number"
                      validate={{
                        required: { value: true, errorMessage: translate('global.messages.validate.mobile.required') },
                        minLength: { value: 11, errorMessage: translate('global.messages.validate.mobile.minlength') },
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-field">
                  <Col xs="12" sm="6" md="3">
                    <div className="form-label">Date of Birth</div>
                    <div className="form-sub-label">For birthday emails</div>
                  </Col>
                  <Col xs="12" sm="6" md="3">
                    <AvField
                      name="dob"
                      value={dob}
                      onChange={setRecord}
                      placeholder={translate('global.form.dob.placeholder')}
                      type="date"
                      validate={{
                        required: { value: true, errorMessage: translate('global.messages.validate.email.required') },
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col className="fixed-bottom">
                <FormGroup className="text-center">
                  <Button className="btn user-update-btn success-button">{select.updating ? <Loader /> : 'Update Profile'}</Button>
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
