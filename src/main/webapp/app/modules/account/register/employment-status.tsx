import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Translate, translate } from 'react-jhipster';
import { Row, Col } from 'reactstrap';
import { AvForm, AvField, AvFeedback, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Button, FormGroup, Label } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { setUserRecord, getLGA } from 'app/modules/account/register/register.reducer';
import { RegistrationStage } from 'app/shared/model/enumerations/registration-stage.model';
import { AnnualIncome } from 'app/shared/model/enumerations/annual-income.model';
import { STATE_OPTIONS } from 'app/shared/model/enumerations/stateList.model';

export interface IBankAccountUpdateProps {
  setStep: (type: RegistrationStage) => void;
}

interface IAccountInfo {
  annualIncome?: string;
  employmentStatus?: string;
  qualificationLevel?: string;
  officialWebsite?: string;
  companyName?: string;
  officeAddress1?: string;
  officeAddress2?: string;
  officeState?: string;
  officeStateName?: string;
  localGvtName?: string;
  localGvtId?: number;
}

const BankAccount = (props: IBankAccountUpdateProps) => {
  const dispatch = useDispatch();
  const select = useSelector((state: IRootState) => state.register);

  const [accountInfo, setAccountInfo] = useState<IAccountInfo>({});
  const {
    annualIncome,
    employmentStatus,
    qualificationLevel,
    officialWebsite,
    companyName,
    officeAddress1,
    officeAddress2,
    officeState,
    officeStateName,
    localGvtId,
    localGvtName,
  } = accountInfo;
  const nextStep = () => {
    props.setStep(RegistrationStage.DOC_VERIFICATION);
  };

  const validateForm = () => {
    dispatch(
      setUserRecord({
        ...select.userRecord,
        ...accountInfo,
        employmentDetails: {
          officialWebsite: accountInfo.officialWebsite,
          companyName: accountInfo.companyName,
          addressLine1: accountInfo.officeAddress1,
          addressLine2: accountInfo.officeAddress2,
          localGovtName: accountInfo.localGvtName,
          localGovtId: accountInfo.localGvtId,
        },
      })
    );
    nextStep();
  };

  const setLGA = (event: React.ChangeEvent<HTMLInputElement>) => {
    const lga = select.localGovt[event.target.value];
    accountInfo['localGvtId'] = lga.id;
    accountInfo['localGvtName'] = lga.name;
    setAccountInfo(accountInfo);
  };

  const setRecord = (event: React.ChangeEvent<HTMLInputElement>) => {
    const account = { ...accountInfo };
    const { name, value } = event.target;
    account[name] = value;
    name === 'officeState' && dispatch(getLGA(value));
    setAccountInfo(account);
  };

  useEffect(() => {
    if (select.userRecord) {
      const user = select.userRecord;
      setAccountInfo(user);
    }
  }, []);

  return (
    <>
      <div className="register-title">
        <Translate contentKey="register.employment.info.title">Employment/Qualifications</Translate>
      </div>
      <div className="sub-title-1">
        <Translate contentKey="register.employment.info.subtitle">Enter your employment/qualification details</Translate>
      </div>
      <AvForm id="register-form" onValidSubmit={validateForm}>
        <Row>
          <Col sm="12" md="12">
            <AvField
              name="companyName"
              value={companyName}
              onChange={setRecord}
              placeholder={translate('global.form.company.name.placeholder')}
              className="form-control"
              type="text"
              validate={{
                required: { value: true, errorMessage: translate('global.messages.validate.company.name.required') },
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="12">
            <AvField
              name="officialWebsite"
              value={officialWebsite}
              onChange={setRecord}
              placeholder={translate('global.form.official.website.placeholder')}
              className="form-control"
              type="text"
              validate={{
                required: { value: true, errorMessage: translate('global.messages.validate.official.website.required') },
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="12">
            <AvField
              name="officeAddress1"
              value={officeAddress1}
              onChange={setRecord}
              placeholder={translate('global.form.office.address.placeholder')}
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
              name="officeAddress2"
              value={officeAddress2}
              onChange={setRecord}
              placeholder={translate('global.form.office.address2.placeholder')}
              className="form-control"
              type="text"
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
              name="officeState"
              required={true}
              value={officeState}
            >
              <option disabled={!officeState} value={!officeState ? '' : officeState}>
                {officeState ? officeState : translate('global.form.state.placeholder')}
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
              name="localGvtName"
              required={true}
              value={localGvtName}
            >
              <option disabled={!localGvtName} value={!localGvtId ? '' : localGvtId}>
                {localGvtName ? localGvtName : translate('global.form.lga.placeholder')}
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
            <AvGroup>
              <AvInput
                id="customer-annualIncome"
                type="select"
                className="form-control selection"
                onChange={setRecord}
                name="annualIncome"
                value={annualIncome}
                required={true}
              >
                <option disabled={!annualIncome} value={!annualIncome ? '' : annualIncome}>
                  {annualIncome ? annualIncome : translate('ratesApp.customer.annualIncome')}
                </option>
                <option value="BELOW_1M">{translate('ratesApp.AnnualIncome.BELOW_1M')}</option>
                <option value="BETWEEN_1M_5M">{translate('ratesApp.AnnualIncome.BETWEEN_1M_5M')}</option>
                <option value="BETWEEN_5M_20M">{translate('ratesApp.AnnualIncome.BETWEEN_5M_20M')}</option>
                <option value="ABOVE_20M">{translate('ratesApp.AnnualIncome.ABOVE_20M')}</option>
              </AvInput>
            </AvGroup>
          </Col>
          <Col sm="12" md="12">
            <AvGroup>
              <AvInput
                id="customer-employmentStatus"
                type="select"
                placeholder={translate('ratesApp.customer.employmentStatus')}
                className="form-control selection"
                onChange={setRecord}
                name="employmentStatus"
                value={employmentStatus}
                required={true}
              >
                <option disabled={!employmentStatus} value={!employmentStatus ? '' : employmentStatus}>
                  {employmentStatus ? employmentStatus : translate('ratesApp.customer.employmentStatus')}
                </option>
                <option value="EMPLOYED">{translate('ratesApp.EmploymentStatus.EMPLOYED')}</option>
                <option value="UNEMPLOYED">{translate('ratesApp.EmploymentStatus.UNEMPLOYED')}</option>
              </AvInput>
            </AvGroup>
          </Col>
          <Col sm="12" md="12">
            <AvGroup>
              <AvInput
                id="customer-qualificationLevel"
                type="select"
                placeholder={translate('ratesApp.customer.qualificationLevel')}
                onChange={setRecord}
                className="form-control selection"
                name="qualificationLevel"
                value={qualificationLevel}
                required={true}
              >
                <option disabled={!qualificationLevel} value={!qualificationLevel ? '' : qualificationLevel}>
                  {qualificationLevel ? qualificationLevel : translate('ratesApp.customer.qualificationLevel')}
                </option>
                <option value="HIGHER_NATIONAL_DIPLOMA">{translate('ratesApp.Qualification.HIGHER_NATIONAL_DIPLOMA')}</option>
                <option value="HIGHER_NATIONAL_CERTIFICATE">{translate('ratesApp.Qualification.HIGHER_NATIONAL_CERTIFICATE')}</option>
                <option value="A_LEVEL">{translate('ratesApp.Qualification.A_LEVEL')}</option>
                <option value="BACHELORS_DEGREE">{translate('ratesApp.Qualification.BACHELORS_DEGREE')}</option>
                <option value="MASTERS_DEGREE">{translate('ratesApp.Qualification.MASTERS_DEGREE')}</option>
                <option value="PHD">{translate('ratesApp.Qualification.PHD')}</option>
              </AvInput>
            </AvGroup>
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

export default BankAccount;
