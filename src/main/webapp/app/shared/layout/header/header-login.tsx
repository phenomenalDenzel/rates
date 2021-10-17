import React, { useState } from 'react';
import { Translate, Storage } from 'react-jhipster';
import { Navbar, Nav, NavbarToggler, Collapse } from 'reactstrap';
import { Home, Brand } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu, LocaleMenu } from '../menus';
import './header.scss';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
  currentLocale: string;
  onLocaleChange: Function;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLocaleChange = event => {
    const langKey = event.target.value;
    Storage.session.set('locale', langKey);
    props.onLocaleChange(langKey);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  return (
    <Navbar dark expand="sm" fixed="top" className="bg-primary pb-3 pt-3">
      <NavbarToggler aria-label="Menu" onClick={toggleMenu} />
      <Brand />
      <Collapse isOpen={menuOpen} navbar>
        <Nav id="header-tabs" className="ml-auto" navbar>
          <Home />
          {props.isAuthenticated && <EntitiesMenu />}
          {props.isAuthenticated && props.isAdmin && (
            <AdminMenu showSwagger={props.isSwaggerEnabled} showDatabase={!props.isInProduction} />
          )}
          <LocaleMenu currentLocale={props.currentLocale} onClick={handleLocaleChange} />
          <AccountMenu isAuthenticated={props.isAuthenticated} />
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
