import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import EmploymentDetails from './employment-details';
import EmploymentDetailsDetail from './employment-details-detail';
import EmploymentDetailsUpdate from './employment-details-update';
import EmploymentDetailsDeleteDialog from './employment-details-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EmploymentDetailsDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EmploymentDetailsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EmploymentDetailsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EmploymentDetailsDetail} />
      <ErrorBoundaryRoute path={match.url} component={EmploymentDetails} />
    </Switch>
  </>
);

export default Routes;
