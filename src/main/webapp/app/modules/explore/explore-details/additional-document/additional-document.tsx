import React from 'react';
import { Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';

import './additional-document.scss';

const AdditionalDocument = () => {
  return (
    <Row className="additional-document">
      <Col className="container-content">
        <div className="name mb-2">
          <Translate contentKey="explore.additional.documents">Additional documents</Translate>
        </div>
        <Row>
          <Col xs="2" sm="2" md="1" className="text-center">
            <img src="content/images/file-icon2.svg" alt="file-icon" />
            <div className="describe">
              <Translate contentKey="explore.document1">document1</Translate>
            </div>
          </Col>
          <Col xs="2" sm="2" md="1" className="text-center">
            <img src="content/images/file-icon2.svg" alt="file-icon" />
            <div className="describe">
              <Translate contentKey="explore.document1">document1</Translate>
            </div>
          </Col>
          <Col xs="2" sm="2" md="1" className="text-center">
            <img src="content/images/file-icon2.svg" alt="file-icon" />
            <div className="describe">
              <Translate contentKey="explore.document1">document1</Translate>
            </div>
          </Col>
          <Col xs="2" sm="2" md="1" className="text-center">
            <img src="content/images/file-icon2.svg" alt="file-icon" />
            <div className="describe">
              <Translate contentKey="explore.document1">document1</Translate>
            </div>
          </Col>
          <Col xs="2" sm="2" md="1" className="text-center">
            <img src="content/images/file-icon2.svg" alt="file-icon" />
            <div className="describe">
              <Translate contentKey="explore.document1">document1</Translate>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default AdditionalDocument;
