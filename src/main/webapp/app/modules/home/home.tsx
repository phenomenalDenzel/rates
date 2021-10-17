import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Translate } from 'react-jhipster';
import { Container, Row, Col } from 'reactstrap';
import { withRouter } from 'react-router';
import { IRootState } from 'app/shared/reducers';

import { AnimateLeft, AnimateUp } from 'app/shared/util/constant';
import Header from 'app/shared/layout/header/header-logout';
import Sponsors from 'app/modules/sponsors/sponsors';
import Benefits from 'app/modules/benefits/benefits';
import HowItWork from 'app/modules/how-it-work/how-it-work';
import Manage from 'app/modules/manage/manage';
import Footer from 'app/shared/layout/footer/footer';
import { setAuthNavType } from 'app/shared/reducers/authentication';
import { LoginType } from 'app/shared/model/enumerations/login-type.model';
import { Route } from 'app/shared/model/enumerations/route.model';

import './home.scss';

const Home = props => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: IRootState) => state.authentication.isAuthenticated);

  const setNavType = type => {
    dispatch(setAuthNavType(type));
    props.history.push(Route.LOGIN);
  };

  return (
    <Container fluid={true}>
      <Row>
        <Col sm="12" md="6" className="content top-alignment">
          <Row>
            <Col className="text-center">
              <div className="know-rate">
                <Translate contentKey="home.title">
                  Know
                  <br />
                  Your
                  <br />
                  Rates
                </Translate>
              </div>
              <div className="compare-invest">
                <Translate contentKey="home.compareinvest">Compare and invest in selected fixed income assets</Translate>
              </div>
              {!isAuthenticated && (
                <div>
                  <button type="button" className="btn btn-config success-button" onClick={() => setNavType(LoginType.REGISTRATION)}>
                    <Translate contentKey="home.createaccount">Create account</Translate>
                  </button>
                  <button className="btn btn-config default-button" onClick={() => setNavType(LoginType.LOGIN)}>
                    <Translate contentKey="home.login">Log in</Translate>
                  </button>
                </div>
              )}
            </Col>
          </Row>
        </Col>
        <Col sm="12" md="6" className="d-none d-md-block top-alignment">
          <div className="d-flex justify-content-center">
            <img src="content/images/iPhonex.svg" alt="iphone" className="iphone" />
          </div>
        </Col>
      </Row>
      <Sponsors />
      <Benefits />
      <HowItWork />
      <Manage />
      <Footer />
    </Container>
  );
};

export default withRouter(Home);
