import React, { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Link, RouteComponentProps, useHistory, useParams } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './otp.reducer';
import { IOtp } from 'app/shared/model/otp.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { Route } from 'app/shared/model/enumerations/route.model';

export const OtpUpdate = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const select = useSelector((state: IRootState) => state.otp);
  const [isNew, setIsNew] = useState(!id);

  const { loading, updating, updateSuccess } = select;
  const otpEntity = select.entity;
  const handleClose = () => {
    history.push(Route.OTP);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.createdTime = convertDateTimeToServer(values.createdTime);

    if (errors.length === 0) {
      const entity = {
        ...otpEntity,
        ...values,
      };

      if (isNew) {
        dispatch(createEntity(entity));
      } else {
        dispatch(updateEntity(entity));
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ratesApp.otp.home.createOrEditLabel">
            <Translate contentKey="ratesApp.otp.home.createOrEditLabel">Create or edit a Otp</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : otpEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="otp-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="otp-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="codeLabel" for="otp-code">
                  <Translate contentKey="ratesApp.otp.code">Code</Translate>
                </Label>
                <AvField
                  id="otp-code"
                  type="text"
                  name="code"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="actionLabel" for="otp-action">
                  <Translate contentKey="ratesApp.otp.action">Action</Translate>
                </Label>
                <AvInput
                  id="otp-action"
                  type="select"
                  className="form-control"
                  name="action"
                  value={(!isNew && otpEntity.action) || 'ACTIVATION'}
                >
                  <option value="ACTIVATION">{translate('ratesApp.OtpAction.ACTIVATION')}</option>
                  <option value="WITHDRAWAL">{translate('ratesApp.OtpAction.WITHDRAWAL')}</option>
                  <option value="RESET_PASSWORD">{translate('ratesApp.OtpAction.RESET_PASSWORD')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="otp-email">
                  <Translate contentKey="ratesApp.otp.email">Email</Translate>
                </Label>
                <AvField
                  id="otp-email"
                  type="text"
                  name="email"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="createdTimeLabel" for="otp-createdTime">
                  <Translate contentKey="ratesApp.otp.createdTime">Created Time</Translate>
                </Label>
                <AvInput
                  id="otp-createdTime"
                  type="datetime-local"
                  className="form-control"
                  name="createdTime"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(otpEntity.createdTime)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup check>
                <Label id="usedLabel">
                  <AvInput id="otp-used" type="checkbox" className="form-check-input" name="used" />
                  <Translate contentKey="ratesApp.otp.used">Used</Translate>
                </Label>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to={Route.OTP} replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default OtpUpdate;
