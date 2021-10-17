import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Otp from './otp';
import OtpDetail from './otp-detail';
import OtpUpdate from './otp-update';
import OtpDeleteDialog from './otp-delete-dialog';
import { Route } from 'app/shared/model/enumerations/route.model';

const Routes = () => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${Route.OTP}/:id/delete`} component={OtpDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${Route.OTP}/new`} component={OtpUpdate} />
      <ErrorBoundaryRoute exact path={`${Route.OTP}/:id/edit`} component={OtpUpdate} />
      <ErrorBoundaryRoute exact path={`${Route.OTP}/:id`} component={OtpDetail} />
      <ErrorBoundaryRoute exact path={Route.OTP} component={Otp} />
    </Switch>
  </>
);

export default Routes;
