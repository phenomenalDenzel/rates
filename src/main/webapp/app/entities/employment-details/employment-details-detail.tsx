import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './employment-details.reducer';
import { IEmploymentDetails } from 'app/shared/model/employment-details.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmploymentDetailsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmploymentDetailsDetail = (props: IEmploymentDetailsDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { employmentDetailsEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ratesApp.employmentDetails.detail.title">EmploymentDetails</Translate> [<b>{employmentDetailsEntity.id}</b>
          ]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="companyName">
              <Translate contentKey="ratesApp.employmentDetails.companyName">Company Name</Translate>
            </span>
          </dt>
          <dd>{employmentDetailsEntity.companyName}</dd>
          <dt>
            <span id="officialWebsite">
              <Translate contentKey="ratesApp.employmentDetails.officialWebsite">Official Website</Translate>
            </span>
          </dt>
          <dd>{employmentDetailsEntity.officialWebsite}</dd>
          <dt>
            <span id="addressLine1">
              <Translate contentKey="ratesApp.employmentDetails.addressLine1">Address Line 1</Translate>
            </span>
          </dt>
          <dd>{employmentDetailsEntity.addressLine1}</dd>
          <dt>
            <span id="addressLine2">
              <Translate contentKey="ratesApp.employmentDetails.addressLine2">Address Line 2</Translate>
            </span>
          </dt>
          <dd>{employmentDetailsEntity.addressLine2}</dd>
          <dt>
            <Translate contentKey="ratesApp.employmentDetails.customer">Customer</Translate>
          </dt>
          <dd>{employmentDetailsEntity.customerId ? employmentDetailsEntity.customerId : ''}</dd>
          <dt>
            <Translate contentKey="ratesApp.employmentDetails.localGovt">Local Govt</Translate>
          </dt>
          <dd>{employmentDetailsEntity.localGovtName ? employmentDetailsEntity.localGovtName : ''}</dd>
        </dl>
        <Button tag={Link} to="/employment-details" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/employment-details/${employmentDetailsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ employmentDetails }: IRootState) => ({
  employmentDetailsEntity: employmentDetails.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmploymentDetailsDetail);
