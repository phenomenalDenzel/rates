import React from 'react';
import { Row, Col, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from 'reactstrap';

import SearchExplore from 'app/modules/explore/explore-search/explore-search';
import { renderer } from '../../utils';
import { IRootState } from 'app/shared/reducers';

const initialState: DeepPartial<IRootState> = {
  opportunity: {
    searchEntities: {
      facets: [{ key: 'my key', terms: [{ term: 'my term', count: 2 }] }],
    },
  },
};

describe('Explore', () => {
  it('Renders content of the component ', () => {
    const { component } = renderer()
      .withRouter()
      .withRedux(initialState)
      .render(<SearchExplore />);
    expect(component.find(Row)).toHaveLength(2);
    expect(component.find(Col)).toHaveLength(4);
    expect(component.find(UncontrolledDropdown)).toHaveLength(1);
    expect(component.find(DropdownToggle)).toHaveLength(1);
    expect(component.find(DropdownMenu)).toHaveLength(1);
    expect(component.find(DropdownItem)).toHaveLength(1);
    expect(component.find(Input)).toHaveLength(1);
    expect(component.find('label')).toHaveLength(1);
  });
});
