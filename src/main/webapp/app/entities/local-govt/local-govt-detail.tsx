import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './local-govt.reducer';
import { ILocalGovt } from 'app/shared/model/local-govt.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILocalGovtDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LocalGovtDetail = (props: ILocalGovtDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { localGovtEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ratesApp.localGovt.detail.title">LocalGovt</Translate> [<b>{localGovtEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="ratesApp.localGovt.name">Name</Translate>
            </span>
          </dt>
          <dd>{localGovtEntity.name}</dd>
          <dt>
            <span id="state">
              <Translate contentKey="ratesApp.localGovt.state">State</Translate>
            </span>
          </dt>
          <dd>{localGovtEntity.state}</dd>
          <dt>
            <span id="active">
              <Translate contentKey="ratesApp.localGovt.active">Active</Translate>
            </span>
          </dt>
          <dd>{localGovtEntity.active ? 'true' : 'false'}</dd>
        </dl>
        <Button tag={Link} to="/local-govt" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/local-govt/${localGovtEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ localGovt }: IRootState) => ({
  localGovtEntity: localGovt.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LocalGovtDetail);
