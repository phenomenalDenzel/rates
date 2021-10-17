import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import {
  byteSize,
  Translate,
  translate,
  ICrudSearchAction,
  ICrudGetAllAction,
  TextFormat,
  getSortState,
  IPaginationBaseState,
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities, reset } from './opportunity.reducer';
import { IOpportunity } from 'app/shared/model/opportunity.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';

export interface IOpportunityProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Opportunity = (props: IOpportunityProps) => {
  const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );
  const [sorting, setSorting] = useState(false);

  const getAllEntities = () => {
    if (search) {
      props.getSearchEntities(
        search,
        paginationState.activePage - 1,
        paginationState.itemsPerPage,
        `${paginationState.sort},${paginationState.order}`
      );
    } else {
      props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
    }
  };

  const resetAll = () => {
    props.reset();
    setPaginationState({
      ...paginationState,
      activePage: 1,
    });
  };

  useEffect(() => {
    resetAll();
  }, []);

  const startSearching = () => {
    if (search) {
      props.reset();
      setPaginationState({
        ...paginationState,
        activePage: 1,
      });
      props.getSearchEntities(
        search,
        paginationState.activePage - 1,
        paginationState.itemsPerPage,
        `${paginationState.sort},${paginationState.order}`
      );
    }
  };

  const clear = () => {
    props.reset();
    setSearch('');
    setPaginationState({
      ...paginationState,
      activePage: 1,
    });
    props.getEntities();
  };

  const handleSearch = event => setSearch(event.target.value);

  useEffect(() => {
    getAllEntities();
  }, [paginationState.activePage]);

  const handleLoadMore = () => {
    if ((window as any).pageYOffset > 0) {
      setPaginationState({
        ...paginationState,
        activePage: paginationState.activePage + 1,
      });
    }
  };

  useEffect(() => {
    if (sorting) {
      getAllEntities();
      setSorting(false);
    }
  }, [sorting, search]);

  const sort = p => () => {
    props.reset();
    setPaginationState({
      ...paginationState,
      activePage: 1,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });
    setSorting(true);
  };

  const { opportunityList, match, loading } = props;
  return (
    <div>
      <h2 id="opportunity-heading">
        <Translate contentKey="ratesApp.opportunity.home.title">Opportunities</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ratesApp.opportunity.home.createLabel">Create new Opportunity</Translate>
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
                  placeholder={translate('ratesApp.opportunity.home.search')}
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
        <InfiniteScroll
          pageStart={paginationState.activePage}
          loadMore={handleLoadMore}
          hasMore={paginationState.activePage - 1 < props.links.next}
          loader={<div className="loader">Loading ...</div>}
        >
          {opportunityList && opportunityList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('name')}>
                    <Translate contentKey="ratesApp.opportunity.name">Name</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('type')}>
                    <Translate contentKey="ratesApp.opportunity.type">Type</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('summary')}>
                    <Translate contentKey="ratesApp.opportunity.summary">Summary</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('fundSize')}>
                    <Translate contentKey="ratesApp.opportunity.fundSize">Fund Size</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('startDate')}>
                    <Translate contentKey="ratesApp.opportunity.startDate">Start Date</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('endDate')}>
                    <Translate contentKey="ratesApp.opportunity.endDate">End Date</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('visible')}>
                    <Translate contentKey="ratesApp.opportunity.visible">Visible</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('interestRate')}>
                    <Translate contentKey="ratesApp.opportunity.interestRate">Interest Rate</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('tenor')}>
                    <Translate contentKey="ratesApp.opportunity.tenor">Tenor</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('effectiveApr')}>
                    <Translate contentKey="ratesApp.opportunity.effectiveApr">Effective Apr</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('minimumInvestment')}>
                    <Translate contentKey="ratesApp.opportunity.minimumInvestment">Minimum Investment</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('denomination')}>
                    <Translate contentKey="ratesApp.opportunity.denomination">Denomination</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="ratesApp.opportunity.provider">Provider</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {opportunityList.map((opportunity, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${opportunity.id}`} color="link" size="sm">
                        {opportunity.id}
                      </Button>
                    </td>
                    <td>{opportunity.name}</td>
                    <td>
                      <Translate contentKey={`ratesApp.OpportunityType.${opportunity.type}`} />
                    </td>
                    <td>{opportunity.summary}</td>
                    <td>{opportunity.fundSize}</td>
                    <td>
                      {opportunity.startDate ? <TextFormat type="date" value={opportunity.startDate} format={APP_DATE_FORMAT} /> : null}
                    </td>
                    <td>{opportunity.endDate ? <TextFormat type="date" value={opportunity.endDate} format={APP_DATE_FORMAT} /> : null}</td>
                    <td>{opportunity.visible ? 'true' : 'false'}</td>
                    <td>{opportunity.interestRate}</td>
                    <td>{opportunity.tenor}</td>
                    <td>{opportunity.effectiveApr}</td>
                    <td>{opportunity.minimumInvestment}</td>
                    <td>{opportunity.denomination}</td>
                    <td>
                      {opportunity.providerName ? <Link to={`provider/${opportunity.providerId}`}>{opportunity.providerName}</Link> : ''}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${opportunity.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${opportunity.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${opportunity.id}/delete`} color="danger" size="sm">
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
                <Translate contentKey="ratesApp.opportunity.home.notFound">No Opportunities found</Translate>
              </div>
            )
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

const mapStateToProps = ({ opportunity }: IRootState) => ({
  opportunityList: opportunity.entities,
  loading: opportunity.loading,
  totalItems: opportunity.totalItems,
  links: opportunity.links,
  entity: opportunity.entity,
  updateSuccess: opportunity.updateSuccess,
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Opportunity);
