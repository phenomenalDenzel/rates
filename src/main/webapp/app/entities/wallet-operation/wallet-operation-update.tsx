import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IWallet } from 'app/shared/model/wallet.model';
import { getEntities as getWallets } from 'app/entities/wallet/wallet.reducer';
import { getEntity, updateEntity, createEntity, reset } from './wallet-operation.reducer';
import { IWalletOperation } from 'app/shared/model/wallet-operation.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IWalletOperationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const WalletOperationUpdate = (props: IWalletOperationUpdateProps) => {
  const [walletId, setWalletId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { walletOperationEntity, wallets, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/wallet-operation' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getWallets();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...walletOperationEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ratesApp.walletOperation.home.createOrEditLabel">
            <Translate contentKey="ratesApp.walletOperation.home.createOrEditLabel">Create or edit a WalletOperation</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : walletOperationEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="wallet-operation-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="wallet-operation-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="descriptionLabel" for="wallet-operation-description">
                  <Translate contentKey="ratesApp.walletOperation.description">Description</Translate>
                </Label>
                <AvField id="wallet-operation-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="amountLabel" for="wallet-operation-amount">
                  <Translate contentKey="ratesApp.walletOperation.amount">Amount</Translate>
                </Label>
                <AvField
                  id="wallet-operation-amount"
                  type="text"
                  name="amount"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="operationLabel" for="wallet-operation-operation">
                  <Translate contentKey="ratesApp.walletOperation.operation">Operation</Translate>
                </Label>
                <AvInput
                  id="wallet-operation-operation"
                  type="select"
                  className="form-control"
                  name="operation"
                  value={(!isNew && walletOperationEntity.operation) || 'FUND'}
                >
                  <option value="FUND">{translate('ratesApp.OperationType.FUND')}</option>
                  <option value="WITHDRAW">{translate('ratesApp.OperationType.WITHDRAW')}</option>
                  <option value="TRANSACTION_IN">{translate('ratesApp.OperationType.TRANSACTION_IN')}</option>
                  <option value="TRANSACTION_OUT">{translate('ratesApp.OperationType.TRANSACTION_OUT')}</option>
                  <option value="REDEMPTION">{translate('ratesApp.OperationType.REDEMPTION')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="wallet-operation-wallet">
                  <Translate contentKey="ratesApp.walletOperation.wallet">Wallet</Translate>
                </Label>
                <AvInput id="wallet-operation-wallet" type="select" className="form-control" name="walletId" required>
                  {wallets
                    ? wallets.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.externalId}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>
                  <Translate contentKey="entity.validation.required">This field is required.</Translate>
                </AvFeedback>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/wallet-operation" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  wallets: storeState.wallet.entities,
  walletOperationEntity: storeState.walletOperation.entity,
  loading: storeState.walletOperation.loading,
  updating: storeState.walletOperation.updating,
  updateSuccess: storeState.walletOperation.updateSuccess,
});

const mapDispatchToProps = {
  getWallets,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(WalletOperationUpdate);
