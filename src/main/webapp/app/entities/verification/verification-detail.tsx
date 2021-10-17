import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './verification.reducer';
import { IVerification } from 'app/shared/model/verification.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVerificationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VerificationDetail = (props: IVerificationDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { verificationEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ratesApp.verification.detail.title">Verification</Translate> [<b>{verificationEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="itemName">
              <Translate contentKey="ratesApp.verification.itemName">Item Name</Translate>
            </span>
          </dt>
          <dd>{verificationEntity.itemName}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="ratesApp.verification.description">Description</Translate>
            </span>
          </dt>
          <dd>{verificationEntity.description}</dd>
          <dt>
            <span id="image">
              <Translate contentKey="ratesApp.verification.image">Image</Translate>
            </span>
          </dt>
          <dd>
            {verificationEntity.image ? (
              <div>
                {verificationEntity.imageContentType ? (
                  <a onClick={openFile(verificationEntity.imageContentType, verificationEntity.image)}>
                    <img
                      src={`data:${verificationEntity.imageContentType};base64,${verificationEntity.image}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                ) : null}
                <span>
                  {verificationEntity.imageContentType}, {byteSize(verificationEntity.image)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="archived">
              <Translate contentKey="ratesApp.verification.archived">Archived</Translate>
            </span>
          </dt>
          <dd>{verificationEntity.archived ? 'true' : 'false'}</dd>
          <dt>
            <span id="archiveUrl">
              <Translate contentKey="ratesApp.verification.archiveUrl">Archive Url</Translate>
            </span>
          </dt>
          <dd>{verificationEntity.archiveUrl}</dd>
          <dt>
            <Translate contentKey="ratesApp.verification.customer">Customer</Translate>
          </dt>
          <dd>{verificationEntity.customerId ? verificationEntity.customerId : ''}</dd>
        </dl>
        <Button tag={Link} to="/verification" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/verification/${verificationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ verification }: IRootState) => ({
  verificationEntity: verification.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VerificationDetail);
