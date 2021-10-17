import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { openFile, byteSize, Translate, translate, ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './verification.reducer';
import { IVerification } from 'app/shared/model/verification.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVerificationProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Verification = (props: IVerificationProps) => {
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

  const { verificationList, match, loading } = props;
  return (
    <div>
      <h2 id="verification-heading">
        <Translate contentKey="ratesApp.verification.home.title">Verifications</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ratesApp.verification.home.createLabel">Create new Verification</Translate>
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
                  placeholder={translate('ratesApp.verification.home.search')}
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
        {verificationList && verificationList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.verification.itemName">Item Name</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.verification.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.verification.image">Image</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.verification.archived">Archived</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.verification.archiveUrl">Archive Url</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.verification.customer">Customer</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {verificationList.map((verification, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${verification.id}`} color="link" size="sm">
                      {verification.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`ratesApp.VerificationItem.${verification.itemName}`} />
                  </td>
                  <td>{verification.description}</td>
                  <td>
                    {verification.image ? (
                      <div>
                        {verification.imageContentType ? (
                          <a onClick={openFile(verification.imageContentType, verification.image)}>
                            <img src={`data:${verification.imageContentType};base64,${verification.image}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {verification.imageContentType}, {byteSize(verification.image)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{verification.archived ? 'true' : 'false'}</td>
                  <td>{verification.archiveUrl}</td>
                  <td>
                    {verification.customerId ? <Link to={`customer/${verification.customerId}`}>{verification.customerId}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${verification.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${verification.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${verification.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="ratesApp.verification.home.notFound">No Verifications found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ verification }: IRootState) => ({
  verificationList: verification.entities,
  loading: verification.loading,
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Verification);
