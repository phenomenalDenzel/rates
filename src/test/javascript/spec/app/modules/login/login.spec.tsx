import * as React from 'react';

import Login from 'app/modules/login/login';
import { LoginType } from 'app/shared/model/enumerations/login-type.model';
import { Route } from 'app/shared/model/enumerations/route.model';
import { renderer } from '../../utils';
import { IRootState } from 'app/shared/reducers';
import { createMemoryHistory, History } from 'history';

const initialState: DeepPartial<IRootState> = {
  authentication: {
    isAuthenticated: true,
    authNavType: LoginType.LOGIN,
    loading: false
  },
  register: {
    userRecord: {}
  }
};

describe('Login', () => {
  it('Should renders Register with email, username and password for registration ', () => {
    const { component } = renderer()
      .withRouter()
      .withRedux(initialState)
      .render(<Login/>);
    component.find('.register').simulate('click');
    expect(component.find('AvField')).toHaveLength(2);
    expect(component.find('AvField[name="email"]')).toHaveLength(1);
    expect(component.find('AvField[name="password"]')).toHaveLength(1);
    expect(
      component.find('AvField[name="email"]').forEach(node => {
        expect(node.find('AvField[name]')).toBeDefined();
        expect(node.find('AvField[placeholder]')).toBeDefined();
        expect(node.find('AvField[onChange]')).toBeDefined();
        expect(node.find('AvField[errorMessage]')).toBeDefined();
        expect(node.find('AvField[validate]')).toBeDefined();
      })
    );
    expect(component.find('Button')).toHaveLength(1);
  });

  it('Should renders Login with email and password for login ', () => {
    const { component } = renderer()
      .withRouter()
      .withRedux(initialState)
      .render(<Login/>);
    expect(component.find('AvField')).toHaveLength(2);
    expect(component.find('AvField[name="email"]')).toHaveLength(1);
    expect(component.find('AvField[name="password"]')).toHaveLength(1);
    expect(
      component.find('AvField').forEach(node => {
        expect(node.find('AvField[name]')).toBeDefined();
        expect(node.find('AvField[placeholder]')).toBeDefined();
        expect(node.find('AvField[onChange]')).toBeDefined();
        expect(node.find('AvField[validate]')).toBeDefined();
      })
    );
    expect(component.find('Button')).toHaveLength(1);
  });

  it('Should navigate to reset password page', () => {
    const history = createMemoryHistory();
    const { component } = renderer()
      .withRouter(history)
      .withRedux(initialState)
      .render(<Login/>);
    component.find('.siginup-you').find('span').at(1).simulate('click');
    expect(history.entries.map(_ => _.pathname)).toContain(Route.RESET_INIT);
  });
});
