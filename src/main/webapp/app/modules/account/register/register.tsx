import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { IRootState } from 'app/shared/reducers';
import { AnimateLeft, AnimateUp } from 'app/shared/util/constant';
import { setAuthNavType } from 'app/shared/reducers/authentication';
import Header from 'app/shared/layout/header/header-logout';
import RegHeadInfo from './reg-head-info';
import TermsAndCondition from './terms-and-conditions-form';
import PersonalInfo from './personal-info-form';
import DocVerification from './doc-verification-form';
import BankAccount from './bank-account-form';
import EmploymentStatus from './employment-status';
import NextOfKin from './next-of-kin-form';
import { RegistrationStage } from 'app/shared/model/enumerations/registration-stage.model';
import { LoginType } from 'app/shared/model/enumerations/login-type.model';
import { Route } from 'app/shared/model/enumerations/route.model';

import './register.scss';

const Registration = props => {
  const dispatch = useDispatch();
  const select = useSelector((state: IRootState) => state.register);

  const { userRecord } = select;
  const [stage, setStage] = useState(RegistrationStage.TERMS_AND_CONDITION);

  const previousStep = () => {
    setStage(stage - 1);
  };

  useEffect(() => {
    if (!userRecord || !userRecord['email'] || userRecord['email'] === '') {
      dispatch(setAuthNavType(LoginType.REGISTRATION));
      props.history.push(Route.LOGIN);
    }
  }, []);

  const onRenderStep = () => {
    switch (stage) {
      case +RegistrationStage.TERMS_AND_CONDITION:
        return <TermsAndCondition setStep={setStage} />;
      case +RegistrationStage.PERSONAL_INFO:
        return <PersonalInfo setStep={setStage} />;
      case +RegistrationStage.EMPLOYMENT_STATUS:
        return <EmploymentStatus setStep={setStage} />;
      case +RegistrationStage.DOC_VERIFICATION:
        return <DocVerification setStep={setStage} />;
      case +RegistrationStage.NEXT_OF_KIN:
        return <NextOfKin />;
      default:
        return <TermsAndCondition setStep={setStage} />;
    }
  };

  return (
    <div className={`container-fluid register-page`}>
      <div className={`row ${AnimateUp()}`}>
        <div className={`col-sm-8 col-md-6 offset-md-3 offset-sm-2`}>
          <RegHeadInfo step={stage} progress={stage * 20 + '%'} previousStep={previousStep} stage={stage} />
          {onRenderStep()}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Registration);
