import React, { useEffect } from 'react';
import {
  Row, Col, Card
} from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';

import { getCustomerDashboard } from 'app/entities/customer/customer.reducer';
import { IRootState } from 'app/shared/reducers';
import './overview.scss';


const Overview = () => {
  const dispatch = useDispatch();
  const dashboard = useSelector((state: IRootState) => state.customer && state.customer.dashboard);

  useEffect(() => {
    dispatch(getCustomerDashboard())
  }, []);
  const icon = <img src="content/images/mail-bulk-solid.svg" alt="mail-bulk" className="desc-icon" />
  return (
    <>
      <Row>
        <Col sm="12" md="12" className="container-content overview">
          <Card body className="pl-4 pr-4">
            <Row>
              <Col sm="6" md="3" className="overview-item">
                <div className="item">
                  <div className="title">
                    <Translate contentKey="dashboard.overview.portifolio.overview">
                      Portfolio Overview
                    </Translate>
                  </div>
                  <div>
                    <div className="value-content">
                      <img src="content/images/portfolio.svg" alt="iphone" />
                      <div className="value">{dashboard.summary && dashboard.summary.totalActivePortfolio}</div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col sm="6" md="3" className="overview-item">
                <div className="item">
                  <div className="title">
                    <Translate contentKey="dashboard.overview.earning.till.date">
                      Earning till date
                </Translate>
                  </div>
                  <div className="value-content">
                    <img src="content/images/invest.svg" alt="iphone" />
                    <div className="value">{dashboard.summary && dashboard.summary.earnings}</div>
                  </div>
                </div>
              </Col>
              <Col sm="6" md="3" className="overview-item">
                <div className="item">
                  <div className="title">
                    <Translate contentKey="dashboard.overview.total.investment">
                      Total Investment
                    </Translate>
                  </div>
                  <div className="value-content">
                    <img src="content/images/investing.svg" alt="iphone" />
                    <div className="value">{dashboard.summary && dashboard.summary.totalInvestment}</div>
                  </div>
                </div>
              </Col>
              <Col sm="6" md="3" className="overview-item">
                <div className="item">
                  <div className="title">
                    <Translate contentKey="dashboard.overview.total.deposit">
                      Total Deposit
                    </Translate>
                  </div>
                  <div className="value-content">
                    <img src="content/images/saving.svg" alt="iphone" />
                    <div className="value">{dashboard.summary && dashboard.summary.totalDeposits}</div>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Overview;
