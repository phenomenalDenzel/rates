import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IEmploymentDetails } from 'app/shared/model/employment-details.model';
import { getEntities as getEmploymentDetails } from 'app/entities/employment-details/employment-details.reducer';
import { IWallet } from 'app/shared/model/wallet.model';
import { getEntities as getWallets } from 'app/entities/wallet/wallet.reducer';
import { getEntity, updateEntity, createEntity, reset } from './customer.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICustomerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CustomerUpdate = (props: ICustomerUpdateProps) => {
  const [userId, setUserId] = useState('0');
  const [employmentDetailsId, setEmploymentDetailsId] = useState('0');
  const [walletId, setWalletId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { customerEntity, users, employmentDetails, wallets, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/customer');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
    props.getEmploymentDetails();
    props.getWallets();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...customerEntity,
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
          <h2 id="ratesApp.customer.home.createOrEditLabel">
            <Translate contentKey="ratesApp.customer.home.createOrEditLabel">Create or edit a Customer</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : customerEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="customer-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="customer-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="annualIncomeLabel" for="customer-annualIncome">
                  <Translate contentKey="ratesApp.customer.annualIncome">Annual Income</Translate>
                </Label>
                <AvInput
                  id="customer-annualIncome"
                  type="select"
                  className="form-control"
                  name="annualIncome"
                  value={(!isNew && customerEntity.annualIncome) || 'BELOW_1M'}
                >
                  <option value="BELOW_1M">{translate('ratesApp.AnnualIncome.BELOW_1M')}</option>
                  <option value="BETWEEN_1M_5M">{translate('ratesApp.AnnualIncome.BETWEEN_1M_5M')}</option>
                  <option value="BETWEEN_5M_20M">{translate('ratesApp.AnnualIncome.BETWEEN_5M_20M')}</option>
                  <option value="ABOVE_20M">{translate('ratesApp.AnnualIncome.ABOVE_20M')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="employmentStatusLabel" for="customer-employmentStatus">
                  <Translate contentKey="ratesApp.customer.employmentStatus">Employment Status</Translate>
                </Label>
                <AvInput
                  id="customer-employmentStatus"
                  type="select"
                  className="form-control"
                  name="employmentStatus"
                  value={(!isNew && customerEntity.employmentStatus) || 'EMPLOYED'}
                >
                  <option value="EMPLOYED">{translate('ratesApp.EmploymentStatus.EMPLOYED')}</option>
                  <option value="UNEMPLOYED">{translate('ratesApp.EmploymentStatus.UNEMPLOYED')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="qualificationLevelLabel" for="customer-qualificationLevel">
                  <Translate contentKey="ratesApp.customer.qualificationLevel">Qualification Level</Translate>
                </Label>
                <AvInput
                  id="customer-qualificationLevel"
                  type="select"
                  className="form-control"
                  name="qualificationLevel"
                  value={(!isNew && customerEntity.qualificationLevel) || 'HIGHER_NATIONAL_DIPLOMA'}
                >
                  <option value="HIGHER_NATIONAL_DIPLOMA">{translate('ratesApp.Qualification.HIGHER_NATIONAL_DIPLOMA')}</option>
                  <option value="HIGHER_NATIONAL_CERTIFICATE">{translate('ratesApp.Qualification.HIGHER_NATIONAL_CERTIFICATE')}</option>
                  <option value="A_LEVEL">{translate('ratesApp.Qualification.A_LEVEL')}</option>
                  <option value="BACHELORS_DEGREE">{translate('ratesApp.Qualification.BACHELORS_DEGREE')}</option>
                  <option value="MASTERS_DEGREE">{translate('ratesApp.Qualification.MASTERS_DEGREE')}</option>
                  <option value="PHD">{translate('ratesApp.Qualification.PHD')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="mobileLabel" for="customer-mobile">
                  <Translate contentKey="ratesApp.customer.mobile">Mobile</Translate>
                </Label>
                <AvField
                  id="customer-mobile"
                  type="text"
                  name="mobile"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="bvnLabel" for="customer-bvn">
                  <Translate contentKey="ratesApp.customer.bvn">Bvn</Translate>
                </Label>
                <AvField
                  id="customer-bvn"
                  type="text"
                  name="bvn"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dobLabel" for="customer-dob">
                  <Translate contentKey="ratesApp.customer.dob">Dob</Translate>
                </Label>
                <AvField
                  id="customer-dob"
                  type="date"
                  className="form-control"
                  name="dob"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="countryOfBirthLabel" for="customer-countryOfBirth">
                  <Translate contentKey="ratesApp.customer.countryOfBirth">Country Of Birth</Translate>
                </Label>
                <AvField id="customer-countryOfBirth" type="text" name="countryOfBirth" />
              </AvGroup>
              <AvGroup>
                <Label id="nationalityLabel" for="customer-nationality">
                  <Translate contentKey="ratesApp.customer.nationality">Nationality</Translate>
                </Label>
                <AvField id="customer-nationality" type="text" name="nationality" />
              </AvGroup>
              <AvGroup>
                <Label id="mothersMaidenNameLabel" for="customer-mothersMaidenName">
                  <Translate contentKey="ratesApp.customer.mothersMaidenName">Mothers Maiden Name</Translate>
                </Label>
                <AvField id="customer-mothersMaidenName" type="text" name="mothersMaidenName" />
              </AvGroup>
              <AvGroup check>
                <Label id="verifiedLabel">
                  <AvInput id="customer-verified" type="checkbox" className="form-check-input" name="verified" />
                  <Translate contentKey="ratesApp.customer.verified">Verified</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label for="customer-user">
                  <Translate contentKey="ratesApp.customer.user">User</Translate>
                </Label>
                <AvInput id="customer-user" type="select" className="form-control" name="userId" required>
                  {users
                    ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.login}
                        </option>
                      ))
                    : null}
                </AvInput>
                <AvFeedback>
                  <Translate contentKey="entity.validation.required">This field is required.</Translate>
                </AvFeedback>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/customer" replace color="info">
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
  users: storeState.userManagement.users,
  employmentDetails: storeState.employmentDetails.entities,
  wallets: storeState.wallet.entities,
  customerEntity: storeState.customer.entity,
  loading: storeState.customer.loading,
  updating: storeState.customer.updating,
  updateSuccess: storeState.customer.updateSuccess,
});

const mapDispatchToProps = {
  getUsers,
  getEmploymentDetails,
  getWallets,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerUpdate);
