import React, { useState, useEffect } from 'react';
import {
  Collapse,
  Navbar,
  DropdownMenu,
  DropdownItem,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
} from 'reactstrap';
import { useSelector } from 'react-redux';
import { Translate } from 'react-jhipster';
import { AnimateLeft } from 'app/shared/util/constant';

import { Brand, NavMenuLink, ProfileDropdown } from './header-components';
import FundWalletAmount from 'app/modules/dashboard/fund-wallet/total-fund-wallet';
import { IRootState } from 'app/shared/reducers';
import { Route } from 'app/shared/model/enumerations/route.model';

import './header.scss';

const Header = () => {
  const account = useSelector((state: IRootState) => state.authentication.account);
  const isAuthenticated = useSelector((state: IRootState) => state.authentication.isAuthenticated);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const userAccount = (
    <div className="loggedin-user">
      <div className="signed-as">
        <Translate contentKey="header.signed.in.as">Signed in as</Translate>
      </div>
      <div className="user-name">
        {account.lastName} {account.firstName}
      </div>
    </div>
  );

  return (
    <Navbar color="light" light expand="md" fixed="top" className="container-content d-flex pt-3 pb-3">
      <div className="mobile-layout">
        <div className="d-flex">
          <NavbarToggler aria-label="Menu" onClick={toggleMenu} />
          <Brand isAuthenticated={isAuthenticated} />
        </div>
        <div className="sm-profile">
          <NavItem className="mr-0">
            <FundWalletAmount />
          </NavItem>
          <UncontrolledDropdown inNavbar right>
            <ProfileDropdown userAccount={userAccount} className="d-semi-lg" />
          </UncontrolledDropdown>
        </div>
      </div>
      <Collapse isOpen={menuOpen} className={`dashboard-navbar ${window.innerWidth < 768 && AnimateLeft()}`} navbar>
        <Nav className="d-flex justify-content-around">
          <NavMenuLink to={Route.DASHBOARD} contentKey="header.link.dashboard" label="Dashboard" />
          <NavMenuLink to={Route.EXPLORE} contentKey="header.link.explore" label="Explore" />
          <NavMenuLink to={Route.LEARN} contentKey="header.link.learn" label="Learn" />
        </Nav>
        <Nav className="d-flex justify-content-between">
          <NavItem tag="span" className="d-none d-md-flex align-items-center">
            <FundWalletAmount />
          </NavItem>

          <NavItem tag="span" className="notification-icon">
            <img src="content/images/bell.svg" alt="rates" />
          </NavItem>
          <NavItem tag="span" className="mr-2">
            <UncontrolledDropdown className="d-none d-md-block">
              <ProfileDropdown userAccount={userAccount} className="d-semi-lg" />
            </UncontrolledDropdown>
          </NavItem>
          <NavItem tag="span" className="mr-0 d-none d-md-flex align-items-center">
            <UncontrolledDropdown tag="div" className="d-sm-block d-none">
              <DropdownToggle tag="div" caret className="lang-btn">
                <Translate contentKey="header.language">En</Translate>
              </DropdownToggle>
            </UncontrolledDropdown>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
