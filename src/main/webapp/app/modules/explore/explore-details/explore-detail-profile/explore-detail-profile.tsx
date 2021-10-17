import React, { useState } from 'react';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { Link } from 'react-router-dom';
import ApplicationModal from 'app/modules/explore/paymentModal/payment-modal';
import { IOpportunity } from 'app/shared/model/opportunity.model';
import { Route } from 'app/shared/model/enumerations/route.model';
import { hideClosingDays } from 'app/shared/util/constant';

import './explore-detail-profile.scss';

export interface IExploreDetailProps {
  data: IOpportunity;
}

const ExploreDetail = (props: IExploreDetailProps) => {
  const [showModal, setShowModal] = useState(false);

  const toggle = () => {
    setShowModal(false);
  };
  return (
    <Row className="detail-profile">
      <Col xs="7" sm="7" md="6" className="container-content">
        <div className="back-to-explore">
          <Link to={Route.EXPLORE}>
            <img src="content/images/arrow-left-details.svg" />
            <Translate contentKey="explore.back.to.explore">Bact to Explore</Translate>
          </Link>
        </div>
        <div className="opportunity-owner">
          <img src="content/images/opportunity.svg" />
          <div className="details">
            <div className="name">{props.data.name}</div>
            <div className="describe">{props.data.providerName}</div>
          </div>
        </div>
      </Col>
      <Col className="text-right container-content">
        <div className="closing-date">
          {hideClosingDays(props.data.closingDays)}&nbsp;
        </div>
        <Button
          className="btn btn-opportunity success-button"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <Translate contentKey="explore.apply">Apply</Translate>
        </Button>
      </Col>
      <ApplicationModal showModal={showModal} toggle={toggle} data={props.data} />
    </Row>
  );
};

export default ExploreDetail;
