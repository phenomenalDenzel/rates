import React, { useState as useStateMock } from 'react';
import DocVerification from 'app/modules/account/register/doc-verification-form';
import { IRootState } from 'app/shared/reducers';
import { renderer } from '../../../utils';
import { Button } from 'reactstrap';

const initialState: DeepPartial<IRootState> = {
  register: {
    userRecord: {
      bankAccountNumber: '1234567890',
      bankName: 'Rate.ng',
      accountVerifications: [],
    },
  },
  verification: {
    entity: {},
  },
};

describe('DocVerification', () => {
  const loginProps = {
    setStep: jest.fn(),
  };

  it('Renders form with documents to upload ', () => {
    const { component } = renderer()
      .withRedux(initialState)
      .render(<DocVerification {...loginProps} />);
    expect(component.find('img')).toHaveLength(3);
    expect(component.find('label')).toHaveLength(5);
    expect(component.find('input[type="file"]')).toHaveLength(3);
    expect(component.find(Button)).toHaveLength(1);
  });

  it('Renders error when submit without uploading documents ', () => {
    const { component } = renderer()
      .withRedux(initialState)
      .render(<DocVerification {...loginProps} />);
    expect(component.find('.invalid-message')).toHaveLength(0);
    expect(component.find(Button)).toHaveLength(1);
    component.find(Button).simulate('click');
    expect(component.find('.invalid-message')).toHaveLength(2);

    expect(component.find('.invalid-message')).toHaveLength(2);
    expect(component.find('input')).toHaveLength(3);
  });
});
