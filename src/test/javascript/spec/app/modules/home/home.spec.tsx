import * as React from 'react';

import Home from 'app/modules/home/home';
import { renderer } from '../../utils';
import { IRootState } from 'app/shared/reducers';
import Header from 'app/shared/layout/header/header-logout';
import Sponsors from 'app/modules/sponsors/sponsors';
import Benefits from 'app/modules/benefits/benefits';
import HowItWork from 'app/modules/how-it-work/how-it-work';
import Manage from 'app/modules/manage/manage';
import Footer from 'app/shared/layout/footer/footer';

const initialState = (auth = true) => {
  return {
    authentication: {
      isAuthenticated: auth,
    },
    register: {
      userRecord: {},
    },
  };
};

describe('Home', () => {
  const loginProps = {
    history: {
      push: jest.fn(),
    },
  };

  it('Should renders its content for logged in user', () => {
    const { component } = renderer()
      .withRouter()
      .withRedux(initialState(true))
      .render(<Home {...loginProps} />);
    expect(component.find(Header)).toHaveLength(0);
    expect(component.find(Sponsors)).toHaveLength(1);
    expect(component.find(HowItWork)).toHaveLength(1);
    expect(component.find(Benefits)).toHaveLength(1);
    expect(component.find(Manage)).toHaveLength(1);
    expect(component.find(Footer)).toHaveLength(1);
    expect(component.find('img')).toHaveLength(20);
    expect(component.find('button')).toHaveLength(1);
  });

  it('Should renders its content for logged out user', () => {
    const { component } = renderer()
      .withRouter()
      .withRedux(initialState(false))
      .render(<Home {...loginProps} />);
    expect(component.find(Sponsors)).toHaveLength(1);
    expect(component.find(HowItWork)).toHaveLength(1);
    expect(component.find(Benefits)).toHaveLength(1);
    expect(component.find(Manage)).toHaveLength(1);
    expect(component.find(Footer)).toHaveLength(1);
    expect(component.find('button')).toHaveLength(3);
  });
});
