import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { RegistrationStage } from 'app/shared/model/enumerations/registration-stage.model';
import { Route } from 'app/shared/model/enumerations/route.model';

export interface IRegHeadInfoProps extends RouteComponentProps<{}> {
  step: RegistrationStage;
  progress: string;
  previousStep: () => void;
  stage: RegistrationStage;
}

const RegHeadInfo = (props: IRegHeadInfoProps) => {
  const { step, progress, previousStep, stage } = props;
  const back = () => {
    if (stage === RegistrationStage.TERMS_AND_CONDITION) {
      props.history.push(Route.LOGIN);
    } else {
      previousStep();
    }
  };
  return (
    <>
      <div className="mb-2 cursor">
        <img src="content/images/arrow-left.svg" onClick={() => back()} alt="iphone" className="my-image" />
      </div>
      <div className="sub-step-title">
        <Translate contentKey="ratesApp.nextOfKin.messages.step">Step</Translate> {step} 0f 5
      </div>
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          aria-valuenow={0}
          aria-valuemin={0}
          aria-valuemax={10}
          style={{ width: progress }}
        ></div>
      </div>
    </>
  );
};

export default withRouter(RegHeadInfo);
