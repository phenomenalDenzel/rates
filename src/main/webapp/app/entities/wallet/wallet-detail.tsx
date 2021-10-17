import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './wallet.reducer';
import { IWallet } from 'app/shared/model/wallet.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IWalletDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const WalletDetail = (props: IWalletDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { walletEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ratesApp.wallet.detail.title">Wallet</Translate> [<b>{walletEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="externalId">
              <Translate contentKey="ratesApp.wallet.externalId">External Id</Translate>
            </span>
          </dt>
          <dd>{walletEntity.externalId}</dd>
          <dt>
            <span id="balance">
              <Translate contentKey="ratesApp.wallet.balance">Balance</Translate>
            </span>
          </dt>
          <dd>{walletEntity.balance}</dd>
          <dt>
            <Translate contentKey="ratesApp.wallet.customer">Customer</Translate>
          </dt>
          <dd>{walletEntity.customerId ? walletEntity.customerId : ''}</dd>
        </dl>
        <Button tag={Link} to="/wallet" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/wallet/${walletEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ wallet }: IRootState) => ({
  walletEntity: wallet.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WalletDetail);
