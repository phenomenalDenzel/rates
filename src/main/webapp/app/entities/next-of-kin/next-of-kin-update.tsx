import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICustomer } from 'app/shared/model/customer.model';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { getEntity, updateEntity, createEntity, reset } from './next-of-kin.reducer';
import { INextOfKin } from 'app/shared/model/next-of-kin.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface INextOfKinUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const NextOfKinUpdate = (props: INextOfKinUpdateProps) => {
  const [customerId, setCustomerId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { nextOfKinEntity, customers, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/next-of-kin');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCustomers();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...nextOfKinEntity,
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
          <h2 id="ratesApp.nextOfKin.home.createOrEditLabel">
            <Translate contentKey="ratesApp.nextOfKin.home.createOrEditLabel">Create or edit a NextOfKin</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : nextOfKinEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="next-of-kin-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="next-of-kin-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="titleLabel" for="next-of-kin-title">
                  <Translate contentKey="ratesApp.nextOfKin.title">Title</Translate>
                </Label>
                <AvInput
                  id="next-of-kin-title"
                  type="select"
                  className="form-control"
                  name="title"
                  value={(!isNew && nextOfKinEntity.title) || 'MR'}
                >
                  <option value="MR">{translate('ratesApp.Title.MR')}</option>
                  <option value="MS">{translate('ratesApp.Title.MS')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="relationLabel" for="next-of-kin-relation">
                  <Translate contentKey="ratesApp.nextOfKin.relation">Relation</Translate>
                </Label>
                <AvInput
                  id="next-of-kin-relation"
                  type="select"
                  className="form-control"
                  name="relation"
                  value={(!isNew && nextOfKinEntity.relation) || 'FATHER'}
                >
                  <option value="FATHER">{translate('ratesApp.RelationshipType.FATHER')}</option>
                  <option value="MOTHER">{translate('ratesApp.RelationshipType.MOTHER')}</option>
                  <option value="SIBLING">{translate('ratesApp.RelationshipType.SIBLING')}</option>
                  <option value="SPOUSE">{translate('ratesApp.RelationshipType.SPOUSE')}</option>
                  <option value="CHILD">{translate('ratesApp.RelationshipType.CHILD')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="nameLabel" for="next-of-kin-name">
                  <Translate contentKey="ratesApp.nextOfKin.name">Name</Translate>
                </Label>
                <AvField id="next-of-kin-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="phoneNumberLabel" for="next-of-kin-phoneNumber">
                  <Translate contentKey="ratesApp.nextOfKin.phoneNumber">Phone Number</Translate>
                </Label>
                <AvField id="next-of-kin-phoneNumber" type="text" name="phoneNumber" />
              </AvGroup>
              <AvGroup>
                <Label for="next-of-kin-customer">
                  <Translate contentKey="ratesApp.nextOfKin.customer">Customer</Translate>
                </Label>
                <AvInput id="next-of-kin-customer" type="select" className="form-control" name="customerId" required>
                  {customers
                    ? customers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>
                  <Translate contentKey="entity.validation.required">This field is required.</Translate>
                </AvFeedback>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/next-of-kin" replace color="info">
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
  customers: storeState.customer.entities,
  nextOfKinEntity: storeState.nextOfKin.entity,
  loading: storeState.nextOfKin.loading,
  updating: storeState.nextOfKin.updating,
  updateSuccess: storeState.nextOfKin.updateSuccess,
});

const mapDispatchToProps = {
  getCustomers,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NextOfKinUpdate);
