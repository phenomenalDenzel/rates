import React from 'react';
import { Container, Modal, Row, Col } from 'reactstrap';

import FundWalletModal from 'app/modules/dashboard/fund-wallet/fund-wallet-modal';
import FundWalletAmount from 'app/modules/dashboard/fund-wallet/total-fund-wallet';
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

describe('FundWalletModal', () => {
  it('Renders its content ', () => {
    const props = {
      showModal: true,
      toggle: jest.fn(),
    };
    const { component } = renderer()
      .withRouter()
      .withRedux(initialState)
      .render(<FundWalletModal {...props} />);
    expect(component.find(Modal)).toHaveLength(2);
    expect(component.find(Container)).toHaveLength(1);
    expect(component.find(Row)).toHaveLength(3);
    expect(component.find(Col)).toHaveLength(5);
    expect(component.find(FundWalletAmount).props()).toEqual({
      hideFundBtn: expect.any(Boolean),
      portifolioWallet: expect.any(Boolean),
    });
  });
});
