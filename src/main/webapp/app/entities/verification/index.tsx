import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Verification from './verification';
import VerificationDetail from './verification-detail';
import VerificationUpdate from './verification-update';
import VerificationDeleteDialog from './verification-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={VerificationDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={VerificationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={VerificationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={VerificationDetail} />
      <ErrorBoundaryRoute path={match.url} component={Verification} />
    </Switch>
  </>
);

export default Routes;
