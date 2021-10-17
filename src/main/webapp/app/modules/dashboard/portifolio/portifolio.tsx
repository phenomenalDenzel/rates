import React, { useState } from 'react';
import { Translate } from 'react-jhipster';
import { Row, Col, Card } from 'reactstrap';
import { useSelector } from 'react-redux';

import PortifolioDetails from './portifolio-details/portifolio-details';
import PortifolioList from './portifolio-list/portifolio-list';
import { IApplication } from 'app/shared/model/application.model';
import { IRootState } from 'app/shared/reducers';
import PageLoader from 'app/shared/util/pageLoader';

import './portifolio.scss';

const Portifolio = () => {
  const [portifiolo, setPortifiolo] = useState(null);
  const loading = useSelector((state: IRootState) => state.application.loading);
  const entities = useSelector((state: IRootState) => state.application.applicationEntities);
  const user = useSelector((state: IRootState) => state.authentication.customerAccount);

  const getPortifolio = (myPortifolio: IApplication) => {
    setPortifiolo(myPortifolio);
  };
  return (
    <Row>
      <Col className="container-content">
        <Row>
          <Col>
            <div className="account-summary">
              <Translate contentKey="dashboard.portifolio.my.portifolio">My Porfolio</Translate>
            </div>
            <div className="check-account">
              <Translate contentKey="dashboard.portifolio.check.account">Check your account balance</Translate>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="mb-5">
            <Card body className="p-0">
              <Row className="portifolio">
                {user && user.id && (
                  <>
                    <Col xs="12" sm="12" md="3">
                      <PortifolioList getPortifolio={getPortifolio} userId={user.id} />
                    </Col>
                    {portifiolo && <Col xs="12" sm="8" md="9" className="portifolio-details d-none d-md-block">
                      <PortifolioDetails portifolio={portifiolo} />
                    </Col>}
                  </>
                )}
                {!loading && entities && entities.length === 0 && (
                  <Col sm="12" md="12" className="empty-state">
                    <img src="content/images/empty-application.svg" alt="empty state" />
                    <span>You dont have any portifolio yet</span>
                  </Col>
                )}
                {loading && !entities && (
                  <Col sm="12" md="12" className="empty-state">
                    <PageLoader />
                    ...Loading
                </Col>
                )}
              </Row>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Portifolio;
