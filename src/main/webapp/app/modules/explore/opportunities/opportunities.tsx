import React, { useState, useEffect } from 'react';
import { Translate } from 'react-jhipster';
import NumberFormat from 'react-number-format';
import { Button, Row, Col, Card } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import PageLoader from 'app/shared/util/pageLoader';
import ApplicationModal from 'app/modules/explore/paymentModal/payment-modal';
import { exploreDetail } from 'app/shared/model/enumerations/route.model';
import { setPortifolioModal } from 'app/entities/application/application.reducer';
import { IOpportunity } from 'app/shared/model/opportunity.model';
import { hideClosingDays } from 'app/shared/util/constant';
import './opportunities.scss';

export const Opportunities = (props: RouteComponentProps<{}>) => {
  const [opportunities, setOpportunities] = useState<IOpportunity[]>([]);
  const searchItems = useSelector((state: IRootState) => state.opportunity.searchEntities);
  const customerAccount = useSelector((state: IRootState) => state.authentication.customerAccount);

  const loading = useSelector((state: IRootState) => state.opportunity.loading);
  const [opportunity, setOpportunity] = useState<IOpportunity>({});
  const [showModal, setShowModal] = useState(false);
  const [screenWidth, setScreenWidth] = useState<number>(0);

  const dispatch = useDispatch();

  const resize = () => {
    setScreenWidth(window.innerWidth);
  }
  window.addEventListener("resize", resize);

  const toggle = () => {
    setShowModal(false);
  };
  const onViewDetails = (id: number) => {
    props.history.push(exploreDetail(id));
  };

  const opportunityApplication = val => {
    setOpportunity(val);
    setShowModal(true);
    dispatch(setPortifolioModal(true));
  };

  useEffect(() => {
    resize();
    setOpportunities(searchItems.opportunities);
  }, [searchItems]);


  return (
    <>
      <Row className="p-2 pb-4">
        {loading && opportunities && opportunities.length === 0 && <PageLoader />}
        {opportunities &&
          opportunities.map((val, i) => (
            <Col key={val.id} sm={screenWidth > 650 ? 6 : 12} md={screenWidth > 950 ? 4 : 6} className="p-2">
              <Card body className="opportunity">
                <Row>
                  <Col xs={{ size: 'auto' }} sm={{ size: 'auto' }} md={{ size: 'auto' }}>
                    <img src="content/images/opportunity.svg" />
                  </Col>
                  <Col className="pl-0">
                    <div className="name">{val.name}</div>
                    <div className="provider-label">{val.providerName}&nbsp;</div>
                    <div className="closing-date">{hideClosingDays(val.closingDays)}&nbsp;</div>
                    <Row className="item-alignment">
                      <Col xs="6" sm="6" md="6" className="item">
                        <div className="describe">
                          <Translate contentKey="explore.interest.rate">Interest Rate</Translate>
                        </div>
                        <div className="value green">{val.interestRate}%</div>
                      </Col>
                      <Col xs="6" sm="6" md="6" className="item">
                        <div className="describe">
                          <Translate contentKey="explore.tenor">Tenor</Translate>
                        </div>
                        <div className="value">{val.tenor}</div>
                      </Col>
                    </Row>
                    <Row className="item-alignment">
                      <Col xs="6" sm="6" md="6" className="item">
                        <div className="describe">
                          <Translate contentKey="explore.effective.apr">Effective APR</Translate>
                        </div>
                        <div className="value">{val.effectiveApr}%</div>
                      </Col>
                      <Col xs="6" sm="6" md="6" className="item">
                        <div className="describe">
                          <Translate contentKey="explore.minimum.investment">Minimum Investment</Translate>
                        </div>
                        <div className="value">
                          <NumberFormat value={val.minimumInvestment} displayType={'text'} thousandSeparator={true} prefix={'N'} />
                        </div>
                      </Col>
                    </Row>
                    <Row className="item-alignment">
                      <Col xs="6" sm="6" md="6">
                        {customerAccount.canApplyForOpportunities && <div className="view-details" onClick={() => onViewDetails(val.id)}>
                          <Translate contentKey="explore.view.details">View Details</Translate>
                          <img src="content/images/arrow.svg" />
                        </div>}&nbsp;
                      </Col>
                      <Col xs="6" sm="6" className="item-action">
                        {customerAccount.canApplyForOpportunities && <Button
                          className="btn btn-opportuunity"
                          onClick={() => {
                            opportunityApplication(val);
                          }}
                        >
                          <Translate contentKey="explore.apply">Apply</Translate>
                        </Button>}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
      </Row>
      <ApplicationModal showModal={showModal} toggle={toggle} data={opportunity} />
    </>
  );
};

export default withRouter(Opportunities);
