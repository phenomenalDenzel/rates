import React from 'react';
import { Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { formateCurrency } from 'app/shared/util/formate-currency';
import { convertLocalDateTimeFromServer } from 'app/shared/util/date-utils';
import { IApplication } from 'app/shared/model/application.model';

import './portifolio-details.scss';

export interface IPortifolioDetailProps extends RouteComponentProps<{ url: string }> {
  portifolio?: IApplication;
}

const PortifolioDetails = (props: IPortifolioDetailProps) => {
  const detail = props.portifolio;
  if (!detail) return null;
  const { name, type, summary, fundSize, startDate, endDate, visible, interestRate, tenor, effectiveApr, minimumInvestment, providerName } =
    detail && detail.opportunity;

  return (
    <Row>
      <Col className="border-bottom-detail">
        <Row>
          <Col>
            <div className="portifolio-name">{name}</div>
            <div className="portifolio-desc">{providerName}</div>
          </Col>
          <Col className="text-right">
            <div className="total-earning">
              <Translate contentKey="dashboard.portifolio.total.earning">Total Projected Earnings</Translate>
            </div>
            <div className="amount-earned">{detail.amount}</div>
          </Col>
        </Row>
        <Row className="tab-details">
          <Col xs="12" sm="12" md="auto" className="portifolio-part detail-border">
            <div className="portifolio-fund-title">
              <Translate contentKey="dashboard.portifolio.fund.size">Fund size</Translate>
            </div>
            <div className="portifolio-fund-label">&nbsp;</div>
            <div className="portifolio-fund-amount">{fundSize}</div>
          </Col>
          <Col>
            <Row>
              <Col xs="12" sm="12" md="5" className="detail-border">
                <div className="portifolio-fund-title">
                  <Translate contentKey="dashboard.portifolio.earning.date">Earning to date</Translate>
                </div>
                <Row>
                  <Col xs="6" sm="6" md="auto" className="redemption-tenor">
                    <div className="portifolio-fund-label">
                      <Translate contentKey="dashboard.portifolio.value">value</Translate>
                    </div>
                    <div className="portifolio-fund-value">{detail.amount}</div>
                  </Col>
                  <Col xs="6" sm="6" md="auto">
                    <div className="portifolio-fund-label">
                      <Translate contentKey="dashboard.portifolio.interest.rate">Interest Rate</Translate>
                    </div>
                    <div className="portifolio-fund-value">{interestRate}%</div>
                  </Col>
                </Row>
              </Col>
              <Col xs="12" sm="12" md="7">
                <div className="portifolio-fund-title">
                  <Translate contentKey="dashboard.portifolio.next.redemption">Next Redemption</Translate>
                </div>
                <Row>
                  <Col xs="6" sm="6" md="auto" className="redemption-date">
                    <div className="portifolio-fund-label">
                      <Translate contentKey="dashboard.portifolio.date">Date</Translate>
                    </div>
                    <div className="portifolio-fund-value">{convertLocalDateTimeFromServer(endDate)}</div>
                  </Col>
                  <Col xs="6" sm="6" md="auto" className="redemption-tenor">
                    <div className="portifolio-fund-label">
                      <Translate contentKey="dashboard.portifolio.value">value</Translate>
                    </div>
                    <div className="portifolio-fund-value">{tenor}</div>
                  </Col>
                  <Col md="auto" className="redemption-issue">
                    <div className="portifolio-fund-label">
                      <Translate contentKey="dashboard.portifolio.issue">Issue</Translate>
                    </div>
                    <div className="portifolio-fund-value">{providerName}</div>
                  </Col>
                </Row>
              </Col>

            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default withRouter(PortifolioDetails);
