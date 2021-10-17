import React from 'react';
import { Row, Col } from 'reactstrap';

import './sponsors.scss';

const Sponsors = () => {
  return (
    <Row className="sponsors">
      <Col xs="4" sm="4" md="2">
        <img src="content/images/new-york.svg" alt="rates" />
      </Col>
      <Col xs="4" sm="4" md="2">
        <img src="content/images/forbes.svg" alt="rates" />
      </Col>
      <Col xs="4" sm="4" md="2">
        <img src="content/images/apple.svg" alt="rates" style={{ maxWidth: '45%' }} />
      </Col>
      <Col xs="4" sm="4" md="2">
        <img src="content/images/mash.svg" alt="rates" />
      </Col>
      <Col xs="4" sm="4" md="2">
        <img src="content/images/wsj.svg" alt="rates" />
      </Col>
      <Col xs="4" sm="4" md="2">
        <img src="content/images/google.svg" alt="rates" />
      </Col>
    </Row>
  );
};

export default Sponsors;
