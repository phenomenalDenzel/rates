import React from 'react';
import { Translate } from 'react-jhipster';
import { Row, Col } from 'reactstrap';

import './benefits.scss';

const Benefits = () => {
  return (
    <Row>
      <Col sm="12" md="6" className="benefit-content whiteBg">
        <div className="benefits">
          <Translate contentKey="home.benefits.header">Benefits of using rates.ng</Translate>
        </div>
        <Row className="benefit-alignment">
          <Col xs="2" sm="2" md="2">
            <img src="content/images/benefit-icon.svg" alt="iphone" />
          </Col>
          <Col xs="10" sm="10" md="10" className="align-benefit">
            <div className="benefit-title">
              <Translate contentKey="home.benefits.sub.title1">Earn more and simplify your life</Translate>
            </div>
            <div className="benefit-desc">
              <Translate contentKey="home.benefits.sub.description1">
                Compare and choose rates and terms from a broad range of institutions in one place.
              </Translate>
            </div>
          </Col>
        </Row>
        <Row className="benefit-alignment">
          <Col xs="2" sm="2" md="2">
            <img src="content/images/benefit-icon.svg" alt="iphone" />
          </Col>
          <Col xs="10" sm="10" md="10" className="align-benefit">
            <div className="benefit-title">
              <Translate contentKey="home.benefits.sub.title2">Earn more and simplify your life</Translate>
            </div>
            <div className="benefit-desc">
              <Translate contentKey="home.benefits.sub.description2">
                Compare and choose rates and terms from a broad range of institutions in one place.
              </Translate>
            </div>
          </Col>
        </Row>
        <Row className="benefit-alignment">
          <Col xs="2" sm="2" md="2">
            <img src="content/images/benefit-icon.svg" alt="iphone" />
          </Col>
          <Col xs="10" sm="10" md="10" className="align-benefit">
            <div className="benefit-title">
              <Translate contentKey="home.benefits.sub.title3">Earn more and simplify your life</Translate>
            </div>
            <div className="benefit-desc">
              <Translate contentKey="home.benefits.sub.description3">
                Compare and choose rates and terms from a broad range of institutions in one place.
              </Translate>
            </div>
          </Col>
        </Row>
        <Row className="benefit-alignment">
          <Col xs="2" sm="2" md="2">
            <img src="content/images/benefit-icon.svg" alt="iphone" />
          </Col>
          <Col xs="10" sm="10" md="10" className="align-benefit">
            <div className="benefit-title">
              <Translate contentKey="home.benefits.sub.title4">Earn more and simplify your life</Translate>
            </div>
            <div className="benefit-desc">
              <Translate contentKey="home.benefits.sub.description4">
                Compare and choose rates and terms from a broad range of institutions in one place.
              </Translate>
            </div>
          </Col>
        </Row>
      </Col>
      <Col sm="12" md="6" className="benefit-content greeBG">
        <Row>
          <Col>
            <div className="benefit-percent text-center">
              <Translate contentKey="home.benefits.invest.percent1">500%</Translate>
            </div>
            <div className="benefit-percent-desc text-center">
              <Translate contentKey="home.benefits.invest.value1">Rates.ng investors</Translate>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs="6" sm="6" md="6" className="benefits-m">
            <div className="benefit-percent">
              <Translate contentKey="home.benefits.invest.percent2">25%</Translate>
            </div>
            <div className="benefit-percent-desc inflation">
              <Translate contentKey="home.benefits.invest.value2">Inflation</Translate>
            </div>
          </Col>
          <Col xs="6" sm="6" md="6" className="benefits-m text-right">
            <div className="benefit-percent">
              <Translate contentKey="home.benefits.invest.percent3">25%</Translate>
            </div>
            <div className="benefit-percent-desc">
              <Translate contentKey="home.benefits.invest.value3">Broader market</Translate>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Benefits;
