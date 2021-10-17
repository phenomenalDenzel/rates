import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './opportunity.reducer';
import { IOpportunity } from 'app/shared/model/opportunity.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOpportunityDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OpportunityDetail = (props: IOpportunityDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { opportunityEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ratesApp.opportunity.detail.title">Opportunity</Translate> [<b>{opportunityEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="ratesApp.opportunity.name">Name</Translate>
            </span>
          </dt>
          <dd>{opportunityEntity.name}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="ratesApp.opportunity.type">Type</Translate>
            </span>
          </dt>
          <dd>{opportunityEntity.type}</dd>
          <dt>
            <span id="summary">
              <Translate contentKey="ratesApp.opportunity.summary">Summary</Translate>
            </span>
          </dt>
          <dd>{opportunityEntity.summary}</dd>
          <dt>
            <span id="fundSize">
              <Translate contentKey="ratesApp.opportunity.fundSize">Fund Size</Translate>
            </span>
          </dt>
          <dd>{opportunityEntity.fundSize}</dd>
          <dt>
            <span id="startDate">
              <Translate contentKey="ratesApp.opportunity.startDate">Start Date</Translate>
            </span>
          </dt>
          <dd>
            {opportunityEntity.startDate ? <TextFormat value={opportunityEntity.startDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="endDate">
              <Translate contentKey="ratesApp.opportunity.endDate">End Date</Translate>
            </span>
          </dt>
          <dd>
            {opportunityEntity.endDate ? <TextFormat value={opportunityEntity.endDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="visible">
              <Translate contentKey="ratesApp.opportunity.visible">Visible</Translate>
            </span>
          </dt>
          <dd>{opportunityEntity.visible ? 'true' : 'false'}</dd>
          <dt>
            <span id="interestRate">
              <Translate contentKey="ratesApp.opportunity.interestRate">Interest Rate</Translate>
            </span>
          </dt>
          <dd>{opportunityEntity.interestRate}</dd>
          <dt>
            <span id="tenor">
              <Translate contentKey="ratesApp.opportunity.tenor">Tenor</Translate>
            </span>
          </dt>
          <dd>{opportunityEntity.tenor}</dd>
          <dt>
            <span id="effectiveApr">
              <Translate contentKey="ratesApp.opportunity.effectiveApr">Effective Apr</Translate>
            </span>
          </dt>
          <dd>{opportunityEntity.effectiveApr}</dd>
          <dt>
            <span id="minimumInvestment">
              <Translate contentKey="ratesApp.opportunity.minimumInvestment">Minimum Investment</Translate>
            </span>
          </dt>
          <dd>{opportunityEntity.minimumInvestment}</dd>
          <dt>
            <span id="denomination">
              <Translate contentKey="ratesApp.opportunity.denomination">Denomination</Translate>
            </span>
          </dt>
          <dd>{opportunityEntity.denomination}</dd>
          <dt>
            <Translate contentKey="ratesApp.opportunity.provider">Provider</Translate>
          </dt>
          <dd>{opportunityEntity.providerName ? opportunityEntity.providerName : ''}</dd>
        </dl>
        <Button tag={Link} to="/opportunity" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/opportunity/${opportunityEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ opportunity }: IRootState) => ({
  opportunityEntity: opportunity.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityDetail);
