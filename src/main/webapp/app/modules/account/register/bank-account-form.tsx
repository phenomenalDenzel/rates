import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Translate, translate } from 'react-jhipster';
import { Row, Col } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, FormGroup } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { setUserRecord } from 'app/modules/account/register/register.reducer';
import { RegistrationStage } from 'app/shared/model/enumerations/registration-stage.model';

export interface IBankAccountUpdateProps {
  setStep: (type: RegistrationStage) => void;
}

interface IAccountInfo {
  bankName?: string;
  bankAccountNumber?: string;
}

const BankAccount = (props: IBankAccountUpdateProps) => {
  const dispatch = useDispatch();
  const select = useSelector((state: IRootState) => state.register);

  const [accountInfo, setAccountInfo] = useState<IAccountInfo>({});
  const { bankName, bankAccountNumber } = accountInfo;

  const nextStep = () => {
    props.setStep(RegistrationStage.NEXT_OF_KIN);
  };

  const validateForm = () => {
    dispatch(setUserRecord({ ...select.userRecord, ...accountInfo }));
    nextStep();
  };

  const setRecord = event => {
    const account = accountInfo;
    const { name, value } = event.target;
    account[name] = value;
    setAccountInfo(account);
  };

  useEffect(() => {
    if (select.userRecord) {
      const user = select.userRecord;
      setAccountInfo(user);
    }
  }, [select.userRecord]);

  return (
    <>
      <div className="register-title">
        <Translate contentKey="register.bank.info.title">Bank Information</Translate>
      </div>
      <div className="sub-title-1">
        <Translate contentKey="register.bank.info.title">Enter your basic details as they appear on your identification document</Translate>
      </div>
      <AvForm id="register-form" onValidSubmit={validateForm}>
        <Row>
          <Col sm="12" md="12">
            <AvField
              name="bankAccountNumber"
              value={bankAccountNumber}
              type="number"
              className="form-control"
              placeholder={translate('global.form.accountnumber.placeholder')}
              onChange={setRecord}
              validate={{
                required: { value: true, errorMessage: translate('global.messages.validate.accountnumber.required') },
                minLength: { value: 10, errorMessage: translate('global.messages.validate.accountnumber.minlength') },
                maxLength: { value: 10, errorMessage: translate('global.messages.validate.accountnumber.maxlength') },
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="12">
            <AvField
              name="bankName"
              value={bankName}
              type="text"
              className="form-control"
              placeholder={translate('global.form.accountname.placeholder')}
              onChange={setRecord}
              validate={{
                required: { value: true, errorMessage: translate('global.messages.validate.accountname.required') },
                minLength: { value: 2, errorMessage: translate('global.messages.validate.accountname.minlength') },
                maxLength: { value: 256, errorMessage: translate('global.messages.validate.accountname.maxlength') },
              }}
            />
          </Col>
        </Row>

        <FormGroup>
          <Button className="btn submit-btn success-button">
            <Translate contentKey="register.continue.button">Continue</Translate>
          </Button>
        </FormGroup>
        <div
          id="skipBtn"
          className="text-center skip"
          onClick={() => {
            nextStep();
          }}
        >
          <Translate contentKey="register.skip">SKIP</Translate>
        </div>
      </AvForm>
    </>
  );
};

export default BankAccount;
