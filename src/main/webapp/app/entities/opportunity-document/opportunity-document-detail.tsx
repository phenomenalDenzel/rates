import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './opportunity-document.reducer';
import { IOpportunityDocument } from 'app/shared/model/opportunity-document.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOpportunityDocumentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OpportunityDocumentDetail = (props: IOpportunityDocumentDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { opportunityDocumentEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ratesApp.opportunityDocument.detail.title">OpportunityDocument</Translate> [
          <b>{opportunityDocumentEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="ratesApp.opportunityDocument.name">Name</Translate>
            </span>
          </dt>
          <dd>{opportunityDocumentEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="ratesApp.opportunityDocument.description">Description</Translate>
            </span>
          </dt>
          <dd>{opportunityDocumentEntity.description}</dd>
          <dt>
            <span id="file">
              <Translate contentKey="ratesApp.opportunityDocument.file">File</Translate>
            </span>
          </dt>
          <dd>
            {opportunityDocumentEntity.file ? (
              <div>
                {opportunityDocumentEntity.fileContentType ? (
                  <a onClick={openFile(opportunityDocumentEntity.fileContentType, opportunityDocumentEntity.file)}>
                    <img
                      src={`data:${opportunityDocumentEntity.fileContentType};base64,${opportunityDocumentEntity.file}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                ) : null}
                <span>
                  {opportunityDocumentEntity.fileContentType}, {byteSize(opportunityDocumentEntity.file)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="archived">
              <Translate contentKey="ratesApp.opportunityDocument.archived">Archived</Translate>
            </span>
          </dt>
          <dd>{opportunityDocumentEntity.archived ? 'true' : 'false'}</dd>
          <dt>
            <span id="archiveUrl">
              <Translate contentKey="ratesApp.opportunityDocument.archiveUrl">Archive Url</Translate>
            </span>
          </dt>
          <dd>{opportunityDocumentEntity.archiveUrl}</dd>
          <dt>
            <Translate contentKey="ratesApp.opportunityDocument.opportunity">Opportunity</Translate>
          </dt>
          <dd>{opportunityDocumentEntity.opportunityName ? opportunityDocumentEntity.opportunityName : ''}</dd>
        </dl>
        <Button tag={Link} to="/opportunity-document" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/opportunity-document/${opportunityDocumentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ opportunityDocument }: IRootState) => ({
  opportunityDocumentEntity: opportunityDocument.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityDocumentDetail);
