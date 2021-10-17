import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './employment-details.reducer';
import { IEmploymentDetails } from 'app/shared/model/employment-details.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmploymentDetailsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const EmploymentDetails = (props: IEmploymentDetailsProps) => {
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

  const { employmentDetailsList, match, loading } = props;
  return (
    <div>
      <h2 id="employment-details-heading">
        <Translate contentKey="ratesApp.employmentDetails.home.title">Employment Details</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ratesApp.employmentDetails.home.createLabel">Create new Employment Details</Translate>
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
                  placeholder={translate('ratesApp.employmentDetails.home.search')}
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
        {employmentDetailsList && employmentDetailsList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.employmentDetails.companyName">Company Name</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.employmentDetails.officialWebsite">Official Website</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.employmentDetails.addressLine1">Address Line 1</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.employmentDetails.addressLine2">Address Line 2</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.employmentDetails.customer">Customer</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.employmentDetails.localGovt">Local Govt</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {employmentDetailsList.map((employmentDetails, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${employmentDetails.id}`} color="link" size="sm">
                      {employmentDetails.id}
                    </Button>
                  </td>
                  <td>{employmentDetails.companyName}</td>
                  <td>{employmentDetails.officialWebsite}</td>
                  <td>{employmentDetails.addressLine1}</td>
                  <td>{employmentDetails.addressLine2}</td>
                  <td>
                    {employmentDetails.customerId ? (
                      <Link to={`customer/${employmentDetails.customerId}`}>{employmentDetails.customerId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {employmentDetails.localGovtName ? (
                      <Link to={`local-govt/${employmentDetails.localGovtId}`}>{employmentDetails.localGovtName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${employmentDetails.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employmentDetails.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${employmentDetails.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="ratesApp.employmentDetails.home.notFound">No Employment Details found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ employmentDetails }: IRootState) => ({
  employmentDetailsList: employmentDetails.entities,
  loading: employmentDetails.loading,
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmploymentDetails);
