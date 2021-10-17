import React, { useLayoutEffect, useEffect } from 'react';
import { connect } from 'react-redux';

import { IRootState } from 'app/shared/reducers';
import { logout } from 'app/shared/reducers/authentication';
import { Route } from 'app/shared/model/enumerations/route.model';

export interface ILogoutProps extends StateProps, DispatchProps {
  idToken: string;
  logoutUrl: string;
  history: any;
}

export const Logout = (props: ILogoutProps) => {
  useLayoutEffect(() => {
    props.logout();
    const logoutUrl = props.logoutUrl;
    if (logoutUrl) {
      // if Keycloak, logoutUrl has protocol/openid-connect in it
      window.location.href = logoutUrl.includes('/protocol')
        ? logoutUrl + '?redirect_uri=' + window.location.origin
        : logoutUrl + '?id_token_hint=' + props.idToken + '&post_logout_redirect_uri=' + window.location.origin;
    }
  });

  useEffect(() => {
    if (!props.isAuthenticated) {
      props.history.push(Route.LOGIN);
    }
  });

  return null;
};

const mapStateToProps = (storeState: IRootState) => ({
  logoutUrl: storeState.authentication.logoutUrl,
  idToken: storeState.authentication.idToken,
  isAuthenticated: storeState.authentication.isAuthenticated,
});

const mapDispatchToProps = { logout };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
