import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Translate } from 'react-jhipster';

import { getEntity } from 'app/entities/wallet/wallet.reducer';
import { getCustomerAccount } from 'app/shared/reducers/authentication';
import { IRootState } from 'app/shared/reducers';
import { formateCurrency } from 'app/shared/util/formate-currency';
import FundWalletModal from 'app/modules/dashboard/fund-wallet/fund-wallet-modal';
import { setPortifolioModal } from 'app/entities/application/application.reducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './total-fund.scss';

interface IFundWalletProps {
  hideFundBtn: boolean;
  portifolioWallet?: boolean;
}

const FundWalletAmount = (props: IFundWalletProps) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const select = useSelector((state: IRootState) => {
    return {
      balance: state.wallet.entity.balance,
      account: state.authentication.customerAccount,
    };
  });

  const toggleModal = () => {
    setModal(!modal);
  };

  const topupFund = () => {
    dispatch(setPortifolioModal(false));
    setModal(true);
  };
  useEffect(() => {
    dispatch(getCustomerAccount());
  }, []);

  useEffect(() => {
    if (select.account) {
      const walletId = select.account && select.account.walletId;
      dispatch(getEntity(walletId));
    }
  }, [select.account]);

  return (
    <>
      {!props.portifolioWallet ? (
        <div className="wallet-box">
          <div className="balance-info">
            <div className="balance">
              <Translate contentKey="dashboard.portifolio.balance">Balance</Translate>
            </div>
            <div className="amount">{select.balance}</div>
          </div>
          {!props.hideFundBtn && (
            <div className="fund-wallet">
              <button className="btn btn-sm pad-5" onClick={toggleModal}>
                <span className="d-none d-md-block">
                  <Translate contentKey="dashboard.portifolio.fund">Add</Translate>
                </span>
                <span className="d-sm-block d-md-none">
                  <FontAwesomeIcon icon="plus" fixedWidth />
                </span>
              </button>
            </div>
          )}
        </div>
      ) : (
          <div className="topup-fund">
            <div className="topup-detail">
              <span className="wallet-balance">
                <Translate contentKey="dashboard.portifolio.balance">balance</Translate>
              </span>
              <span className="fund-balance">{select.balance}</span>
            </div>
            <div className="add-fund cursor" onClick={topupFund}>
              <Translate contentKey="dashboard.portifolio.add">Add</Translate>
            </div>
          </div>
        )}
      <FundWalletModal showModal={modal} toggle={toggleModal} />
    </>
  );
};
FundWalletAmount.defaultProps = {
  hideFundBtn: false,
};

export default FundWalletAmount;
