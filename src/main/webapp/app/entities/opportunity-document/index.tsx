import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import OpportunityDocument from './opportunity-document';
import OpportunityDocumentDetail from './opportunity-document-detail';
import OpportunityDocumentUpdate from './opportunity-document-update';
import OpportunityDocumentDeleteDialog from './opportunity-document-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={OpportunityDocumentDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={OpportunityDocumentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={OpportunityDocumentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={OpportunityDocumentDetail} />
      <ErrorBoundaryRoute path={match.url} component={OpportunityDocument} />
    </Switch>
  </>
);

export default Routes;
