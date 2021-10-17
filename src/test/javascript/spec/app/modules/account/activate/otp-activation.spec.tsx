import React from 'react';
import { Container, Col, Row, Button } from 'reactstrap';

import OtpActivation from 'app/modules/account/activate/otp-activation.tsx';
import { IRootState } from 'app/shared/reducers';
import { renderer } from '../../../utils';
import OtpInput from 'react-otp-input';

const initialState: DeepPartial<IRootState> = {
  authentication: {
    isAuthenticated: false,
  },
  activate: {
    updating: false,
    otpResponse: false,
  },
};

describe('OtpActivation', () => {
  it('should render content', () => {
    const props = {
      history: {
        push: jest.fn(),
      },
    };
    const { component } = renderer()
      .withRouter()
      .withRedux(initialState)
      .render(<OtpActivation {...props} />);
    expect(component.find(Row)).toHaveLength(1);
    expect(component.find(Col)).toHaveLength(1);
    expect(component.find(Button)).toHaveLength(1);
    expect(component.find(OtpInput)).toHaveLength(1);
    expect(component.find('.submit-btn').at(0).prop('onClick')).toBeDefined();
    expect(component.find('.resend-link').prop('onClick')).toBeDefined();
  });
});
