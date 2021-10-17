import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Translate, translate, Storage } from 'react-jhipster';
import { Row, Col } from 'reactstrap';
import { AvForm, AvField, AvInput } from 'availity-reactstrap-validation';
import { Button, FormGroup } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { handleRegister } from 'app/modules/account/register/register.reducer';
import Loader from 'app/shared/util/loader';
import { Route } from 'app/shared/model/enumerations/route.model';
import { RelationshipType } from 'app/shared/model/enumerations/relationship-type.model';
import { Title } from 'app/shared/model/enumerations/title.model';
import { ICustomer } from 'app/shared/model/customer.model';
import { setUserRecord } from 'app/modules/account/register/register.reducer';

interface INextOfKinInfo {
  title?: Title;
  name?: string;
  relation?: RelationshipType;
  phoneNumber?: string;
}

const NextOfKin = props => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const select = useSelector((state: IRootState) => state.register);

  const [nextOfKinInfo, setNextOfKinInfo] = useState<INextOfKinInfo>({});
  const [customer, setCustomer] = useState<ICustomer>({});

  const { title, name, relation, phoneNumber } = nextOfKinInfo || {};
  const register = () => {
    setEmail(select.userRecord.email);
    const payload = {
      ...select.userRecord,
      langKey: 'en',
      nextOfKins: {
        ...nextOfKinInfo,
      },
    };
    setCustomer({ ...payload });
    dispatch(handleRegister(payload));
  };

  const setRecord = event => {
    const nextOfKin = nextOfKinInfo || {};
    nextOfKin[event.target.name] = event.target.value;
    setNextOfKinInfo(nextOfKin);
  };

  useEffect(() => {
    if (select.registrationSuccess) {
      dispatch(setUserRecord({}));
      Storage.session.set('email', email);
      props.history.push(Route.OTP_ACTIVATION);
    }
  }, [select.registrationSuccess]);

  useEffect(() => {
    if (select.userRecord) {
      const user = select.userRecord;
      user.nextOfKins && setNextOfKinInfo(user.nextOfKins);
    }
  }, [select.userRecord]);

  useEffect(() => {
    if (!select.loading && select.registrationFailure) {
      setNextOfKinInfo(customer.nextOfKins);
      dispatch(setUserRecord({ ...customer }));
    }
  }, [select.loading]);
  return (
    <>
      <div className="register-title">
        <Translate contentKey="ratesApp.nextOfKin.form.title">Next of Kin Information</Translate>
      </div>
      <div className="sub-title-1">
        <Translate contentKey="ratesApp.nextOfKin.form.subtitle">
          Enter your basic details as they appear on your identification document
        </Translate>
      </div>
      <AvForm id="register-form" onValidSubmit={register}>
        <Row>
          <Col sm="12" md="12">
            <AvInput
              id="local-govt-state"
              type="select"
              className="mb-3 selection"
              onChange={setRecord}
              name="title"
              value={title}
              required={true}
            >
              <option disabled={!title} value={!title ? '' : title}>
                {title ? title : translate('ratesApp.nextOfKin.title')}
              </option>
              <option value={Title.MR}>{translate('ratesApp.Title.MR')}</option>
              <option value={Title.MS}>{translate('ratesApp.Title.MS')}</option>
            </AvInput>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="12">
            <AvField
              name="name"
              value={name}
              type="text"
              className="form-control"
              placeholder={translate('ratesApp.nextOfKin.form.name.placeholder')}
              onChange={setRecord}
              validate={{
                required: { value: true, errorMessage: translate('ratesApp.nextOfKin.messages.validate.name.required') },
                minLength: { value: 4, errorMessage: translate('ratesApp.nextOfKin.messages.validate.name.minlength') },
                maxLength: { value: 256, errorMessage: translate('ratesApp.nextOfKi.messages.validate.name.maxlength') },
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="12">
            <AvInput
              id="local-govt-state"
              type="select"
              className="mb-3 selection"
              onChange={setRecord}
              name="relation"
              value={relation}
              required={true}
            >
              <option disabled={!relation} value={!relation ? '' : relation}>
                {relation ? relation : translate('ratesApp.nextOfKin.relation')}
              </option>
              <option value={RelationshipType.FATHER}>{translate('ratesApp.RelationshipType.FATHER')}</option>
              <option value={RelationshipType.MOTHER}>{translate('ratesApp.RelationshipType.MOTHER')}</option>
              <option value={RelationshipType.SIBLING}>{translate('ratesApp.RelationshipType.SIBLING')}</option>
              <option value={RelationshipType.SPOUSE}>{translate('ratesApp.RelationshipType.SPOUSE')}</option>
              <option value={RelationshipType.CHILD}>{translate('ratesApp.RelationshipType.CHILD')}</option>
            </AvInput>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="12">
            <AvField
              name="phoneNumber"
              value={phoneNumber}
              type="number"
              className="form-control"
              placeholder={translate('ratesApp.nextOfKin.form.phonenumber.placeholder')}
              onChange={setRecord}
              validate={{
                required: { value: true, errorMessage: translate('ratesApp.nextOfKin.messages.validate.phonenumber.required') },
                minLength: { value: 11, errorMessage: translate('ratesApp.nextOfKin.messages.validate.phonenumber.minlength') },
                maxLength: { value: 11, errorMessage: translate('ratesApp.nextOfKin.messages.validate.phonenumber.maxlength') },
              }}
            />
          </Col>
        </Row>
        <div className="sub-title-2">
          <Translate contentKey="ratesApp.nextOfKin.messages.footer">
            By clicking on &quot;continue&quot; or &quot;skip&quot; you agree to terms of service and privacy policy
          </Translate>
        </div>
        <FormGroup>
          <Button className="btn submit-btn success-button">
            <Translate contentKey="register.continue.button">
              {select.loading ? <Loader /> : <Translate contentKey="register.continue.button">Continue</Translate>}
            </Translate>
          </Button>
        </FormGroup>
      </AvForm>
    </>
  );
};

export default withRouter(NextOfKin);
