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
import { ILocalGovt } from 'app/shared/model/local-govt.model';
import { getEntities as getLocalGovts } from 'app/entities/local-govt/local-govt.reducer';
import { getEntity, updateEntity, createEntity, reset } from './location.reducer';
import { ILocation } from 'app/shared/model/location.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILocationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LocationUpdate = (props: ILocationUpdateProps) => {
  const [customerId, setCustomerId] = useState('0');
  const [localGovtId, setLocalGovtId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { locationEntity, customers, localGovts, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/location');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCustomers();
    props.getLocalGovts();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...locationEntity,
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
          <h2 id="ratesApp.location.home.createOrEditLabel">
            <Translate contentKey="ratesApp.location.home.createOrEditLabel">Create or edit a Location</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : locationEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="location-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="location-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="addressLine1Label" for="location-addressLine1">
                  <Translate contentKey="ratesApp.location.addressLine1">Address Line 1</Translate>
                </Label>
                <AvField id="location-addressLine1" type="text" name="addressLine1" />
              </AvGroup>
              <AvGroup>
                <Label id="addressLine2Label" for="location-addressLine2">
                  <Translate contentKey="ratesApp.location.addressLine2">Address Line 2</Translate>
                </Label>
                <AvField id="location-addressLine2" type="text" name="addressLine2" />
              </AvGroup>
              <AvGroup>
                <Label for="location-customer">
                  <Translate contentKey="ratesApp.location.customer">Customer</Translate>
                </Label>
                <AvInput id="location-customer" type="select" className="form-control" name="customerId">
                  <option value="" key="0" />
                  {customers
                    ? customers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="location-localGovt">
                  <Translate contentKey="ratesApp.location.localGovt">Local Govt</Translate>
                </Label>
                <AvInput id="location-localGovt" type="select" className="form-control" name="localGovtId" required>
                  {localGovts
                    ? localGovts.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>
                  <Translate contentKey="entity.validation.required">This field is required.</Translate>
                </AvFeedback>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/location" replace color="info">
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
  localGovts: storeState.localGovt.entities,
  locationEntity: storeState.location.entity,
  loading: storeState.location.loading,
  updating: storeState.location.updating,
  updateSuccess: storeState.location.updateSuccess,
});

const mapDispatchToProps = {
  getCustomers,
  getLocalGovts,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LocationUpdate);
