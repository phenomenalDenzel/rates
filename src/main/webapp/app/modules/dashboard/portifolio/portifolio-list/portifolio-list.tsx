import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Translate, getSortState } from 'react-jhipster';
import { Row, Col } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { getEntities, getCustomerApplications, reset, setPortifolioModal } from 'app/entities/application/application.reducer';
import { IRootState } from 'app/shared/reducers';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { formateCurrency } from 'app/shared/util/formate-currency';
import { IApplication } from 'app/shared/model/application.model';
import PortifolioDetails from '../portifolio-details/portifolio-details';
import { AnimateFadeIn } from 'app/shared/util/constant';

import './portifolio-list.scss';

export interface IPortifolioListProps extends RouteComponentProps<{ url: string }> {
  getPortifolio: Function;
  userId: number;
}

const PortifolioList = (props: IPortifolioListProps) => {
  const dispatch = useDispatch();
  const select = useSelector((state: IRootState) => state.application);
  const [portifiolo, setPortifiolo] = useState<IApplication>(null);
  const [id, setId] = useState<number>(null);
  const [opportunities, setOpportunities] = useState<IApplication[]>([]);
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );

  const { applicationEntities, links } = select;

  const getAllEntities = userId => {
    dispatch(
      getCustomerApplications(
        userId,
        paginationState.activePage - 1,
        paginationState.itemsPerPage,
        `${paginationState.sort},${paginationState.order}`
      )
    );
  };

  const retrievePortifolio = (portifio: IApplication) => {
    portifiolo && portifio.id === id ? setPortifiolo(null) : setPortifiolo(portifio);
    setId(portifio.id);
    props.getPortifolio(portifio);
  };

  const handleLoadMore = () => {
    setPaginationState({
      ...paginationState,
      activePage: paginationState.activePage + 1,
    });
  };

  useEffect(() => {
    getAllEntities(props.userId);
  }, [paginationState.activePage]);

  useEffect(() => {
    if (applicationEntities && applicationEntities.length && window.innerWidth > 767) {
      const firstPortifolio = applicationEntities && applicationEntities.length > 0 && applicationEntities[0];
      firstPortifolio && retrievePortifolio(firstPortifolio);
    }
  }, [applicationEntities]);

  return applicationEntities && applicationEntities.length > 0 ? (
    <InfiniteScroll
      pageStart={paginationState.activePage}
      loadMore={handleLoadMore}
      hasMore={paginationState.activePage - 1 < links.next}
      loader={
        <div className="loader" key={0}>
          <Translate contentKey="global.loading">Loading ...</Translate>
        </div>
      }
    >
      <Row className="portifolio-list">
        <Col>
          {applicationEntities.map(val => {
            return (
              <>
                <Row key={val.id} className="portifolio-list-card">
                  <Col className={`${val.id === id ? 'active-border' : 'border-bottom'}`} onClick={() => retrievePortifolio(val)}>
                    <Row className="inner">
                      <Col xs={{ size: 'auto' }} sm={{ size: 'auto' }} md="2" className="list-image">
                        <img src="content/images/portifolio-img.svg" alt="rates" />
                      </Col>
                      <Col className="pl-2  pr-2">
                        <div className="list-title">{val.opportunity.name}</div>
                        <div className="list-description">{val.opportunity.providerName}</div>
                      </Col>
                      <Col xs={{ size: 'auto' }} sm={{ size: 'auto' }} md={{ size: 'auto' }} className="list-fund">
                        <div className="fund-size">Fund size</div>
                        <div className="fund-amount">{val.opportunity.fundSize}</div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                {val.id === id && portifiolo && (
                  <Row className={AnimateFadeIn()}>
                    <Col xs="12" sm="12" className="portifolio-details d-sm-block d-md-none">
                      <PortifolioDetails portifolio={portifiolo} />
                    </Col>
                  </Row>
                )}
              </>
            );
          })}
        </Col>
      </Row>
    </InfiniteScroll>
  ) : null;
};

export default withRouter(PortifolioList);
