import React from 'react';
import { Translate } from 'react-jhipster';
import { Row, Col } from 'reactstrap';

import './how-it-work.scss';

const HowItWork = props => {
  return (
    <Row className="content">
      <Col className="text-center">
        <div>
          <img src="content/images/how-it-work.svg" alt="iphone" />
        </div>
        <div className="how-it-works">
          <Translate contentKey="home.howitwork.title">How it works</Translate>
        </div>
        <div className="instructions">
          <span className="instruction-no">
            <Translate contentKey="home.howitwork.instruction.no_1">1.</Translate>
          </span>
          <Translate contentKey="home.howitwork.instruction.signUpInvestmentWallet">
            Compare different Fixed Income opportunities from across the market.
          </Translate>
          <span className="instruction-no">
            <Translate contentKey="home.howitwork.instruction.no_2">2.</Translate>
          </span>
          <Translate contentKey="home.howitwork.instruction.fundInvestmentWallet">Invest directly on the platform.</Translate>
          <span className="instruction-no">
            <Translate contentKey="home.howitwork.instruction.no_3">3.</Translate>
          </span>
          <Translate contentKey="home.howitwork.instruction.browseInvestment">
            Manage your portfolio - view and monitor all your investments in place.
          </Translate>
        </div>
        <div className="instructions">
          <span className="instruction-no">
            <Translate contentKey="home.howitwork.instruction.no_4">4.</Translate>
          </span>
          <Translate contentKey="home.howitwork.instruction.selectInvestment">Reinvest or withdraw earnings easily.</Translate>
        </div>
      </Col>
    </Row>
  );
};

export default HowItWork;
