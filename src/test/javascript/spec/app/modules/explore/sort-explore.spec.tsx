import React from 'react';

import SortExplore from 'app/modules/explore/sort-explore/sort-explore';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { renderer } from '../../utils';
import { IRootState } from 'app/shared/reducers';

const initialState: DeepPartial<IRootState> = {
  opportunity: {
    searchEntities: {},
  },
};
describe('Explore', () => {
  it('Renders content of the component ', () => {
    const { component } = renderer()
      .withRouter()
      .withRedux(initialState)
      .render(<SortExplore />);
    expect(component.find('Row')).toHaveLength(1);
    expect(component.find('Col')).toHaveLength(1);
    expect(component.find(Dropdown)).toHaveLength(1);
    expect(component.find(DropdownToggle)).toHaveLength(1);
    expect(component.find(DropdownMenu)).toHaveLength(1);
    expect(component.find(DropdownItem)).toHaveLength(1);
  });
});
