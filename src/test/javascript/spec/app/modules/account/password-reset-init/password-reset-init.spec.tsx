import * as React from 'react';
import { createMemoryHistory, createLocation } from 'history';
import { match } from 'react-router';

import { renderer } from '../../../utils';
import PasswordResetInit from 'app/modules/account/password-reset/init/password-reset-init';
import { Route } from 'app/shared/model/enumerations/route.model';
import { IRootState } from 'app/shared/reducers';

const history = createMemoryHistory();
const path = `/route/:id`;

const routeMatch: match<{ id: string }> = {
  isExact: false,
  path,
  url: path.replace(':id', '1'),
  params: { id: '1' },
};

const location = createLocation(routeMatch.url);

const initialState: DeepPartial<IRootState> = {
  passwordReset: {
    loading: false,
    resetPasswordSuccess: false,
    resetPasswordFailure: false,
  },
  authentication: {
    isAuthenticated: false,
  },
};

describe('PasswordResetFinishPage', () => {
  const _props = {
    history: {
      push: jest.fn(),
    },
    location,
    match: routeMatch,
    staticContext: jest.fn(),
  };

  it('Should renders Reset form with new password and confirm password fields ', () => {
    const { component } = renderer()
      .withRouter()
      .withRedux(initialState)
      .render(<PasswordResetInit {..._props} />);
    expect(component.find('Container')).toHaveLength(1);
    expect(component.find('AvForm')).toHaveLength(1);
    expect(component.find('AvField')).toHaveLength(1);
    expect(
      component.find('AvForm').forEach(node => {
        expect(node.find('AvForm[onValidSubmit]')).toBeDefined();
      })
    );
    expect(
      component.find('AvField').forEach(node => {
        expect(node.find('AvField[name]')).toBeDefined();
        expect(node.find('AvField[placeholder]')).toBeDefined();
        expect(node.find('AvField[type]')).toBeDefined();
        expect(node.find('AvField[validate]')).toBeDefined();
        expect(node.find('AvField[onChange]')).toBeDefined();
      })
    );
    expect(component.find('Button')).toHaveLength(1);
  });

  it('Should navigate to login page', () => {
    const { component } = renderer()
      .withRouter()
      .withRedux(initialState)
      .render(<PasswordResetInit {..._props} />);
    component.find('.sub-title-2').find('span').at(0).simulate('click');
    expect(_props.history.push).toBeCalledWith(Route.LOGIN);
  });
});
