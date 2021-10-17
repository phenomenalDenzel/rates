import React, { useState } from 'react';
import { Translate } from 'react-jhipster';
import classNames from 'classnames';
import { Collapse, NavItem, NavLink, Nav, Row, Col, DropdownItem, Input } from 'reactstrap';
import { FilterParameters } from 'app/shared/model/searchOpportunity.model';
import { AnimateLeft } from 'app/shared/util/constant';

import './sidebar.scss';

const searchParams = {
  interestRate: <Translate contentKey="explore.interest.Rate" />,
  tenor: <Translate contentKey="explore.tenor" />,
  provider: <Translate contentKey="global.menu.entities.provider" />,
  effectiveApr: <Translate contentKey="explore.effective.apr" />,
  minimumInvestment: <Translate contentKey="explore.minimum.investment" />,
  type: <Translate contentKey="explore.type" />,
};
interface ISidebar {
  isOpen?: boolean;
  toggle?: () => void;
  reset?: () => void;
  facets?: FilterParameters[];
  filter?: (key?: string, item?: string) => void;
  selectedItem?: string[];
}
const SideBar = (props: ISidebar) => {
  const [selected, setSelected] = useState<string>('');
  const collapsed = key => (selected === key ? setSelected('') : setSelected(key));

  return (
    props.isOpen ? (<Row >
      <Col className="m-0 p-0 ">
        <div className={`sidebar is-open  ${AnimateLeft()}`}>
          <div className="sidebar-header">
            <Translate contentKey="explore.filter">Filter</Translate>
            <span className="times-icon" onClick={props.toggle}>
              &times;
            </span>
          </div>
          <div className="side-menu">
            <Nav vertical className="list-unstyled pb-3">
              {props.facets.map(facet => {
                return (
                  <div className="sub-menu" key={facet.key}>
                    <NavItem
                      onClick={() => {
                        collapsed(facet.key);
                      }}
                      className={classNames({ 'menu-open': !collapsed })}
                    >
                      <NavLink className="dropdown-toggle">{searchParams[facet.key]}</NavLink>
                    </NavItem>
                    <Collapse isOpen={selected === facet.key} navbar className={classNames('items-menu', { 'mb-1': !collapsed })}>
                      {facet.terms.map((item, index) => (
                        <DropdownItem toggle={false} color="primary" key={item.term + index} outline className="downdown-link facet-menu">
                          <span className="cursor" onClick={() => props.filter(facet.key, item.term)}>
                            <Input type="checkbox" checked={props.selectedItem.includes(item.term)} />
                            <label>{item.term}</label>
                          </span>
                          <span>({item.count})</span>
                        </DropdownItem>
                      ))}
                    </Collapse>
                  </div>
                );
              })}
              <div className="sub-menu">
                <NavItem
                  onClick={() => props.reset()}
                >
                  <NavLink>Reset</NavLink>
                </NavItem>
              </div>
            </Nav>
          </div>
        </div>
      </Col>
    </Row>) : null
  );
};

export default SideBar;
