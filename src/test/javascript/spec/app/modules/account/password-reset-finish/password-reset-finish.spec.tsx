import * as React from 'react';

import PasswordResetFinishPage from 'app/modules/account/password-reset/finish/password-reset-finish';
import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { Route } from 'app/shared/model/enumerations/route.model';
import { renderer } from '../../../utils';
import { IRootState } from 'app/shared/reducers';

const initialState: DeepPartial<IRootState> = {
  authentication: {
    isAuthenticated: false,
  },
  passwordReset: {
    resetPasswordSuccess: true,
    loading: false,
  },
};

jest.mock('react-jhipster', () => ({
  ...jest.requireActual('react-jhipster'),
  getUrlParameter: jest.fn(),
}));

describe('PasswordResetFinishPage', () => {
  const _props = {
    history: {
      push: jest.fn(),
    },
    location: {
      search: jest.fn(),
    },
  };

  it('Should renders Reset form with new paswword and confirm password fields ', () => {
    const { component } = renderer()
      .withRouter()
      .withRedux(initialState)
      .render(<PasswordResetFinishPage {..._props} />);
    expect(component.find('Container')).toHaveLength(1);
    expect(component.find('AvForm')).toHaveLength(1);
    expect(component.find('AvField')).toHaveLength(2);
    expect(component.find(PasswordStrengthBar)).toHaveLength(1);
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
      })
    );
    expect(component.find('Button')).toHaveLength(1);
    expect(_props.history.push).toBeCalledWith(Route.LOGIN);
  });
});
