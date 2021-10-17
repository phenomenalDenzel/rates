import React from 'react';

import sinon from 'sinon';
import { Navbar, Nav } from 'reactstrap';

import { Home, Brand } from 'app/shared/layout/header/header-components';
import { AdminMenu, EntitiesMenu, AccountMenu, LocaleMenu } from 'app/shared/layout/menus';
import Header from 'app/shared/layout/header/header-login';
import { renderer } from '../../../utils';
import { IRootState } from 'app/shared/reducers';

const initialState: DeepPartial<IRootState> = {
  wallet: {
    entity: {
      balance: 30000,
    },
  },
  authentication: {
    customerAccount: {
      walletId: 2,
    },
    account: {},
  },
};

describe('Header', () => {
  const localeSpy = sinon.spy();

  const devProps = {
    isAuthenticated: true,
    isAdmin: true,
    currentLocale: 'en',
    onLocaleChange: localeSpy,
    ribbonEnv: 'dev',
    isInProduction: false,
    isSwaggerEnabled: true,
  };
  const prodProps = {
    ...devProps,
    ribbonEnv: 'prod',
    isInProduction: true,
    isSwaggerEnabled: false,
  };
  const userProps = {
    ...prodProps,
    isAdmin: false,
  };
  const guestProps = {
    ...prodProps,
    isAdmin: false,
    isAuthenticated: true,
  };
  // All tests will go here
  it('Renders a Header component in dev profile with LoadingBar, Navbar, Nav and dev ribbon.', () => {
    const { component } = renderer()
      .withRouter()
      .withRedux(initialState)
      .render(<Header {...devProps} />);
    const navbar = component.find(Navbar);
    expect(navbar.length).toEqual(1);
    expect(navbar.find(Brand).length).toEqual(1);
    const nav = component.find(Nav);
    expect(nav.length).toEqual(1);
    expect(nav.find(Home).length).toEqual(1);
    expect(nav.find(AdminMenu).length).toEqual(1);
    expect(nav.find(EntitiesMenu).length).toEqual(1);
    expect(nav.find(LocaleMenu).length).toEqual(1);

    expect(nav.find(AccountMenu).length).toEqual(1);
  });

  it('Renders a Header component in prod profile with LoadingBar, Navbar, Nav.', () => {
    const { component } = renderer()
      .withRouter()
      .withRedux(initialState)
      .render(<Header {...prodProps} />);
    const navbar = component.find(Navbar);
    expect(navbar.length).toEqual(1);
    expect(navbar.find(Brand).length).toEqual(1);
    const nav = component.find(Nav);
    expect(nav.length).toEqual(1);
    expect(nav.find(Home).length).toEqual(1);
    expect(nav.find(AdminMenu).length).toEqual(1);
    expect(nav.find(EntitiesMenu).length).toEqual(1);
    expect(nav.find(LocaleMenu).length).toEqual(1);
    expect(nav.find(AccountMenu).length).toEqual(1);
    const ribbon = component.find('.ribbon.dev');
    expect(ribbon.length).toEqual(0);
  });

  it('Renders a Header component in prod profile with logged in User', () => {
    const { component } = renderer()
      .withRouter()
      .withRedux(initialState)
      .render(<Header {...userProps} />);
    const nav = component.find(Nav);
    expect(nav.find(AdminMenu).length).toEqual(0);
    expect(nav.find(EntitiesMenu).length).toEqual(1);
    const account = nav.find(AccountMenu);
    expect(account.first().props().isAuthenticated).toEqual(true);
  });

  it('Renders a Header component in prod profile with no logged in User', () => {
    const { component } = renderer()
      .withRouter()
      .withRedux(initialState)
      .render(<Header {...guestProps} />);
    const nav = component.find(Nav);
    expect(nav.find(AdminMenu).length).toEqual(0);
    expect(nav.find(EntitiesMenu).length).toEqual(1);
    const account = nav.find(AccountMenu);
    expect(account.length).toEqual(1);
  });
});
