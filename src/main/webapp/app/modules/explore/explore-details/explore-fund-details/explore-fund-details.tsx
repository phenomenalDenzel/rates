import React from 'react';
import { Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';

import { IOpportunity } from 'app/shared/model/opportunity.model';

import './explore-fund-details.scss';

export interface IFundDetailsProps {
  data: IOpportunity;
}

const FundDetails = (props: IFundDetailsProps) => {
  const { summary, tenor, effectiveApr, fundSize, providerName, interestRate, minimumInvestment } = props.data;
  return (
    <Row>
      <Col className="fund-details">
        <Row>
          <Col className="container-content">
            <div className="summary-title">
              <Translate contentKey="explore.investment.summary">Investment Summary</Translate>
            </div>
            <div className="summary">{summary}</div>
          </Col>
        </Row>

        <Row>
          <Col className="container-content">
            <Row>
              <Col className="investment-details">
                <div className="fund-title">
                  <div className="name">
                    <Translate contentKey="explore.fund.details">Fund Details</Translate>
                  </div>
                  <div className="prospectus">
                    <Translate contentKey="explore.prospectus">Get Prospectus</Translate>
                  </div>
                </div>

                <Row>
                  <Col xs="4" sm="4" md="2">
                    <div className="describe">
                      <Translate contentKey="explore.tenor">Tenor</Translate>
                    </div>
                    <div className="value">{tenor}</div>
                  </Col>
                  <Col xs="4" sm="4" md="2">
                    <div className="describe">
                      <Translate contentKey="explore.effective.apr">Effective APR</Translate>
                    </div>
                    <div className="value">{effectiveApr}</div>
                  </Col>
                  <Col xs="4" sm="4" md="2">
                    <div className="describe">
                      <Translate contentKey="explore.minimum.investment">Minimum investment</Translate>
                    </div>
                    <div className="value">{minimumInvestment}</div>
                  </Col>
                  <Col xs="4" sm="4" md="2">
                    <div className="describe">
                      <Translate contentKey="explore.trustee">Trustee</Translate>
                    </div>
                    <div className="value">{providerName}</div>
                  </Col>
                  <Col xs="4" sm="4" md="2">
                    <div className="describe">
                      <Translate contentKey="explore.fund.size">Fund size</Translate>
                    </div>
                    <div className="value">{fundSize}</div>
                  </Col>
                  <Col xs="4" sm="4" md="2">
                    <div className="describe">
                      <Translate contentKey="explore.interest.rate">Interest rate</Translate>
                    </div>
                    <div className="value">{interestRate}</div>
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

export default FundDetails;
