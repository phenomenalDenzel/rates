import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import LocalGovt from './local-govt';
import LocalGovtDetail from './local-govt-detail';
import LocalGovtUpdate from './local-govt-update';
import LocalGovtDeleteDialog from './local-govt-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={LocalGovtDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LocalGovtUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LocalGovtUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LocalGovtDetail} />
      <ErrorBoundaryRoute path={match.url} component={LocalGovt} />
    </Switch>
  </>
);

export default Routes;
