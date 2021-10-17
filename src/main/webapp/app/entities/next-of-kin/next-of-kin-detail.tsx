import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './next-of-kin.reducer';
import { INextOfKin } from 'app/shared/model/next-of-kin.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INextOfKinDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const NextOfKinDetail = (props: INextOfKinDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { nextOfKinEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ratesApp.nextOfKin.detail.title">NextOfKin</Translate> [<b>{nextOfKinEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="title">
              <Translate contentKey="ratesApp.nextOfKin.title">Title</Translate>
            </span>
          </dt>
          <dd>{nextOfKinEntity.title}</dd>
          <dt>
            <span id="relation">
              <Translate contentKey="ratesApp.nextOfKin.relation">Relation</Translate>
            </span>
          </dt>
          <dd>{nextOfKinEntity.relation}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="ratesApp.nextOfKin.name">Name</Translate>
            </span>
          </dt>
          <dd>{nextOfKinEntity.name}</dd>
          <dt>
            <span id="phoneNumber">
              <Translate contentKey="ratesApp.nextOfKin.phoneNumber">Phone Number</Translate>
            </span>
          </dt>
          <dd>{nextOfKinEntity.phoneNumber}</dd>
          <dt>
            <Translate contentKey="ratesApp.nextOfKin.customer">Customer</Translate>
          </dt>
          <dd>{nextOfKinEntity.customerId ? nextOfKinEntity.customerId : ''}</dd>
        </dl>
        <Button tag={Link} to="/next-of-kin" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/next-of-kin/${nextOfKinEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ nextOfKin }: IRootState) => ({
  nextOfKinEntity: nextOfKin.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NextOfKinDetail);
