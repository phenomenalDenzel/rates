import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IProvider } from 'app/shared/model/provider.model';
import { getEntities as getProviders } from 'app/entities/provider/provider.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './opportunity.reducer';
import { IOpportunity } from 'app/shared/model/opportunity.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IOpportunityUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OpportunityUpdate = (props: IOpportunityUpdateProps) => {
  const [providerId, setProviderId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { opportunityEntity, providers, loading, updating } = props;

  const { summary } = opportunityEntity;

  const handleClose = () => {
    props.history.push('/opportunity');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }

    props.getProviders();
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.startDate = convertDateTimeToServer(values.startDate);
    values.endDate = convertDateTimeToServer(values.endDate);

    if (errors.length === 0) {
      const entity = {
        ...opportunityEntity,
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
          <h2 id="ratesApp.opportunity.home.createOrEditLabel">
            <Translate contentKey="ratesApp.opportunity.home.createOrEditLabel">Create or edit a Opportunity</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : opportunityEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="opportunity-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="opportunity-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="opportunity-name">
                  <Translate contentKey="ratesApp.opportunity.name">Name</Translate>
                </Label>
                <AvField
                  id="opportunity-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="typeLabel" for="opportunity-type">
                  <Translate contentKey="ratesApp.opportunity.type">Type</Translate>
                </Label>
                <AvInput
                  id="opportunity-type"
                  type="select"
                  className="form-control"
                  name="type"
                  value={(!isNew && opportunityEntity.type) || 'ETHICAL_FUND'}
                >
                  <option value="ETHICAL_FUND">{translate('ratesApp.OpportunityType.ETHICAL_FUND')}</option>
                  <option value="BALANCED_FUND">{translate('ratesApp.OpportunityType.BALANCED_FUND')}</option>
                  <option value="CONSERVATIVE_FUND">{translate('ratesApp.OpportunityType.CONSERVATIVE_FUND')}</option>
                  <option value="COLLECTIVE_INVESTMENT_FUND">{translate('ratesApp.OpportunityType.COLLECTIVE_INVESTMENT_FUND')}</option>
                  <option value="TREASURY_BILL">{translate('ratesApp.OpportunityType.TREASURY_BILL')}</option>
                  <option value="MONEY_MARKET_FUND">{translate('ratesApp.OpportunityType.MONEY_MARKET_FUND')}</option>
                  <option value="HALAL_FUND">{translate('ratesApp.OpportunityType.HALAL_FUND')}</option>
                  <option value="DOLLAR_FUND">{translate('ratesApp.OpportunityType.DOLLAR_FUND')}</option>
                  <option value="GUARANTEED_TRUST_INVESTMENT">{translate('ratesApp.OpportunityType.GUARANTEED_TRUST_INVESTMENT')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="summaryLabel" for="opportunity-summary">
                  <Translate contentKey="ratesApp.opportunity.summary">Summary</Translate>
                </Label>
                <AvInput id="opportunity-summary" type="textarea" name="summary" />
              </AvGroup>
              <AvGroup>
                <Label id="fundSizeLabel" for="opportunity-fundSize">
                  <Translate contentKey="ratesApp.opportunity.fundSize">Fund Size</Translate>
                </Label>
                <AvField id="opportunity-fundSize" type="text" name="fundSize" />
              </AvGroup>
              <AvGroup>
                <Label id="startDateLabel" for="opportunity-startDate">
                  <Translate contentKey="ratesApp.opportunity.startDate">Start Date</Translate>
                </Label>
                <AvInput
                  id="opportunity-startDate"
                  type="datetime-local"
                  className="form-control"
                  name="startDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.opportunityEntity.startDate)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="endDateLabel" for="opportunity-endDate">
                  <Translate contentKey="ratesApp.opportunity.endDate">End Date</Translate>
                </Label>
                <AvInput
                  id="opportunity-endDate"
                  type="datetime-local"
                  className="form-control"
                  name="endDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.opportunityEntity.endDate)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup check>
                <Label id="visibleLabel">
                  <AvInput id="opportunity-visible" type="checkbox" className="form-check-input" name="visible" />
                  <Translate contentKey="ratesApp.opportunity.visible">Visible</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="interestRateLabel" for="opportunity-interestRate">
                  <Translate contentKey="ratesApp.opportunity.interestRate">Interest Rate</Translate>
                </Label>
                <AvField id="opportunity-interestRate" type="string" className="form-control" name="interestRate" />
              </AvGroup>
              <AvGroup>
                <Label id="tenorLabel" for="opportunity-tenor">
                  <Translate contentKey="ratesApp.opportunity.tenor">Tenor</Translate>
                </Label>
                <AvField id="opportunity-tenor" type="string" className="form-control" name="tenor" />
              </AvGroup>
              <AvGroup>
                <Label id="effectiveAprLabel" for="opportunity-effectiveApr">
                  <Translate contentKey="ratesApp.opportunity.effectiveApr">Effective Apr</Translate>
                </Label>
                <AvField id="opportunity-effectiveApr" type="string" className="form-control" name="effectiveApr" />
              </AvGroup>
              <AvGroup>
                <Label id="minimumInvestmentLabel" for="opportunity-minimumInvestment">
                  <Translate contentKey="ratesApp.opportunity.minimumInvestment">Minimum Investment</Translate>
                </Label>
                <AvField id="opportunity-minimumInvestment" type="text" name="minimumInvestment" />
              </AvGroup>
              <AvGroup>
                <Label id="denominationLabel" for="opportunity-denomination">
                  <Translate contentKey="ratesApp.opportunity.denomination">Denomination</Translate>
                </Label>
                <AvField id="opportunity-denomination" type="text" name="denomination" />
              </AvGroup>
              <AvGroup>
                <Label for="opportunity-provider">
                  <Translate contentKey="ratesApp.opportunity.provider">Provider</Translate>
                </Label>
                <AvInput id="opportunity-provider" type="select" className="form-control" name="providerId" required>
                  {providers
                    ? providers.map(otherEntity => (
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
              <Button tag={Link} id="cancel-save" to="/opportunity" replace color="info">
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
  providers: storeState.provider.entities,
  opportunityEntity: storeState.opportunity.entity,
  loading: storeState.opportunity.loading,
  updating: storeState.opportunity.updating,
  updateSuccess: storeState.opportunity.updateSuccess,
});

const mapDispatchToProps = {
  getProviders,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityUpdate);
