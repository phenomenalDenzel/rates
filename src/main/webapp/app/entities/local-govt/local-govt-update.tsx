import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './local-govt.reducer';
import { ILocalGovt } from 'app/shared/model/local-govt.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILocalGovtUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LocalGovtUpdate = (props: ILocalGovtUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { localGovtEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/local-govt');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...localGovtEntity,
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
          <h2 id="ratesApp.localGovt.home.createOrEditLabel">
            <Translate contentKey="ratesApp.localGovt.home.createOrEditLabel">Create or edit a LocalGovt</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : localGovtEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="local-govt-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="local-govt-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="local-govt-name">
                  <Translate contentKey="ratesApp.localGovt.name">Name</Translate>
                </Label>
                <AvField
                  id="local-govt-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="stateLabel" for="local-govt-state">
                  <Translate contentKey="ratesApp.localGovt.state">State</Translate>
                </Label>
                <AvInput
                  id="local-govt-state"
                  type="select"
                  className="form-control"
                  name="state"
                  value={(!isNew && localGovtEntity.state) || 'ABIA'}
                >
                  <option value="ABIA">{translate('ratesApp.State.ABIA')}</option>
                  <option value="ABUJA">{translate('ratesApp.State.ABUJA')}</option>
                  <option value="ADAMAWA">{translate('ratesApp.State.ADAMAWA')}</option>
                  <option value="AKWA_IBOM">{translate('ratesApp.State.AKWA_IBOM')}</option>
                  <option value="ANAMBRA">{translate('ratesApp.State.ANAMBRA')}</option>
                  <option value="BAUCHI">{translate('ratesApp.State.BAUCHI')}</option>
                  <option value="BAYELSA">{translate('ratesApp.State.BAYELSA')}</option>
                  <option value="BENUE">{translate('ratesApp.State.BENUE')}</option>
                  <option value="BORNO">{translate('ratesApp.State.BORNO')}</option>
                  <option value="CROSS_RIVER">{translate('ratesApp.State.CROSS_RIVER')}</option>
                  <option value="DELTA">{translate('ratesApp.State.DELTA')}</option>
                  <option value="EBONYI">{translate('ratesApp.State.EBONYI')}</option>
                  <option value="ENUGU">{translate('ratesApp.State.ENUGU')}</option>
                  <option value="EDO">{translate('ratesApp.State.EDO')}</option>
                  <option value="EKITI">{translate('ratesApp.State.EKITI')}</option>
                  <option value="GOMBE">{translate('ratesApp.State.GOMBE')}</option>
                  <option value="IMO">{translate('ratesApp.State.IMO')}</option>
                  <option value="JIGAWA">{translate('ratesApp.State.JIGAWA')}</option>
                  <option value="KADUNA">{translate('ratesApp.State.KADUNA')}</option>
                  <option value="KANO">{translate('ratesApp.State.KANO')}</option>
                  <option value="KATSINA">{translate('ratesApp.State.KATSINA')}</option>
                  <option value="KEBBI">{translate('ratesApp.State.KEBBI')}</option>
                  <option value="KOGI">{translate('ratesApp.State.KOGI')}</option>
                  <option value="KWARA">{translate('ratesApp.State.KWARA')}</option>
                  <option value="LAGOS">{translate('ratesApp.State.LAGOS')}</option>
                  <option value="NASARAWA">{translate('ratesApp.State.NASARAWA')}</option>
                  <option value="NIGER">{translate('ratesApp.State.NIGER')}</option>
                  <option value="OGUN">{translate('ratesApp.State.OGUN')}</option>
                  <option value="ONDO">{translate('ratesApp.State.ONDO')}</option>
                  <option value="OSUN">{translate('ratesApp.State.OSUN')}</option>
                  <option value="OYO">{translate('ratesApp.State.OYO')}</option>
                  <option value="PLATEAU">{translate('ratesApp.State.PLATEAU')}</option>
                  <option value="RIVERS">{translate('ratesApp.State.RIVERS')}</option>
                  <option value="SOKOTO">{translate('ratesApp.State.SOKOTO')}</option>
                  <option value="TARABA">{translate('ratesApp.State.TARABA')}</option>
                  <option value="YOBE">{translate('ratesApp.State.YOBE')}</option>
                  <option value="ZAMFARA">{translate('ratesApp.State.ZAMFARA')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup check>
                <Label id="activeLabel">
                  <AvInput id="local-govt-active" type="checkbox" className="form-check-input" name="active" />
                  <Translate contentKey="ratesApp.localGovt.active">Active</Translate>
                </Label>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/local-govt" replace color="info">
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
  localGovtEntity: storeState.localGovt.entity,
  loading: storeState.localGovt.loading,
  updating: storeState.localGovt.updating,
  updateSuccess: storeState.localGovt.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LocalGovtUpdate);
