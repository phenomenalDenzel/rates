import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';
import { Route } from 'app/shared/model/enumerations/route.model';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to={`${Route.BACKOFFICE}/local-govt`}>
      <Translate contentKey="global.menu.entities.localGovt" />
    </MenuItem>
    <MenuItem icon="asterisk" to={`${Route.BACKOFFICE}/location`}>
      <Translate contentKey="global.menu.entities.location" />
    </MenuItem>
    <MenuItem icon="asterisk" to={`${Route.BACKOFFICE}/verification`}>
      <Translate contentKey="global.menu.entities.verification" />
    </MenuItem>
    <MenuItem icon="asterisk" to={`${Route.BACKOFFICE}/customer`}>
      <Translate contentKey="global.menu.entities.customer" />
    </MenuItem>
    <MenuItem icon="asterisk" to={`${Route.BACKOFFICE}/next-of-kin`}>
      <Translate contentKey="global.menu.entities.nextOfKin" />
    </MenuItem>
    <MenuItem icon="asterisk" to={`${Route.BACKOFFICE}/wallet`}>
      <Translate contentKey="global.menu.entities.wallet" />
    </MenuItem>
    <MenuItem icon="asterisk" to={`${Route.BACKOFFICE}/wallet-operation`}>
      <Translate contentKey="global.menu.entities.walletOperation" />
    </MenuItem>
    <MenuItem icon="asterisk" to={`${Route.BACKOFFICE}/provider`}>
      <Translate contentKey="global.menu.entities.provider" />
    </MenuItem>
    <MenuItem icon="asterisk" to={`${Route.BACKOFFICE}/opportunity`}>
      <Translate contentKey="global.menu.entities.opportunity" />
    </MenuItem>
    <MenuItem icon="asterisk" to={`${Route.BACKOFFICE}/opportunity-document`}>
      <Translate contentKey="global.menu.entities.opportunityDocument" />
    </MenuItem>
    <MenuItem icon="asterisk" to={`${Route.BACKOFFICE}/application`}>
      <Translate contentKey="global.menu.entities.application" />
    </MenuItem>
    <MenuItem icon="asterisk" to={`${Route.BACKOFFICE}/employment-details`}>
      <Translate contentKey="global.menu.entities.employmentDetails" />
    </MenuItem>
    <MenuItem icon="asterisk" to={`${Route.BACKOFFICE}/otp`}>
      <Translate contentKey="global.menu.entities.otp" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
