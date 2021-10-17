import React from 'react';

import FundWalletAmount from 'app/modules/dashboard/fund-wallet/total-fund-wallet.tsx';
import FundWalletModal from 'app/modules/dashboard/fund-wallet/fund-wallet-modal';
import { renderer } from '../../../utils';
import { IRootState } from 'app/shared/reducers';

const initialState: DeepPartial<IRootState> = {
  wallet: {
    entity: {
      balance: 30000,
    },
  },
  authentication: {
    customerAccount: {
      walletId: 2,
    },
  },
};

describe('FundWalletAmount', () => {
  it('Renders its content ', () => {
    const props = {
      portifolioWallet: false,
      hideFundBtn: false,
    };
    const { component } = renderer()
      .withRouter()
      .withRedux(initialState)
      .render(<FundWalletAmount {...props} />);
    expect(component.find('.amount').text()).toBe('30000');
    expect(component.find('button')).toHaveLength(1);
    expect(component.find(FundWalletModal)).toHaveLength(1);
    expect(component.find(FundWalletModal).props()).toEqual({
      showModal: expect.any(Boolean),
      toggle: expect.any(Function),
    });
  });
});
