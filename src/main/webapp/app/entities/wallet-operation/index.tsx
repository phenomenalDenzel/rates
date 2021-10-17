import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import WalletOperation from './wallet-operation';
import WalletOperationDetail from './wallet-operation-detail';
import WalletOperationUpdate from './wallet-operation-update';
import WalletOperationDeleteDialog from './wallet-operation-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={WalletOperationDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={WalletOperationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={WalletOperationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={WalletOperationDetail} />
      <ErrorBoundaryRoute path={match.url} component={WalletOperation} />
    </Switch>
  </>
);

export default Routes;
