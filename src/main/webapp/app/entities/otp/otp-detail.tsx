import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link, RouteComponentProps, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './otp.reducer';
import { IOtp } from 'app/shared/model/otp.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { Route, editOtp } from 'app/shared/model/enumerations/route.model';

export const OtpDetail = () => {
  const dispatch = useDispatch();
  const otpEntity = useSelector((state: IRootState) => state.otp.entity);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ratesApp.otp.detail.title">Otp</Translate> [<b>{otpEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="code">
              <Translate contentKey="ratesApp.otp.code">Code</Translate>
            </span>
          </dt>
          <dd>{otpEntity.code}</dd>
          <dt>
            <span id="action">
              <Translate contentKey="ratesApp.otp.action">Action</Translate>
            </span>
          </dt>
          <dd>{otpEntity.action}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="ratesApp.otp.email">Email</Translate>
            </span>
          </dt>
          <dd>{otpEntity.email}</dd>
          <dt>
            <span id="createdTime">
              <Translate contentKey="ratesApp.otp.createdTime">Created Time</Translate>
            </span>
          </dt>
          <dd>{otpEntity.createdTime ? <TextFormat value={otpEntity.createdTime} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="used">
              <Translate contentKey="ratesApp.otp.used">Used</Translate>
            </span>
          </dt>
          <dd>{otpEntity.used ? 'true' : 'false'}</dd>
        </dl>
        <Button tag={Link} to={Route.OTP} replace color="info">
          <FontAwesomeIcon icon="arrow-left" />
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={editOtp(otpEntity.id)} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default OtpDetail;
