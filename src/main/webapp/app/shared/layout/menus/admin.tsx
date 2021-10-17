import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';
import { Translate, translate } from 'react-jhipster';
import { Route } from 'app/shared/model/enumerations/route.model';

const adminMenuItems = (
  <>
    <MenuItem icon="user" to={`${Route.BACKOFFICE}/admin/user-management`}>
      <Translate contentKey="global.menu.admin.userManagement">User management</Translate>
    </MenuItem>
    <MenuItem icon="tachometer-alt" to={`${Route.BACKOFFICE}/admin/metrics`}>
      <Translate contentKey="global.menu.admin.metrics">Metrics</Translate>
    </MenuItem>
    <MenuItem icon="heart" to={`${Route.BACKOFFICE}/admin/health`}>
      <Translate contentKey="global.menu.admin.health">Health</Translate>
    </MenuItem>
    <MenuItem icon="list" to={`${Route.BACKOFFICE}/admin/configuration`}>
      <Translate contentKey="global.menu.admin.configuration">Configuration</Translate>
    </MenuItem>
    <MenuItem icon="bell" to={`${Route.BACKOFFICE}/admin/audits`}>
      <Translate contentKey="global.menu.admin.audits">Audits</Translate>
    </MenuItem>
    {/* jhipster-needle-add-element-to-admin-menu - JHipster will add entities to the admin menu here */}
    <MenuItem icon="tasks" to={`${Route.BACKOFFICE}/admin/logs`}>
      <Translate contentKey="global.menu.admin.logs">Logs</Translate>
    </MenuItem>
  </>
);

const swaggerItem = (
  <MenuItem icon="book" to={`${Route.BACKOFFICE}/admin/docs`}>
    <Translate contentKey="global.menu.admin.apidocs">API</Translate>
  </MenuItem>
);

const databaseItem = (
  <DropdownItem tag="a" href="./h2-console" target="_tab">
    <FontAwesomeIcon icon="hdd" fixedWidth /> <Translate contentKey="global.menu.admin.database">Database</Translate>
  </DropdownItem>
);

export const AdminMenu = ({ showSwagger, showDatabase }) => (
  <NavDropdown icon="user-plus" name={translate('global.menu.admin.main')} style={{ width: '140%' }} id="admin-menu">
    {adminMenuItems}
    {showSwagger && swaggerItem}

    {showDatabase && databaseItem}
  </NavDropdown>
);

export default AdminMenu;
