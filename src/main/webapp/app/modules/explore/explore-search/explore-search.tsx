import React, { useState, useEffect } from 'react';
import { Translate } from 'react-jhipster';
import { Row, Col, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Label, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { postSearchEntities } from 'app/entities/opportunity/opportunity.reducer';
import { FilterParameters, FilterOpportunities } from 'app/shared/model/searchOpportunity.model';
import SideBar from './sidebar/sidebar';

import './explore-search.scss';

const searchParams = {
  interestRate: <Translate contentKey="explore.interest.Rate" />,
  tenor: <Translate contentKey="explore.tenor" />,
  provider: <Translate contentKey="global.menu.entities.provider" />,
  effectiveApr: <Translate contentKey="explore.effective.apr" />,
  minimumInvestment: <Translate contentKey="explore.minimum.investment" />,
  type: <Translate contentKey="explore.type" />,
};
const ExploreSearch = () => {
  const [sidebarIsOpen, setSidebarOpen] = useState<boolean>(false);

  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  const [options, setOptions] = useState<FilterOpportunities[]>([]);
  const [facets, setFacets] = useState<FilterParameters[]>([]);
  const dispatch = useDispatch();
  const searchItems = useSelector((state: IRootState) => state.opportunity.searchEntities);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

  const reset = () => {
    setOptions([]);
    setSelectedItem([]);
    dispatch(postSearchEntities([]));
  };
  useEffect(() => {
    dispatch(postSearchEntities([]));
  }, []);

  useEffect(() => {
    if (searchItems.facets) {
      let newFacets = [];
      if (facets.length > 0) {
        const optionMap = {};
        newFacets = [...facets];
        options.forEach(value => (optionMap[value.key] = value.key));
        searchItems.facets.forEach((facet, i) => {
          if (optionMap[facet.key] !== facet.key) {
            newFacets[i].terms = facet.terms;
          }
        });
      } else {
        newFacets = [...searchItems.facets];
      }
      setFacets(newFacets);
    }
  }, [searchItems.facets]);

  const modifyOption = (index: number, item: string) => {
    const optionArray = options;
    const itIndex = optionArray[index].selectedValues.indexOf(item);
    if (itIndex > -1) {
      const ind = selectedItem.indexOf(item);
      selectedItem.splice(ind, 1);
      setSelectedItem(selectedItem);
      optionArray[index]['selectedValues'].splice(itIndex, 1);
      optionArray[index]['selectedValues'].length === 0 && optionArray.splice(index, 1);
    } else {
      selectedItem.push(item);
      setSelectedItem(selectedItem);
      optionArray[index]['selectedValues'].push(item);
    }
    setOptions(optionArray);
  };

  const addNewKey = (key: string, item: string) => {
    const optionArray = options;
    const newOption = { key, selectedValues: [item] };
    optionArray.push(newOption);
    selectedItem.push(item);
    setSelectedItem(selectedItem);
    setOptions(optionArray);
  };

  const filter = (key: string, item: string) => {
    let index = null;
    if (options.length > 0) {
      for (let i = 0; i < options.length; i++) {
        if (options[i] && options[i]['key'] === key) {
          index = i;
          break;
        }
      }
    }

    index !== null ? modifyOption(index, item) : addNewKey(key, item);
    dispatch(postSearchEntities(options));
  };

  return (
    <>
      <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} facets={facets} filter={filter} selectedItem={selectedItem} reset={reset} />
      <Row className="searct-content">
        <Col className="container-content search-items">
          <Row>
            {facets.map((value, i) => {
              return (
                <Col
                  xs={{ size: i > 3 ? 'auto' : 4 }}
                  sm={{ size: i > 3 ? 'auto' : 4 }}
                  md={{ size: 'auto' }}
                  className="d-none d-md-block"
                  key={value.key + i}
                >
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle caret className="options-dropdown">
                      {searchParams[value.key]}
                    </DropdownToggle>
                    <DropdownMenu className="downdown-link">
                      {value.terms.map((val, n) => {
                        return (
                          <DropdownItem toggle={false} color="primary" key={val.term + n} outline className="downdown-link facet-menu">
                            <span className="cursor" onClick={() => filter(value.key, val.term)}>
                              <Input type="checkbox" checked={selectedItem.includes(val.term)} />
                              <label>{val.term}</label>
                            </span>
                            <span>({val.count})</span>
                          </DropdownItem>
                        );
                      })}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Col>
              );
            })}

            <Col className="reset-button d-none d-md-block">
              <div className="options-dropdown" onClick={reset}>
                <Translate contentKey="explore.reset">Clear</Translate>
              </div>
            </Col>

            <Col className="filter-btn" onClick={toggleSidebar}>
              <FontAwesomeIcon icon="search" className="filter-icon" />
              <Translate contentKey="explore.filter">Filter</Translate>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default ExploreSearch;
