import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IOpportunity } from 'app/shared/model/opportunity.model';
import { getEntities as getOpportunities } from 'app/entities/opportunity/opportunity.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './opportunity-document.reducer';
import { IOpportunityDocument } from 'app/shared/model/opportunity-document.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IOpportunityDocumentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OpportunityDocumentUpdate = (props: IOpportunityDocumentUpdateProps) => {
  const [opportunityId, setOpportunityId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { opportunityDocumentEntity, opportunities, loading, updating } = props;

  const { file, fileContentType } = opportunityDocumentEntity;

  const handleClose = () => {
    props.history.push('/opportunity-document');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getOpportunities();
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
        ...opportunityDocumentEntity,
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
          <h2 id="ratesApp.opportunityDocument.home.createOrEditLabel">
            <Translate contentKey="ratesApp.opportunityDocument.home.createOrEditLabel">Create or edit a OpportunityDocument</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : opportunityDocumentEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="opportunity-document-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="opportunity-document-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="opportunity-document-name">
                  <Translate contentKey="ratesApp.opportunityDocument.name">Name</Translate>
                </Label>
                <AvField
                  id="opportunity-document-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="opportunity-document-description">
                  <Translate contentKey="ratesApp.opportunityDocument.description">Description</Translate>
                </Label>
                <AvField id="opportunity-document-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="fileLabel" for="file">
                    <Translate contentKey="ratesApp.opportunityDocument.file">File</Translate>
                  </Label>
                  <br />
                  {file ? (
                    <div>
                      {fileContentType ? (
                        <a onClick={openFile(fileContentType, file)}>
                          <img src={`data:${fileContentType};base64,${file}`} style={{ maxHeight: '100px' }} />
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {fileContentType}, {byteSize(file)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('file')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_file" type="file" onChange={onBlobChange(true, 'file')} accept="image/*" />
                  <AvInput type="hidden" name="file" value={file} />
                </AvGroup>
              </AvGroup>
              <AvGroup check>
                <Label id="archivedLabel">
                  <AvInput id="opportunity-document-archived" type="checkbox" className="form-check-input" name="archived" />
                  <Translate contentKey="ratesApp.opportunityDocument.archived">Archived</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="archiveUrlLabel" for="opportunity-document-archiveUrl">
                  <Translate contentKey="ratesApp.opportunityDocument.archiveUrl">Archive Url</Translate>
                </Label>
                <AvField id="opportunity-document-archiveUrl" type="text" name="archiveUrl" />
              </AvGroup>
              <AvGroup>
                <Label for="opportunity-document-opportunity">
                  <Translate contentKey="ratesApp.opportunityDocument.opportunity">Opportunity</Translate>
                </Label>
                <AvInput id="opportunity-document-opportunity" type="select" className="form-control" name="opportunityId" required>
                  {opportunities
                    ? opportunities.map(otherEntity => (
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
              <Button tag={Link} id="cancel-save" to="/opportunity-document" replace color="info">
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
  opportunities: storeState.opportunity.entities,
  opportunityDocumentEntity: storeState.opportunityDocument.entity,
  loading: storeState.opportunityDocument.loading,
  updating: storeState.opportunityDocument.updating,
  updateSuccess: storeState.opportunityDocument.updateSuccess,
});

const mapDispatchToProps = {
  getOpportunities,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityDocumentUpdate);
