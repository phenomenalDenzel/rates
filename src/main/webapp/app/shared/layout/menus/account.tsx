import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';
import { Route } from 'app/shared/model/enumerations/route.model';

const accountMenuItemsAuthenticated = (
  <>
    <MenuItem icon="wrench" to={`${Route.BACKOFFICE}/account/settings`}>
      <Translate contentKey="global.menu.account.settings">Settings</Translate>
    </MenuItem>
    <MenuItem icon="lock" to={`${Route.BACKOFFICE}/account/password`}>
      <Translate contentKey="global.menu.account.password">Password</Translate>
    </MenuItem>
    <MenuItem icon="cloud" to={`${Route.BACKOFFICE}/account/sessions`}>
      <Translate contentKey="global.menu.account.sessions">Sessions</Translate>
    </MenuItem>
    <MenuItem icon="sign-out-alt" to={Route.LOGOUT}>
      <Translate contentKey="global.menu.account.logout">Sign out</Translate>
    </MenuItem>
  </>
);

const accountMenuItems = (
  <>
    <MenuItem id="login-item" icon="sign-in-alt" to={Route.LOGIN}>
      <Translate contentKey="global.menu.account.login">Sign in</Translate>
    </MenuItem>
    <MenuItem icon="sign-in-alt" to={`${Route.BACKOFFICE}/account/register/customer`}>
      <Translate contentKey="global.menu.account.register">Register</Translate>
    </MenuItem>
  </>
);

export const AccountMenu = ({ isAuthenticated = false }) => (
  <NavDropdown icon="user" name={translate('global.menu.account.main')} id="account-menu">
    {isAuthenticated ? accountMenuItemsAuthenticated : accountMenuItems}
  </NavDropdown>
);

export default AccountMenu;
