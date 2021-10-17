import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './customer.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CustomerDetail = (props: ICustomerDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { customerEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ratesApp.customer.detail.title">Customer</Translate> [<b>{customerEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="annualIncome">
              <Translate contentKey="ratesApp.customer.annualIncome">Annual Income</Translate>
            </span>
          </dt>
          <dd>{customerEntity.annualIncome}</dd>
          <dt>
            <span id="employmentStatus">
              <Translate contentKey="ratesApp.customer.employmentStatus">Employment Status</Translate>
            </span>
          </dt>
          <dd>{customerEntity.employmentStatus}</dd>
          <dt>
            <span id="qualificationLevel">
              <Translate contentKey="ratesApp.customer.qualificationLevel">Qualification Level</Translate>
            </span>
          </dt>
          <dd>{customerEntity.qualificationLevel}</dd>
          <dt>
            <span id="mobile">
              <Translate contentKey="ratesApp.customer.mobile">Mobile</Translate>
            </span>
          </dt>
          <dd>{customerEntity.mobile}</dd>
          <dt>
            <span id="bvn">
              <Translate contentKey="ratesApp.customer.bvn">Bvn</Translate>
            </span>
          </dt>
          <dd>{customerEntity.bvn}</dd>
          <dt>
            <span id="dob">
              <Translate contentKey="ratesApp.customer.dob">Dob</Translate>
            </span>
          </dt>
          <dd>{customerEntity.dob ? <TextFormat value={customerEntity.dob} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="countryOfBirth">
              <Translate contentKey="ratesApp.customer.countryOfBirth">Country Of Birth</Translate>
            </span>
          </dt>
          <dd>{customerEntity.countryOfBirth}</dd>
          <dt>
            <span id="nationality">
              <Translate contentKey="ratesApp.customer.nationality">Nationality</Translate>
            </span>
          </dt>
          <dd>{customerEntity.nationality}</dd>
          <dt>
            <span id="mothersMaidenName">
              <Translate contentKey="ratesApp.customer.mothersMaidenName">Mothers Maiden Name</Translate>
            </span>
          </dt>
          <dd>{customerEntity.mothersMaidenName}</dd>
          <dt>
            <span id="verified">
              <Translate contentKey="ratesApp.customer.verified">Verified</Translate>
            </span>
          </dt>
          <dd>{customerEntity.verified ? 'true' : 'false'}</dd>
          <dt>
            <Translate contentKey="ratesApp.customer.user">User</Translate>
          </dt>
          <dd>{customerEntity.userLogin ? customerEntity.userLogin : ''}</dd>
        </dl>
        <Button tag={Link} to="/customer" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/customer/${customerEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ customer }: IRootState) => ({
  customerEntity: customer.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetail);
