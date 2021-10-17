import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Opportunity from './opportunity';
import OpportunityDetail from './opportunity-detail';
import OpportunityUpdate from './opportunity-update';
import OpportunityDeleteDialog from './opportunity-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={OpportunityDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={OpportunityUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={OpportunityUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={OpportunityDetail} />
      <ErrorBoundaryRoute path={match.url} component={Opportunity} />
    </Switch>
  </>
);

export default Routes;
