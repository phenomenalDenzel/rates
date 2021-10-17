import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, setBlob, reset } from './provider.reducer';
import { IProvider } from 'app/shared/model/provider.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProviderUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProviderUpdate = (props: IProviderUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { providerEntity, loading, updating } = props;

  const { logo, logoContentType } = providerEntity;

  const handleClose = () => {
    props.history.push('/provider');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
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
    if (errors.length === 0) {
      const entity = {
        ...providerEntity,
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
          <h2 id="ratesApp.provider.home.createOrEditLabel">
            <Translate contentKey="ratesApp.provider.home.createOrEditLabel">Create or edit a Provider</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : providerEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="provider-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="provider-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="provider-name">
                  <Translate contentKey="ratesApp.provider.name">Name</Translate>
                </Label>
                <AvField
                  id="provider-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="logoLabel" for="logo">
                    <Translate contentKey="ratesApp.provider.logo">Logo</Translate>
                  </Label>
                  <br />
                  {logo ? (
                    <div>
                      {logoContentType ? (
                        <a onClick={openFile(logoContentType, logo)}>
                          <img src={`data:${logoContentType};base64,${logo}`} style={{ maxHeight: '100px' }} />
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {logoContentType}, {byteSize(logo)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('logo')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_logo" type="file" onChange={onBlobChange(true, 'logo')} accept="image/*" />
                  <AvInput type="hidden" name="logo" value={logo} />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <Label id="contactInfoLabel" for="provider-contactInfo">
                  <Translate contentKey="ratesApp.provider.contactInfo">Contact Info</Translate>
                </Label>
                <AvField id="provider-contactInfo" type="text" name="contactInfo" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/provider" replace color="info">
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
  providerEntity: storeState.provider.entity,
  loading: storeState.provider.loading,
  updating: storeState.provider.updating,
  updateSuccess: storeState.provider.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProviderUpdate);
