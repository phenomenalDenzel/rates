import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import LocalGovt from './local-govt';
import Location from './location';
import Verification from './verification';
import Customer from './customer';
import NextOfKin from './next-of-kin';
import Wallet from './wallet';
import WalletOperation from './wallet-operation';
import Provider from './provider';
import Opportunity from './opportunity';
import OpportunityDocument from './opportunity-document';
import Application from './application';
import EmploymentDetails from './employment-details';
import Otp from './otp';
import { Route } from 'app/shared/model/enumerations/route.model';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${Route.BACKOFFICE}/local-govt`} component={LocalGovt} />
      <ErrorBoundaryRoute path={`${Route.BACKOFFICE}/location`} component={Location} />
      <ErrorBoundaryRoute path={`${Route.BACKOFFICE}/verification`} component={Verification} />
      <ErrorBoundaryRoute path={`${Route.BACKOFFICE}/customer`} component={Customer} />
      <ErrorBoundaryRoute path={`${Route.BACKOFFICE}/next-of-kin`} component={NextOfKin} />
      <ErrorBoundaryRoute path={`${Route.BACKOFFICE}/wallet`} component={Wallet} />
      <ErrorBoundaryRoute path={`${Route.BACKOFFICE}/wallet-operation`} component={WalletOperation} />
      <ErrorBoundaryRoute path={`${Route.BACKOFFICE}/provider`} component={Provider} />
      <ErrorBoundaryRoute path={`${Route.BACKOFFICE}/opportunity`} component={Opportunity} />
      <ErrorBoundaryRoute path={`${Route.BACKOFFICE}/opportunity-document`} component={OpportunityDocument} />
      <ErrorBoundaryRoute path={`${Route.BACKOFFICE}/application`} component={Application} />
      <ErrorBoundaryRoute path={`${Route.BACKOFFICE}/employment-details`} component={EmploymentDetails} />
      <ErrorBoundaryRoute path={`${Route.BACKOFFICE}/otp`} component={Otp} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
