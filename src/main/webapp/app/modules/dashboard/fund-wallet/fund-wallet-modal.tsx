import React from 'react';
import { Translate, translate } from 'react-jhipster';
import { Container, Modal, ModalHeader, ModalBody, ModalFooter, Label, Alert, Row, Col } from 'reactstrap';
import FundWalletAmount from 'app/modules/dashboard/fund-wallet/total-fund-wallet';

import './fund-wallet.scss';

interface IFundWalletProps {
  showModal: boolean;
  toggle: Function;
}

const FundWalletModal = (props: IFundWalletProps) => {
  const { toggle, showModal } = props;
  return (
    <Modal
      isOpen={showModal}
      toggle={toggle}
      backdrop={true}
      centered={true}
      id="login-page"
      unmountOnClose={false}
      returnFocusAfterClose={false}
      autoFocus={false}
    >
      <Container className="wallet-content">
        <Row>
          <Col className="fund-wallet-label pb-4">
            <Translate contentKey="dashboard.modal.fund.wallet">Fund Wallet</Translate>
          </Col>
          <Col sm={{ size: 'auto' }} md={{ size: 'auto' }}>
            <FundWalletAmount hideFundBtn={true} portifolioWallet={false} />
          </Col>
        </Row>
        <Row>
          <Col>
            <span className="debit-card">
              <Translate contentKey="dashboard.modal.debit.card">Debit Card</Translate>
            </span>
            <div className="add-debt-card">
              <span className="pr-3">
                <Translate contentKey="dashboard.modal.plus">+</Translate>
              </span>
              <Translate contentKey="dashboard.modal.add.card">Add debit card</Translate>
            </div>
            <span className="or">
              <Translate contentKey="dashboard.modal.or">OR</Translate>
            </span>
            <span className="bank-transfer">
              <Translate contentKey="dashboard.modal.bank.transfer">Bank Transfer</Translate>
            </span>
            <span className="account-info">
              <Translate contentKey="dashboard.modal.account.info">The account provided is the unique RATES.NG account</Translate>
            </span>
            <Row>
              <Col sm={{ size: 'auto' }} md={{ size: 'auto' }}>
                <span className="account-details">
                  <Translate contentKey="dashboard.modal.bank.name">Bank Name</Translate>
                </span>
                <span className="account-value">Wema Bank</span>
              </Col>
              <Col>
                <span className="account-details">
                  <Translate contentKey="dashboard.modal.account.number">Bank Account number</Translate>
                </span>
                <span className="account-value">65432345678</span>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Modal>
  );
};

export default FundWalletModal;
