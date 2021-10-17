import React from 'react';
import { Translate } from 'react-jhipster';

import { NavItem, NavLink, UncontrolledDropdown, NavbarBrand, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Route } from 'app/shared/model/enumerations/route.model';

import appConfig from 'app/config/constants';
import './header.scss';

export const BrandIcon = props => <img src="content/images/rates.svg" alt="Logo" />;

interface IBrand {
  isAuthenticated?: boolean;
}
export const Brand = ({ isAuthenticated }: IBrand) => (
  <NavbarBrand tag={Link} to={isAuthenticated ? Route.DASHBOARD : Route.INDEX} className="brand-nav">
    <BrandIcon />
    <span className="pl-1 brand-text">
      <Translate contentKey="global.logolabel">rates.ng</Translate>
    </span>
  </NavbarBrand>
);

export const Home = () => (
  <NavItem>
    <NavLink tag={Link} to={Route.DASHBOARD} className="d-flex align-items-center">
      <FontAwesomeIcon icon="home" />
      <span>
        <Translate contentKey="global.menu.home">Home</Translate>
      </span>
    </NavLink>
  </NavItem>
);

interface INavMenuLink {
  to?: Route;
  contentKey?: string;
  label?: string;
  className?: string;
}
export const NavMenuLink = (props: INavMenuLink) => {
  const { to, contentKey, label, className } = props;
  return (
    <NavItem className="nav-item-menu">
      <Link to={to} className={`${className}`} activeClassName="is-active">
        <Translate contentKey={contentKey}>{label}</Translate>
      </Link>
    </NavItem>
  );
};

export const ProfileDropdown = props => {
  return (
    <>
      <DropdownToggle nav caret className={`pr-0`}>
        <span className="p-0 smd-hide">{props.userAccount}</span>
        <span className={`user-circle ${props.className}`}>
          <FontAwesomeIcon icon="user" fixedWidth />
        </span>
      </DropdownToggle>

      <DropdownMenu className="mini-user-profile" right>
        <span className="d-semi-lg">
          <DropdownItem className="menu-icon">{props.userAccount}</DropdownItem>
        </span>
        <DropdownItem tag={Link} to={Route.USER_PROFILE}>
          <div className="menu-icon">
            <Translate contentKey="global.user.profile">User Profile</Translate>
            <FontAwesomeIcon icon="user" fixedWidth />
          </div>
        </DropdownItem>
        <DropdownItem tag={Link} to={Route.LOGOUT}>
          <div className="menu-icon">
            <Translate contentKey="global.menu.account.logout">Sign out</Translate>
            <FontAwesomeIcon icon="sign-out-alt" fixedWidth />
          </div>
        </DropdownItem>
      </DropdownMenu>
    </>
  );
};
