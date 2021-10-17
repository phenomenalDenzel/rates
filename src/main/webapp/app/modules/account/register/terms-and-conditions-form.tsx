import React, { useState } from 'react';
import { Translate } from 'react-jhipster';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { RegistrationStage } from 'app/shared/model/enumerations/registration-stage.model';

export interface IBankAccountUpdateProps {
  setStep: (type: RegistrationStage) => void;
}

const TermsAndConditions = (props: IBankAccountUpdateProps) => {
  const [agree, setAgree] = useState(false);
  const nextStep = () => {
    props.setStep(2);
  };

  return (
    <>
      <div className="register-title">
        <Translate contentKey="register.subtitle">Are you a qualified investor</Translate>
      </div>
      <div className="terms-paragragh pt-2">
        <Translate contentKey="register.description.first.paragraph">
          1. By agreeing, you confirm that you will be fully responsible for all activity in your account - including all investment
          decisions and transactions.
        </Translate>
      </div>
      <div className="terms-paragragh">
        <Translate contentKey="register.description.second.paragraph">
          You confirm that you will not allow any unauthorised person to make use of your account in any way and take full responsibility
          for any loss, financial or otherwise, that occurs as a result of unauthorised use of your account.
        </Translate>
      </div>
      <div className="terms-paragragh">
        <Translate contentKey="register.description.third.paragraph">
          2. You acknowledge that Rates.ng does not provide any financial, investment or legal advice and you are fully responsible for any
          investment decisions.
        </Translate>
      </div>
      <div className="terms-paragragh">
        <Translate contentKey="register.description.fourth.paragraph">
          Any information or data on the platform is for information purposes only and does not amount to financial, legal or investment
          advice. You should consult with qualified advisers for these matters.
        </Translate>
      </div>
      <div className="terms-and-condition">
        <div className="input-reg-checkbox">
          <AvForm id="register-form">
            <AvField name="terms" id="agree" type="checkbox" onChange={() => setAgree(!agree)} />
          </AvForm>
        </div>
        <div className="reg-term">
          <label htmlFor="agree">
            <Translate contentKey="register.form.label">I agree with the terms stated above</Translate>
          </label>
        </div>
      </div>
      <div className="text-center">
        <button
          type="button"
          disabled={!agree}
          className="btn submit-btn success-button"
          onClick={() => {
            nextStep();
          }}
        >
          <Translate contentKey="register.continue.button">Continue</Translate>
        </button>
      </div>
    </>
  );
};

export default TermsAndConditions;
