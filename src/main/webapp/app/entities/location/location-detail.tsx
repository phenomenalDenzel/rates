import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './location.reducer';
import { ILocation } from 'app/shared/model/location.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILocationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LocationDetail = (props: ILocationDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { locationEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ratesApp.location.detail.title">Location</Translate> [<b>{locationEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="addressLine1">
              <Translate contentKey="ratesApp.location.addressLine1">Address Line 1</Translate>
            </span>
          </dt>
          <dd>{locationEntity.addressLine1}</dd>
          <dt>
            <span id="addressLine2">
              <Translate contentKey="ratesApp.location.addressLine2">Address Line 2</Translate>
            </span>
          </dt>
          <dd>{locationEntity.addressLine2}</dd>
          <dt>
            <Translate contentKey="ratesApp.location.customer">Customer</Translate>
          </dt>
          <dd>{locationEntity.customerId ? locationEntity.customerId : ''}</dd>
          <dt>
            <Translate contentKey="ratesApp.location.localGovt">Local Govt</Translate>
          </dt>
          <dd>{locationEntity.localGovtName ? locationEntity.localGovtName : ''}</dd>
        </dl>
        <Button tag={Link} to="/location" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/location/${locationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ location }: IRootState) => ({
  locationEntity: location.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LocationDetail);
