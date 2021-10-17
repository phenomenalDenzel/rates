import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Translate, translate } from 'react-jhipster';
import { Row, Col } from 'reactstrap';
import { AvForm, AvField, AvInput } from 'availity-reactstrap-validation';
import { Button, FormGroup } from 'reactstrap';
import debounce from 'lodash.debounce';

import { IRootState } from 'app/shared/reducers';
import { setUserRecord, getLGA, BVNValidator } from 'app/modules/account/register/register.reducer';
import { RegistrationStage } from 'app/shared/model/enumerations/registration-stage.model';
import { STATE_OPTIONS } from 'app/shared/model/enumerations/stateList.model';
import { countries } from 'app/shared/util/countries';

export interface IPersonalInfoUpdateProps {
  setStep: (type: RegistrationStage) => void;
}

interface IUserInfo {
  firstName?: string;
  lastName?: string;
  dob?: string;
  bvn?: string;
  mobile?: string;
  state?: string;
  stateName?: string;
  localGovtName?: string;
  countryOfBirth?: string;
  mothersMaidenName?: string;
  nationality?: string;
  localGovtId?: number;
  addressLine1?: string;
  addressLine2?: string;
}

const PersonalInfo = (props: IPersonalInfoUpdateProps) => {
  const dispatch = useDispatch();
  const select = useSelector((state: IRootState) => state.register);

  const [checkedBVN, setCheckedBVN] = useState<number>(0);
  const [bvnMessage, setBvnMessage] = useState<string>('');
  const [userInfo, setUserInfo] = useState<IUserInfo>({});
  const {
    firstName,
    lastName,
    dob,
    bvn,
    mobile,
    stateName,
    state,
    addressLine1,
    addressLine2,
    localGovtName,
    localGovtId,
    nationality,
    countryOfBirth,
    mothersMaidenName,
  } = userInfo;
  const nextStep = () => {
    props.setStep(RegistrationStage.EMPLOYMENT_STATUS);
  };

  const debounceLoadData = useCallback(
    debounce(ctx => {
      if (ctx.bvn) {
        setCheckedBVN(ctx.bvn);
        dispatch(BVNValidator(ctx.bvn));
      }
    }, 500),
    []
  );

  const validateBVN = (value, ctx, input, cb) => {
    if (value !== '') {
      checkedBVN !== value && debounceLoadData(ctx);
      const bvnExist = select.bvnResponse.bvnExists;
      bvnExist && setBvnMessage(translate('global.messages.validate.bvn.exist'));
      return cb(!bvnExist);
    }
  };

  const retrieveLga = selectedState => {
    dispatch(getLGA(selectedState));
  };

  const validateForm = () => {
    dispatch(
      setUserRecord({
        ...select.userRecord,
        ...userInfo,
        addresses: {
          addressLine1: userInfo.addressLine1,
          addressLine2: userInfo.addressLine2,
          localGovtName: userInfo.localGovtName,
          localGovtId: userInfo.localGovtId,
          stateName: userInfo.stateName,
        },
      })
    );
    nextStep();
  };

  useEffect(() => {
    if (select.userRecord) {
      const user = select.userRecord;
      setUserInfo(user);
    }
  }, []);

  const setRecord = event => {
    const user = userInfo;
    const { name, value } = event.target;
    user[name] = value;
    name === 'state' && retrieveLga(value);
    setUserInfo(user);
  };

  const setLGA = (event: React.ChangeEvent<HTMLInputElement>) => {
    const lga = select.localGovt[event.target.value];
    userInfo['localGovtId'] = lga.id;
    userInfo['localGovtName'] = lga.name;
    setUserInfo(userInfo);
  };
  const setCountryOfBirth = (event: React.ChangeEvent<HTMLInputElement>) => {
    const details = userInfo;
    details.countryOfBirth = event.target.value;
    setUserInfo(userInfo);
  };
  const setNationality = (event: React.ChangeEvent<HTMLInputElement>) => {
    const details = userInfo;
    details.nationality = event.target.value;
    setUserInfo(userInfo);
  };

  return (
    <>
      <div className="register-title">
        <Translate contentKey="register.personal.info.title">Personal Information</Translate>
      </div>
      <div className="sub-title-1">
        <Translate contentKey="register.personal.info.subtitle">
          Enter your basic details as they appear on your identification document
        </Translate>
      </div>
      <AvForm id="register-form" onValidSubmit={validateForm}>
        <Row>
          <Col sm="12" md="6">
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
          <Col sm="12" md="6">
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
        <Row>
          <Col sm="12" md="12">
            <AvField
              name="mothersMaidenName"
              value={mothersMaidenName}
              type="text"
              className="form-control"
              placeholder={translate('global.form.mother.maiden.name.placeholder')}
              onChange={setRecord}
              validate={{
                required: { value: true, errorMessage: translate('global.messages.validate.maiden.name.required') },
                pattern: {
                  value: '^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$',
                  errorMessage: translate('global.messages.validate.maiden.name.required'),
                },
                minLength: { value: 2, errorMessage: translate('global.messages.validate.maiden.name.minlength') },
                maxLength: { value: 50, errorMessage: translate('global.messages.validate.maiden.name.maxlength') },
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="6">
            <AvField
              name="mobile"
              value={mobile}
              onChange={setRecord}
              className="form-control"
              placeholder={translate('global.form.mobile.placeholder')}
              type="number"
              validate={{
                required: { value: true, errorMessage: translate('global.messages.validate.mobile.required') },
                minLength: { value: 11, errorMessage: translate('global.messages.validate.mobile.minlength') },
              }}
            />
          </Col>
          <Col sm="12" md="6">
            <AvField
              name="dob"
              value={dob}
              onChange={setRecord}
              placeholder={translate('global.form.dob.placeholder')}
              type="date"
              validate={{
                required: { value: true, errorMessage: translate('global.messages.validate.dob.required') },
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="6">
            <AvInput
              id="countryOfBirth"
              type="select"
              className="mb-3 selection"
              onChange={setCountryOfBirth}
              name="countryOfBirth"
              required={true}
              value={countryOfBirth}
            >
              <option disabled={!countryOfBirth} value={!countryOfBirth ? '' : countryOfBirth}>
                {countryOfBirth ? countryOfBirth : translate('global.form.country.of.birth.placeholder')}
              </option>
              {select &&
                countries.map(country => {
                  return (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  );
                })}
            </AvInput>
          </Col>
          <Col sm="12" md="6">
            <AvInput
              id="nationality"
              type="select"
              className="mb-3 selection"
              onChange={setNationality}
              name="nationality"
              required={true}
              value={nationality}
            >
              <option disabled={!nationality} value={!nationality ? '' : nationality}>
                {nationality ? nationality : translate('global.form.nationality.placeholder')}
              </option>
              {select &&
                countries.map(country => {
                  return (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  );
                })}
            </AvInput>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="12">
            <AvField
              name="addressLine1"
              value={addressLine1}
              onChange={setRecord}
              placeholder={translate('global.form.address.placeholder')}
              className="form-control"
              type="text"
              validate={{
                required: { value: true, errorMessage: translate('global.messages.validate.address.required') },
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="12">
            <AvField
              name="addressLine2"
              value={addressLine2}
              onChange={setRecord}
              className="form-control"
              placeholder={translate('global.form.address2.placeholder')}
              type="text"
              validate={{
                required: { value: false, errorMessage: translate('global.messages.validate.address2.required') },
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="6">
            <AvInput
              id="local-govt-state"
              type="select"
              className="mb-3 selection"
              onChange={setRecord}
              name="state"
              required={true}
              value={state}
            >
              <option disabled={!state} value={!state ? '' : state}>
                {state ? state : translate('global.form.state.placeholder')}
              </option>
              {STATE_OPTIONS.map(({ value, i8nKey }) => {
                return (
                  <option key={value} value={value}>
                    {translate(i8nKey)}
                  </option>
                );
              })}
            </AvInput>
          </Col>

          <Col sm="12" md="6">
            <AvInput
              id="local-govt-state"
              type="select"
              className="mb-3 selection"
              onChange={setLGA}
              name="localGovtName"
              required={true}
              value={localGovtName}
            >
              <option disabled={!localGovtName} value={!localGovtId ? '' : localGovtId}>
                {localGovtName ? localGovtName : translate('global.form.lga.placeholder')}
              </option>
              {select &&
                select.localGovt.map(({ id, name }, i) => {
                  return (
                    <option key={id} value={i}>
                      {name}
                    </option>
                  );
                })}
            </AvInput>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="12">
            <AvField
              name="bvn"
              value={bvn}
              onChange={setRecord}
              errorMessage={bvnMessage}
              placeholder={translate('global.form.bvn.placeholder')}
              type="number"
              validate={{
                async: validateBVN,
                required: { value: true, errorMessage: translate('global.messages.validate.bvn.required') },
                minLength: { value: 11, errorMessage: translate('global.messages.validate.bvn.minlength') },
                maxLength: { value: 11, errorMessage: translate('global.messages.validate.bvn.maxlength') },
              }}
            />
          </Col>
        </Row>
        <FormGroup>
          <Button className="btn submit-btn success-button">
            <Translate contentKey="register.continue.button">Continue</Translate>
          </Button>
        </FormGroup>
      </AvForm>
    </>
  );
};

export default PersonalInfo;
