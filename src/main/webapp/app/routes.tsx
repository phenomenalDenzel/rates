import React from 'react';
import { Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import Login from 'app/modules/login/login';
import Register from 'app/modules/account/register/register';
import Activate from 'app/modules/account/activate/activate';
import PasswordResetInit from 'app/modules/account/password-reset/init/password-reset-init';
import PasswordResetFinish from 'app/modules/account/password-reset/finish/password-reset-finish';
import OtpActivation from 'app/modules/account/activate/otp-activation';
import Logout from 'app/modules/login/logout';
import Dashboard from 'app/modules/dashboard/dashboard';
import BackOffice from 'app/modules/administration/backoffice/backoffice';
import Home from 'app/modules/home/home';
import Explore from 'app/modules/explore/explore';
import Entities from 'app/entities';
import PrivateRoute from 'app/shared/auth/private-route';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import PageNotFound from 'app/shared/error/page-not-found';
import { AUTHORITIES } from 'app/config/constants';
import { Route } from 'app/shared/model/enumerations/route.model';
import ExploreDetails from 'app/modules/explore/explore-details/explore-details';
import UserProfile from 'app/modules/user-profile/user-profile';

const Account = Loadable({
  loader: () => import(/* webpackChunkName: "account" */ 'app/modules/account'),
  loading: () => <div>loading ...</div>,
});

const Admin = Loadable({
  loader: () => import(/* webpackChunkName: "administration" */ 'app/modules/administration'),
  loading: () => <div>loading ...</div>,
});

const Routes = () => (
  <div className="view-routes">
    <Switch>
      <ErrorBoundaryRoute path={Route.LOGIN} component={Login} />
      <ErrorBoundaryRoute path={Route.LOGOUT} component={Logout} />
      <ErrorBoundaryRoute path={Route.REGISTER} component={Register} />
      <ErrorBoundaryRoute path={Route.ACTIVATE} component={Activate} />
      <ErrorBoundaryRoute path={Route.OTP_ACTIVATION} component={OtpActivation} />
      <ErrorBoundaryRoute path={Route.RESET_INIT} component={PasswordResetInit} />
      <ErrorBoundaryRoute path={Route.RESET_FINISH} component={PasswordResetFinish} />
      <PrivateRoute path={Route.DASHBOARD} component={Dashboard} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.CUSTOMER]} />
      <PrivateRoute path={Route.USER_PROFILE} component={UserProfile} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.CUSTOMER]} />
      <PrivateRoute
        path={Route.EXPLORE_DETAIL}
        exact
        component={ExploreDetails}
        hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.CUSTOMER]}
      />
      <PrivateRoute path={Route.EXPLORE} component={Explore} exact hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.CUSTOMER]} />
      <PrivateRoute path={Route.BACKOFFICE} exact component={BackOffice} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]} />
      <PrivateRoute path={`${Route.BACKOFFICE}${Route.ADMIN}`} component={Admin} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
      <PrivateRoute
        path={`${Route.BACKOFFICE}${Route.ACCOUNT}`}
        component={Account}
        hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}
      />
      <ErrorBoundaryRoute path={Route.INDEX} exact component={Home} />
      <PrivateRoute path={Route.INDEX} component={Entities} hasAnyAuthorities={[AUTHORITIES.USER]} />
      <ErrorBoundaryRoute component={PageNotFound} />
    </Switch>
  </div>
);

export default Routes;
