import React from 'react';
import { Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';

import './manage.scss';

const Manage = () => {
  return (
    <Row className="whiteBg">
      <Col sm="12" md="6" className="pl-0 pr-0">
        <img src="content/images/manage.svg" alt="iphone" className="manage-img" />
      </Col>
      <Col className="manage-content">
        <div className="manage-text">
          <Translate contentKey="home.manage.title">Manage your fixed income assets</Translate>
        </div>
        <div className="manage-desc">
          <Translate contentKey="home.manage.description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam.
          </Translate>
        </div>
        <div className="learn-more-div">
          <button className="btn learn-more-btn">
            <Translate contentKey="home.manage.learnmore">Learn More</Translate>
          </button>
        </div>
        <div>
          <img src="content/images/ellipse.svg" alt="iphone" />
          <span className="risk-disclosure">
            <Translate contentKey="home.manage.risk">Risk Disclosure</Translate>
          </span>
        </div>
      </Col>
    </Row>
  );
};

export default Manage;
