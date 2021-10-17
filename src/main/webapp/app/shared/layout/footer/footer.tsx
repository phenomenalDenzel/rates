import React from 'react';
import { Translate } from 'react-jhipster';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';

import { Brand } from 'app/shared/layout/header/header-components';
import './footer.scss';

const Footer = props => (
  <Row className="whiteBg">
    <Col className="container-content pb-5">
      <Row>
        <Col className="footer-list">
          <div>
            <Translate contentKey="home.footer.list.item9">About Us</Translate>
          </div>
          <div className="social-media">
            <img src="content/images/linkin.svg" alt="iphone" />
            <img src="content/images/facebook.svg" alt="iphone" />
            <img src="content/images/instagram.svg" alt="iphone" />
            <img src="content/images/twitter.svg" alt="iphone" />
          </div>
        </Col>
        <Col md="auto" className="terms-and-conditions">
          <div>
            <Brand />
          </div>
          <div>
            <Translate contentKey="home.footer.termandcondtion">Rates.ng Terms and Conditions</Translate>
          </div>
          <div>
            <Translate contentKey="home.footer.disclosure">Disclosure Library</Translate>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="reserved-right">
            <Translate contentKey="home.footer.reservedright">© 2019 Rates.ng All rights reserved.</Translate>
          </div>
          <div className="footer-note">
            <div className="mb-3">
              <Translate contentKey="home.footer.note">
                RatesNG is an alternative investment marketplace owned and operated by [Name of Company], a private company duly registered
                under the extant law regulating business and non-business organizations in Nigeria, with registered company number - xxx.
              </Translate>
            </div>
            <div className="mb-3">
              <Translate contentKey="home.footer.about.text1">
                It is important that you are aware that RatesNG does not give investment advice or recommend any securities, as it is not
                registered as an Exchange, Dealer, Broker, Broker/Dealer, Alternative Trading Facility, Crowdfunding Portal or investment
                adviser with the Securities and Exchange Commission in Nigeria.
              </Translate>
            </div>
            <div>
              <Translate contentKey="home.footer.about.text2">
                The use and access to RatesNG are regulated by our Terms of Use and Privacy Policy. We enjoin you to read through these
                documents before proceeding to subscribe to any offers listed on this website and also read our About Us summarizing how
                we operate as an alternative investment marketplace.
              </Translate>
            </div>
          </div>
          <div className="important-disclosure">
            <img src="content/images/ellipse.svg" alt="iphone" />
            <span className="risk-disclosure">
              <Translate contentKey="home.footer.riskdisclosure">View important disclosures</Translate>
            </span>
          </div>
        </Col>
      </Row>
    </Col>
  </Row>
);

export default Footer;
