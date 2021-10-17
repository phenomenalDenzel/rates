import React from 'react';
import { Link } from 'react-router-dom';
import { Brand } from 'app/shared/layout/header/header-components';
import Header from 'app/shared/layout/header/header-logout';
import { renderer } from '../../../utils';

describe('Header', () => {
  it('Renders a Header component', () => {
    const { component } = renderer()
      .withRouter()
      .render(<Header />);
    expect(component.find(Brand)).toHaveLength(1);
    expect(component.find(Link)).toHaveLength(3);
  });
});
