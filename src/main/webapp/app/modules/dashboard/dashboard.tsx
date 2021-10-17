import React from 'react';
import { Translate } from 'react-jhipster';
import { Container, Row, Col } from 'reactstrap';
import { useSelector } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { Route } from 'app/shared/model/enumerations/route.model';

import Overview from 'app/modules/dashboard/overview/overview';
import Portifolio from 'app/modules/dashboard/portifolio/portifolio';
import { IRootState } from 'app/shared/reducers';

import './dashboard.scss';

const Dashboard = () => {
  const history = useHistory();
  const account = useSelector((state: IRootState) => state.authentication.account);

  return (
    <>
      <Container fluid={true}>
        <Row>
          <Col>
            <Row>
              <Col className="greeting-body container-content">
                <span className="greeting">
                  <Translate contentKey="dashboard.hi">Hi </Translate>
                  <span className="grey-color">{account.firstName}, </span>
                  <Translate contentKey="dashboard.greetings">looks like you are doing great</Translate>
                </span>
                <span className="view-profile" onClick={() => history.push(Route.USER_PROFILE)}>
                  <Translate contentKey="dashboard.view.profile">VIEW PROFILE</Translate>
                </span>
              </Col>
            </Row>

            <Overview />
            <Portifolio />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
