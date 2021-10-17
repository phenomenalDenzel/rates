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
import { getEntity, updateEntity, createEntity, reset } from './employment-details.reducer';
import { IEmploymentDetails } from 'app/shared/model/employment-details.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmploymentDetailsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmploymentDetailsUpdate = (props: IEmploymentDetailsUpdateProps) => {
  const [customerId, setCustomerId] = useState('0');
  const [localGovtId, setLocalGovtId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { employmentDetailsEntity, customers, localGovts, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/employment-details');
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
        ...employmentDetailsEntity,
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
          <h2 id="ratesApp.employmentDetails.home.createOrEditLabel">
            <Translate contentKey="ratesApp.employmentDetails.home.createOrEditLabel">Create or edit a EmploymentDetails</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : employmentDetailsEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="employment-details-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="employment-details-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="companyNameLabel" for="employment-details-companyName">
                  <Translate contentKey="ratesApp.employmentDetails.companyName">Company Name</Translate>
                </Label>
                <AvField
                  id="employment-details-companyName"
                  type="text"
                  name="companyName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="officialWebsiteLabel" for="employment-details-officialWebsite">
                  <Translate contentKey="ratesApp.employmentDetails.officialWebsite">Official Website</Translate>
                </Label>
                <AvField id="employment-details-officialWebsite" type="text" name="officialWebsite" />
              </AvGroup>
              <AvGroup>
                <Label id="addressLine1Label" for="employment-details-addressLine1">
                  <Translate contentKey="ratesApp.employmentDetails.addressLine1">Address Line 1</Translate>
                </Label>
                <AvField id="employment-details-addressLine1" type="text" name="addressLine1" />
              </AvGroup>
              <AvGroup>
                <Label id="addressLine2Label" for="employment-details-addressLine2">
                  <Translate contentKey="ratesApp.employmentDetails.addressLine2">Address Line 2</Translate>
                </Label>
                <AvField id="employment-details-addressLine2" type="text" name="addressLine2" />
              </AvGroup>
              <AvGroup>
                <Label for="employment-details-customer">
                  <Translate contentKey="ratesApp.employmentDetails.customer">Customer</Translate>
                </Label>
                <AvInput id="employment-details-customer" type="select" className="form-control" name="customerId">
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
                <Label for="employment-details-localGovt">
                  <Translate contentKey="ratesApp.employmentDetails.localGovt">Local Govt</Translate>
                </Label>
                <AvInput id="employment-details-localGovt" type="select" className="form-control" name="localGovtId">
                  <option value="" key="0" />
                  {localGovts
                    ? localGovts.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/employment-details" replace color="info">
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
  employmentDetailsEntity: storeState.employmentDetails.entity,
  loading: storeState.employmentDetails.loading,
  updating: storeState.employmentDetails.updating,
  updateSuccess: storeState.employmentDetails.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(EmploymentDetailsUpdate);
