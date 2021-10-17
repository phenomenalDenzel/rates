import React, { useEffect, useState } from 'react';
import { Translate, translate } from 'react-jhipster';
import { Modal, Button, Row, Col } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';

import { getEntity } from 'app/entities/wallet/wallet.reducer';
import { IOpportunity } from 'app/shared/model/opportunity.model';
import { customerApplication, setPortifolioModal } from 'app/entities/application/application.reducer';
import { IRootState } from 'app/shared/reducers';
import Loader from 'app/shared/util/loader';
import { formateCurrency } from 'app/shared/util/formate-currency';
import { Route } from 'app/shared/model/enumerations/route.model';
import FundWalletAmount from 'app/modules/dashboard/fund-wallet/total-fund-wallet';

import './payment-modal.scss';

export interface IPaymentProps extends RouteComponentProps<{}> {
  showModal: boolean;
  toggle: Function;
  data: IOpportunity;
}

const ApplicationModal = (props: IPaymentProps) => {
  const [modal, setModal] = useState<boolean>(false);
  const [lastModalStatus, setLastModalStatus] = useState<boolean>(true);
  const [amount, setAmount] = useState<number>(0);
  const { toggle, showModal, data } = props;
  const dispatch = useDispatch();
  const select = useSelector((state: IRootState) => {
    return {
      updating: state.application.updating,
      modalStatus: state.application.modalStatus,
      entity: state.application.entity,
      account: state.authentication.customerAccount,
    };
  });

  const { effectiveApr, minimumInvestment, name, providerName, denomination } = data;

  const apply = () => {
    const payload = {
      amount,
      opportunityId: data.id,
    };
    dispatch(customerApplication(payload));
  };
  const confirmPayment = () => {
    Swal.fire({
      title: `${translate('explore.confirm.payment')} ${props.data.name}`,
      text: `${translate('explore.currency')}${amount} ${translate('explore.wallet.balance')}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: translate('explore.proceed'),
      cancelButtonText: translate('explore.cancel')
    })
      .then((confirm) => {
        confirm.value && apply();
      });
  }
  useEffect(() => {
    if (!select.updating && select.entity && select.entity.amount) {
      const walletId = select.account && select.account.walletId;
      dispatch(getEntity(walletId));
      props.history.push(Route.DASHBOARD);
    }
  }, [select.updating]);

  useEffect(() => {
    setAmount(minimumInvestment);
  }, [effectiveApr]);

  useEffect(() => {
    setModal(select.modalStatus);
    return;
  }, [select.modalStatus]);

  useEffect(() => {
    setModal(showModal);
  }, [showModal]);

  const increase = () => {
    const value = amount + denomination;
    setAmount(value);
  };

  const decrease = () => {
    const value = amount - denomination;
    if (value >= minimumInvestment) {
      setAmount(value);
    }
  };

  const noDecrement = minimumInvestment > amount - denomination;
  return (
    <Modal
      isOpen={modal}
      toggle={toggle}
      backdrop={true}
      centered="true"
      id="payment-page"
      unmountOnClose={false}
      returnFocusAfterClose={false}
      autoFocus={false}
    >
      <div className="application-modal">
        <Row>
          <Col className="application-account">
            <div className="modal-profile">
              <img src="content/images/opportunity.svg" />
              <div className="details">
                <div className="name">{name}</div>
                <div className="provider-name">{providerName}</div>
              </div>
            </div>
            <FundWalletAmount portifolioWallet={true} />
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="select-amount">
              <Translate contentKey="explore.select.amount">select amount</Translate>
            </div>
            <div className="amount-content">
              <div>
                <button className={`amount-action ${noDecrement ? 'no-cursor' : 'cursor'}`} onClick={decrease} disabled={noDecrement}>
                  <Translate contentKey="explore.minus.sign">-</Translate>
                </button>
              </div>
              <span className="amount">{formateCurrency(amount)}</span>
              <div>
                <button className="amount-action cursor" onClick={increase}>
                  <Translate contentKey="explore.add.sign">+</Translate>
                </button>
              </div>
            </div>
            <div className="instruction">
              The minimum amount is {formateCurrency(minimumInvestment)}, with increment of {formateCurrency(denomination)}
            </div>
            <div className="btn-content">
              <Button className="btn back-btn success-button" onClick={toggle}>
                <Translate contentKey="explore.back">Back</Translate>
              </Button>
              <Button className="btn checkout-btn success-button" disabled={minimumInvestment > amount} onClick={confirmPayment}>
                {!select.updating ? <Translate contentKey="explore.checkout">Checkout</Translate> : <Loader />}
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default withRouter(ApplicationModal);
