import './header.scss';

import React from 'react';
import { Translate } from 'react-jhipster';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';

import DashboardHeader from 'app/shared/layout/header/header-dashboard';
import AdminHeader from 'app/shared/layout/header/header-login';
import LogoutHeader from 'app/shared/layout/header/header-logout';

export interface IHeaderProps extends RouteComponentProps<{ id: string }> {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
  currentLocale: string;
  onLocaleChange: Function;
}

const Header = (props: IHeaderProps) => {
  const renderDevRibbon = () =>
    props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">
          <Translate contentKey={`global.ribbon.${props.ribbonEnv}`} />
        </a>
      </div>
    ) : null;

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */
  const adminModule = props.history.location.pathname.split('backoffice').length > 1;
  return (
    <>
      {props.isAuthenticated ? (
        <div id="app-header">
          {renderDevRibbon()}
          <LoadingBar className="loading-bar" />
          {adminModule ? (
            <AdminHeader
              isAuthenticated={props.isAuthenticated}
              isAdmin={props.isAdmin}
              currentLocale={props.currentLocale}
              onLocaleChange={props.onLocaleChange}
              ribbonEnv={props.ribbonEnv}
              isInProduction={props.isInProduction}
              isSwaggerEnabled={props.isSwaggerEnabled}
            />
          ) : (
            <DashboardHeader />
          )}
        </div>
      ) : (
        <LogoutHeader />
      )}
    </>
  );
};

export default withRouter(Header);
