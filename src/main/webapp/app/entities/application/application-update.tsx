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
import { IOpportunity } from 'app/shared/model/opportunity.model';
import { getEntities as getOpportunities } from 'app/entities/opportunity/opportunity.reducer';
import { getEntity, updateEntity, createEntity, reset } from './application.reducer';
import { IApplication } from 'app/shared/model/application.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IApplicationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ApplicationUpdate = (props: IApplicationUpdateProps) => {
  const [customerId, setCustomerId] = useState('0');
  const [opportunityId, setOpportunityId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { applicationEntity, customers, opportunities, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/application' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCustomers();
    props.getOpportunities();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...applicationEntity,
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
          <h2 id="ratesApp.application.home.createOrEditLabel">
            <Translate contentKey="ratesApp.application.home.createOrEditLabel">Create or edit a Application</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : applicationEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="application-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="application-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="applicationIdLabel" for="application-applicationId">
                  <Translate contentKey="ratesApp.application.applicationId">Application Id</Translate>
                </Label>
                <AvField
                  id="application-applicationId"
                  type="text"
                  name="applicationId"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="application-status">
                  <Translate contentKey="ratesApp.application.status">Status</Translate>
                </Label>
                <AvInput
                  id="application-status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && applicationEntity.status) || 'PROCESSING'}
                >
                  <option value="PROCESSING">{translate('ratesApp.ApplicationStatus.PROCESSING')}</option>
                  <option value="COMPLETE">{translate('ratesApp.ApplicationStatus.COMPLETE')}</option>
                  <option value="REDEEMED">{translate('ratesApp.ApplicationStatus.REDEEMED')}</option>
                  <option value="CANCELLED">{translate('ratesApp.ApplicationStatus.CANCELLED')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="amountLabel" for="application-amount">
                  <Translate contentKey="ratesApp.application.amount">Amount</Translate>
                </Label>
                <AvField
                  id="application-amount"
                  type="text"
                  name="amount"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="application-customer">
                  <Translate contentKey="ratesApp.application.customer">Customer</Translate>
                </Label>
                <AvInput id="application-customer" type="select" className="form-control" name="customerId" required>
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
              <AvGroup>
                <Label for="application-opportunity">
                  <Translate contentKey="ratesApp.application.opportunity">Opportunity</Translate>
                </Label>
                <AvInput id="application-opportunity" type="select" className="form-control" name="opportunityId" required>
                  {opportunities
                    ? opportunities.map(otherEntity => (
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
              <Button tag={Link} id="cancel-save" to="/application" replace color="info">
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
  opportunities: storeState.opportunity.entities,
  applicationEntity: storeState.application.entity,
  loading: storeState.application.loading,
  updating: storeState.application.updating,
  updateSuccess: storeState.application.updateSuccess,
});

const mapDispatchToProps = {
  getCustomers,
  getOpportunities,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationUpdate);
