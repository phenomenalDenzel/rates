import React from 'react';
import { Modal, Button, Row, Col } from 'reactstrap';

import ApplicationModal from 'app/modules/explore/paymentModal/payment-modal';

import { renderer } from '../../utils';
import { IRootState } from 'app/shared/reducers';

const initialState: DeepPartial<IRootState> = {
  application: {
    updating: false,
    entity: {
      amount: 4000,
    },
  },
  wallet: {
    entity: {
      balance: 23344,
    },
  },
  authentication: {
    customerAccount: {
      walletId: 2,
    },
  },
};

const props = {
  data: {
    id: 1,
    name: 'my name',
    providerName: 'provider name',
    interestRate: 20,
    tenor: 20,
    effectiveApr: 32,
    denomination: 2000,
    minimumInvestment: 3000,
  },
  showModal: true,
  toggle: jest.fn(),
};
describe('ApplicationModal', () => {
  it('Renders content of the component ', () => {
    const { component } = renderer()
      .withRouter()
      .withRedux(initialState)
      .render(<ApplicationModal {...props} />);

    expect(component.find('.name').text()).toBe('my name');
    expect(component.find('.provider-name').text()).toBe('provider name');
    expect(component.find('.amount').text()).toBe('₦3,000');
    expect(component.find(Row)).toHaveLength(2);
    expect(component.find(Row)).toHaveLength(2);
    expect(component.find(Col)).toHaveLength(2);
    expect(component.find(Modal)).toHaveLength(2);
    expect(component.find('button')).toHaveLength(4);
  });

  it('Should increment or decrement the amount he want and also not', () => {
    const { component } = renderer()
      .withRouter()
      .withRedux(initialState)
      .render(<ApplicationModal {...props} />);

    expect(component.find('.amount').text()).toBe('₦3,000');
    const buttonWrapper = component.find('.amount-action');
    buttonWrapper.at(1).simulate('click');
    buttonWrapper.at(1).simulate('click');
    expect(component.find('.amount').text()).toBe('₦7,000');
    expect(component.find('.amount-action').at(0).prop('disabled')).toBeFalsy();
    buttonWrapper.at(0).simulate('click');
    buttonWrapper.at(0).simulate('click');
    expect(component.find('.amount').text()).toBe('₦3,000');
    expect(component.find('.amount-action').at(0).prop('disabled')).toBeTruthy();
  });
});
