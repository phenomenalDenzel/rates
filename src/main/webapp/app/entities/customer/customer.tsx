import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './customer.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomerProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Customer = (props: ICustomerProps) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    props.getEntities();
  }, []);

  const startSearching = () => {
    if (search) {
      props.getSearchEntities(search);
    }
  };

  const clear = () => {
    setSearch('');
    props.getEntities();
  };

  const handleSearch = event => setSearch(event.target.value);

  const { customerList, match, loading } = props;
  return (
    <div>
      <h2 id="customer-heading">
        <Translate contentKey="ratesApp.customer.home.title">Customers</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ratesApp.customer.home.createLabel">Create new Customer</Translate>
        </Link>
      </h2>
      <Row>
        <Col sm="12">
          <AvForm onSubmit={startSearching}>
            <AvGroup>
              <InputGroup>
                <AvInput
                  type="text"
                  name="search"
                  value={search}
                  onChange={handleSearch}
                  placeholder={translate('ratesApp.customer.home.search')}
                />
                <Button className="input-group-addon">
                  <FontAwesomeIcon icon="search" />
                </Button>
                <Button type="reset" className="input-group-addon" onClick={clear}>
                  <FontAwesomeIcon icon="trash" />
                </Button>
              </InputGroup>
            </AvGroup>
          </AvForm>
        </Col>
      </Row>
      <div className="table-responsive">
        {customerList && customerList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.customer.annualIncome">Annual Income</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.customer.employmentStatus">Employment Status</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.customer.qualificationLevel">Qualification Level</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.customer.mobile">Mobile</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.customer.bvn">Bvn</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.customer.dob">Dob</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.customer.countryOfBirth">Country Of Birth</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.customer.nationality">Nationality</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.customer.mothersMaidenName">Mothers Maiden Name</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.customer.verified">Verified</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.customer.user">User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {customerList.map((customer, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${customer.id}`} color="link" size="sm">
                      {customer.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`ratesApp.AnnualIncome.${customer.annualIncome}`} />
                  </td>
                  <td>
                    <Translate contentKey={`ratesApp.EmploymentStatus.${customer.employmentStatus}`} />
                  </td>
                  <td>
                    <Translate contentKey={`ratesApp.Qualification.${customer.qualificationLevel}`} />
                  </td>
                  <td>{customer.mobile}</td>
                  <td>{customer.bvn}</td>
                  <td>{customer.dob ? <TextFormat type="date" value={customer.dob} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>{customer.countryOfBirth}</td>
                  <td>{customer.nationality}</td>
                  <td>{customer.mothersMaidenName}</td>
                  <td>{customer.verified ? 'true' : 'false'}</td>
                  <td>{customer.userLogin ? customer.userLogin : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${customer.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${customer.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${customer.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="ratesApp.customer.home.notFound">No Customers found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ customer }: IRootState) => ({
  customerList: customer.entities,
  loading: customer.loading,
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
