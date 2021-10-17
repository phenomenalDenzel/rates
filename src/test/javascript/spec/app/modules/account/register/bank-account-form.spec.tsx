import React from 'react';
import BankAccountForm from 'app/modules/account/register/bank-account-form.tsx';
import { IRootState } from 'app/shared/reducers';
import { renderer } from '../../../utils';

const initialState: DeepPartial<IRootState> = {
  register: {
    userRecord: {
      bankAccountNumber: '1234567890',
      bankName: 'Rate.ng',
    },
  },
};

describe('BankAccountForm', () => {
  it('should render form with bank account information from redux', () => {
    const step = jest.fn();
    const { component } = renderer()
      .withRedux(initialState)
      .render(<BankAccountForm setStep={step} />);
    expect(component.find('AvField')).toHaveLength(2);
    expect(component.find('input[name="bankAccountNumber"]').prop('value')).toEqual('1234567890');
    expect(component.find('input[name="bankName"]').prop('value')).toEqual('Rate.ng');
  });

  it('should skip and continue to next step', () => {
    const step = jest.fn();
    const { component } = renderer()
      .withRedux(initialState)
      .render(<BankAccountForm setStep={step} />);
    expect(component.find('AvField')).toHaveLength(2);
    component.find('input[name="bankAccountNumber"]').simulate('change', {
      target: {
        name: 'bankAccountNumber',
        value: '0987654321',
      },
    });
    component.find('input[name="bankName"]').simulate('change', {
      target: {
        name: 'bankName',
        value: 'Updated Name',
      },
    });
    component.find('#skipBtn').simulate('click');
    expect(step).toHaveBeenCalled();
  });
});
