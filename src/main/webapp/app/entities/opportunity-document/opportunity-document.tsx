import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { openFile, byteSize, Translate, translate, ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './opportunity-document.reducer';
import { IOpportunityDocument } from 'app/shared/model/opportunity-document.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOpportunityDocumentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const OpportunityDocument = (props: IOpportunityDocumentProps) => {
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

  const { opportunityDocumentList, match, loading } = props;
  return (
    <div>
      <h2 id="opportunity-document-heading">
        <Translate contentKey="ratesApp.opportunityDocument.home.title">Opportunity Documents</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ratesApp.opportunityDocument.home.createLabel">Create new Opportunity Document</Translate>
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
                  placeholder={translate('ratesApp.opportunityDocument.home.search')}
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
        {opportunityDocumentList && opportunityDocumentList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.opportunityDocument.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.opportunityDocument.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.opportunityDocument.file">File</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.opportunityDocument.archived">Archived</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.opportunityDocument.archiveUrl">Archive Url</Translate>
                </th>
                <th>
                  <Translate contentKey="ratesApp.opportunityDocument.opportunity">Opportunity</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {opportunityDocumentList.map((opportunityDocument, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${opportunityDocument.id}`} color="link" size="sm">
                      {opportunityDocument.id}
                    </Button>
                  </td>
                  <td>{opportunityDocument.name}</td>
                  <td>{opportunityDocument.description}</td>
                  <td>
                    {opportunityDocument.file ? (
                      <div>
                        {opportunityDocument.fileContentType ? (
                          <a onClick={openFile(opportunityDocument.fileContentType, opportunityDocument.file)}>
                            <img
                              src={`data:${opportunityDocument.fileContentType};base64,${opportunityDocument.file}`}
                              style={{ maxHeight: '30px' }}
                            />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {opportunityDocument.fileContentType}, {byteSize(opportunityDocument.file)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{opportunityDocument.archived ? 'true' : 'false'}</td>
                  <td>{opportunityDocument.archiveUrl}</td>
                  <td>
                    {opportunityDocument.opportunityName ? (
                      <Link to={`opportunity/${opportunityDocument.opportunityId}`}>{opportunityDocument.opportunityName}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${opportunityDocument.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${opportunityDocument.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${opportunityDocument.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="ratesApp.opportunityDocument.home.notFound">No Opportunity Documents found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ opportunityDocument }: IRootState) => ({
  opportunityDocumentList: opportunityDocument.entities,
  loading: opportunityDocument.loading,
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OpportunityDocument);
