import React, { Component } from 'react';
import { Translate } from 'react-jhipster';
import { Container, Row, Col } from 'reactstrap';

import ExploreSearch from 'app/modules/explore/explore-search/explore-search';
import Opportunities from 'app/modules/explore/opportunities/opportunities';

import './explore.scss';

const Explore = () => {
  return (
    <Container fluid={true}>
      <Row>
        <Col className="greeting-body container-content pb-1">
          <span className="greeting">
            <Translate contentKey="explore.greeting">Explore through our portifolio of mutual funds</Translate>
          </span>
        </Col>
      </Row>
      <ExploreSearch />
      <Row>
        <Col className="explore-container container-content">
          <Opportunities />
        </Col>
      </Row>
    </Container>
  );
};

export default Explore;
