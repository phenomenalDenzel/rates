import React from 'react';
import { Translate } from 'react-jhipster';
import { Row, Col, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import './sort-explore.scss';

const SortExplore = () => {
  return (
    <Row>
      <Col className="sort-content">
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle caret>
            <img src="content/images/sort-icon.svg" />
            <span className="highest-to">
              <Translate contentKey="explore.highest.to.lowest">Highest to lowest</Translate>
            </span>
          </DropdownToggle>
          <DropdownMenu className="downdown-link">
            <DropdownItem toggle={false} color="primary" outline className="downdown-link">
              <Translate contentKey="explore.incrementing">incrementing</Translate>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Col>
    </Row>
  );
};

export default SortExplore;
