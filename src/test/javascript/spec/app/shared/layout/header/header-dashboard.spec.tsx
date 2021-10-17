import React from 'react';
import { Collapse, NavbarToggler, Nav, NavItem, UncontrolledDropdown, DropdownToggle } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import { Brand } from 'app/shared/layout/header/header-components';
import Header from 'app/shared/layout/header/header-dashboard';
import { renderer } from '../../../utils';
import { IRootState } from 'app/shared/reducers';
import { Route } from 'app/shared/model/enumerations/route.model';

const initialState: DeepPartial<IRootState> = {
  authentication: {
    account: {},
    customerAccount: {
      walletId: 2,
    },
  },
  wallet: {
    entity: {
      balance: 23,
    },
  },
};

describe('Header', () => {
  // All tests will go here
  it('Renders a Header component', () => {
    const { component } = renderer()
      .withRouter()
      .withRedux(initialState)
      .render(<Header />);
    expect(component.find(Brand)).toHaveLength(1);
    expect(component.find(NavbarToggler)).toHaveLength(1);
    expect(component.find(Collapse)).toHaveLength(1);
    expect(component.find(Nav)).toHaveLength(2);
    expect(component.find(NavItem)).toHaveLength(8);
    expect(component.find(NavLink)).toHaveLength(8);
    expect(component.find(UncontrolledDropdown)).toHaveLength(3);
    expect(component.find(DropdownToggle)).toHaveLength(3);
    expect(component.find('.loggedin-user')).toHaveLength(4);
  });
});
