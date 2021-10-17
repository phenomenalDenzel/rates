import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './next-of-kin.reducer';
import { INextOfKin } from 'app/shared/model/next-of-kin.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INextOfKinProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const NextOfKin = (props: INextOfKinProps) => {
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

  const { nextOfKinList, match, loading } = props;
  return (
    <div>
      <h2 id="next-of-kin-heading">
        <Translate contentKey="ratesApp.nextOfKin.home.title">Next Of Kins</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ratesApp.nextOfKin.home.createLabel">Create new Next Of Kin</Translate>
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
                  placeholder={translate('ratesApp.nextOfKin.home.search')}
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
        {nextOfKinList && nextOfKinList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.nextOfKin.title">Title</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.nextOfKin.relation">Relation</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.nextOfKin.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.nextOfKin.phoneNumber">Phone Number</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.nextOfKin.customer">Customer</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {nextOfKinList.map((nextOfKin, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${nextOfKin.id}`} color="link" size="sm">
                      {nextOfKin.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`ratesApp.Title.${nextOfKin.title}`} />
                  </td>
                  <td>
                    <Translate contentKey={`ratesApp.RelationshipType.${nextOfKin.relation}`} />
                  </td>
                  <td>{nextOfKin.name}</td>
                  <td>{nextOfKin.phoneNumber}</td>
                  <td>{nextOfKin.customerId ? <Link to={`customer/${nextOfKin.customerId}`}>{nextOfKin.customerId}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${nextOfKin.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${nextOfKin.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${nextOfKin.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="ratesApp.nextOfKin.home.notFound">No Next Of Kins found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ nextOfKin }: IRootState) => ({
  nextOfKinList: nextOfKin.entities,
  loading: nextOfKin.loading,
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NextOfKin);
