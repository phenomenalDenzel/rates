import * as React from 'react';

import ChangePassword from 'app/modules/user-profile/change-password/change-password';
import { Route } from 'app/shared/model/enumerations/route.model';
import { renderer } from '../../../utils';
import { IRootState } from 'app/shared/reducers';

const initialState: DeepPartial<IRootState> = {
  password: {
    loading: false,
  },
  authentication: {
    isAuthenticated: false,
  },
  passwordReset: {
    resetPasswordSuccess: true,
    loading: false,
  },
};

describe('PasswordResetFinishPage', () => {
  it('Should renders Reset form with new paswword and confirm password fields ', () => {
    const { component } = renderer()
      .withRouter()
      .withRedux(initialState)
      .render(<ChangePassword />);
    expect(component.find('AvForm')).toHaveLength(1);
    expect(component.find('AvField')).toHaveLength(3);
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
  });
});
