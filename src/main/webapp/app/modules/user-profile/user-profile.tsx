import React, { useState } from 'react';
import { Translate } from 'react-jhipster';
import { Container, Row, Col, Button, Card, TabContent, TabPane, Nav, NavItem, NavLink, CardTitle, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Route } from 'app/shared/model/enumerations/route.model';
import AccountProfile from './account-profile/account-profile';
import ChangePasswprd from './change-password/change-password';
import { UserProfileModel } from 'app/shared/model/enumerations/user-profile.model';

import './user-profile.scss';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState(UserProfileModel.USER_INFO);

  const toggle = (tab: UserProfileModel) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <Container fluid={true}>
      <Row className="user-profile">
        <Col >
          <Row>
            <Col xs={{ size: 'auto' }} sm={{ size: 'auto' }} md="12" className="container-content bgColor">
              <div className="previous-page">User Profile</div>
            </Col>
          </Row>
          <Row>
            <Col className="tabs-content container-content">
              <Nav>
                <NavItem className={activeTab === UserProfileModel.USER_INFO ? 'active-tab' : 'inactive-tab'}>
                  <NavLink
                    onClick={() => {
                      toggle(UserProfileModel.USER_INFO);
                    }}
                  >
                    <span className="tab-label">Acccount</span>
                  </NavLink>
                </NavItem>
                <NavItem className={activeTab === UserProfileModel.CHANGE_OF_PASSWORD ? 'active-tab' : 'inactive-tab'}>
                  <NavLink
                    onClick={() => {
                      toggle(UserProfileModel.CHANGE_OF_PASSWORD);
                    }}
                  >
                    <span className="tab-label">Change Password</span>
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
          <Row>
            <Col className="user-profile-container container-content">
              <TabContent activeTab={activeTab}>
                <TabPane tabId={UserProfileModel.USER_INFO}>
                  <AccountProfile />
                </TabPane>
                <TabPane tabId={UserProfileModel.CHANGE_OF_PASSWORD}>
                  <ChangePasswprd />
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
