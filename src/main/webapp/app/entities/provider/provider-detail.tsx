import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './provider.reducer';
import { IProvider } from 'app/shared/model/provider.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProviderDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProviderDetail = (props: IProviderDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { providerEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ratesApp.provider.detail.title">Provider</Translate> [<b>{providerEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="ratesApp.provider.name">Name</Translate>
            </span>
          </dt>
          <dd>{providerEntity.name}</dd>
          <dt>
            <span id="logo">
              <Translate contentKey="ratesApp.provider.logo">Logo</Translate>
            </span>
          </dt>
          <dd>
            {providerEntity.logo ? (
              <div>
                {providerEntity.logoContentType ? (
                  <a onClick={openFile(providerEntity.logoContentType, providerEntity.logo)}>
                    <img src={`data:${providerEntity.logoContentType};base64,${providerEntity.logo}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {providerEntity.logoContentType}, {byteSize(providerEntity.logo)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="contactInfo">
              <Translate contentKey="ratesApp.provider.contactInfo">Contact Info</Translate>
            </span>
          </dt>
          <dd>{providerEntity.contactInfo}</dd>
        </dl>
        <Button tag={Link} to="/provider" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/provider/${providerEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ provider }: IRootState) => ({
  providerEntity: provider.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProviderDetail);
