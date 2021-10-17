import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './wallet-operation.reducer';
import { IWalletOperation } from 'app/shared/model/wallet-operation.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IWalletOperationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const WalletOperationDetail = (props: IWalletOperationDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { walletOperationEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ratesApp.walletOperation.detail.title">WalletOperation</Translate> [<b>{walletOperationEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="description">
              <Translate contentKey="ratesApp.walletOperation.description">Description</Translate>
            </span>
          </dt>
          <dd>{walletOperationEntity.description}</dd>
          <dt>
            <span id="amount">
              <Translate contentKey="ratesApp.walletOperation.amount">Amount</Translate>
            </span>
          </dt>
          <dd>{walletOperationEntity.amount}</dd>
          <dt>
            <span id="operation">
              <Translate contentKey="ratesApp.walletOperation.operation">Operation</Translate>
            </span>
          </dt>
          <dd>{walletOperationEntity.operation}</dd>
          <dt>
            <Translate contentKey="ratesApp.walletOperation.wallet">Wallet</Translate>
          </dt>
          <dd>{walletOperationEntity.walletExternalId ? walletOperationEntity.walletExternalId : ''}</dd>
        </dl>
        <Button tag={Link} to="/wallet-operation" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/wallet-operation/${walletOperationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ walletOperation }: IRootState) => ({
  walletOperationEntity: walletOperation.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WalletOperationDetail);
