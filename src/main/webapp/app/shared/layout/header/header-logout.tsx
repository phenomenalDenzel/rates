import React from 'react';
import { Navbar, Nav } from 'reactstrap';
import { Brand, NavMenuLink } from 'app/shared/layout/header/header-components';

import { Route } from 'app/shared/model/enumerations/route.model';
import './header.scss';

const Header = () => {
  return (
    <Navbar color="light" className="navbar-style border-0 pt-3 pb-3" light expand="md" fixed="top">
      <div className="container-content logout-header">
        <Brand />
        <Nav>
          <NavMenuLink to={Route.INDEX} className="pr-2 logout-about" contentKey="header.about" label="About" />
          <NavMenuLink to={Route.LOGIN} className="logout-item" contentKey="header.login.register" label="Log in/Register" />
        </Nav>
      </div>
    </Navbar>
  );
};

export default Header;
