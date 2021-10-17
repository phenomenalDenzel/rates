import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICustomer } from 'app/shared/model/customer.model';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './verification.reducer';
import { IVerification } from 'app/shared/model/verification.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVerificationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VerificationUpdate = (props: IVerificationUpdateProps) => {
  const [customerId, setCustomerId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { verificationEntity, customers, loading, updating } = props;

  const { image, imageContentType } = verificationEntity;

  const handleClose = () => {
    props.history.push('/verification');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCustomers();
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
        ...verificationEntity,
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
          <h2 id="ratesApp.verification.home.createOrEditLabel">
            <Translate contentKey="ratesApp.verification.home.createOrEditLabel">Create or edit a Verification</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : verificationEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="verification-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="verification-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="itemNameLabel" for="verification-itemName">
                  <Translate contentKey="ratesApp.verification.itemName">Item Name</Translate>
                </Label>
                <AvInput
                  id="verification-itemName"
                  type="select"
                  className="form-control"
                  name="itemName"
                  value={(!isNew && verificationEntity.itemName) || 'PICTURE'}
                >
                  <option value="PICTURE">{translate('ratesApp.VerificationItem.PICTURE')}</option>
                  <option value="ID_CARD">{translate('ratesApp.VerificationItem.ID_CARD')}</option>
                  <option value="UTILITY_BILL">{translate('ratesApp.VerificationItem.UTILITY_BILL')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="verification-description">
                  <Translate contentKey="ratesApp.verification.description">Description</Translate>
                </Label>
                <AvField id="verification-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="imageLabel" for="image">
                    <Translate contentKey="ratesApp.verification.image">Image</Translate>
                  </Label>
                  <br />
                  {image ? (
                    <div>
                      {imageContentType ? (
                        <a onClick={openFile(imageContentType, image)}>
                          <img src={`data:${imageContentType};base64,${image}`} style={{ maxHeight: '100px' }} />
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {imageContentType}, {byteSize(image)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('image')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_image" type="file" onChange={onBlobChange(true, 'image')} accept="image/*" />
                  <AvInput type="hidden" name="image" value={image} />
                </AvGroup>
              </AvGroup>
              <AvGroup check>
                <Label id="archivedLabel">
                  <AvInput id="verification-archived" type="checkbox" className="form-check-input" name="archived" />
                  <Translate contentKey="ratesApp.verification.archived">Archived</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="archiveUrlLabel" for="verification-archiveUrl">
                  <Translate contentKey="ratesApp.verification.archiveUrl">Archive Url</Translate>
                </Label>
                <AvField id="verification-archiveUrl" type="text" name="archiveUrl" />
              </AvGroup>
              <AvGroup>
                <Label for="verification-customer">
                  <Translate contentKey="ratesApp.verification.customer">Customer</Translate>
                </Label>
                <AvInput id="verification-customer" type="select" className="form-control" name="customerId" required>
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
              <Button tag={Link} id="cancel-save" to="/verification" replace color="info">
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
  verificationEntity: storeState.verification.entity,
  loading: storeState.verification.loading,
  updating: storeState.verification.updating,
  updateSuccess: storeState.verification.updateSuccess,
});

const mapDispatchToProps = {
  getCustomers,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VerificationUpdate);
