import React from 'react';
import { shallow } from 'enzyme';

import Explore from 'app/modules/explore/explore';
import ExploreSearch from 'app/modules/explore/explore-search/explore-search';
import SortExplore from 'app/modules/explore/sort-explore/sort-explore';
import Opportunities from 'app/modules/explore/opportunities/opportunities';
import { renderer } from '../../utils';
import { IRootState } from 'app/shared/reducers';

const initialState: DeepPartial<IRootState> = {
  opportunity: {
    searchEntities: {},
  },
  application: {
    updating: false,
    entity: {
      amount: 4000,
    },
  },
  authentication: {
    customerAccount: {
      walletId: 2,
    },
  },
};

describe('Explore', () => {
  it('Renders content of the component ', () => {
    const { component } = renderer()
      .withRouter()
      .withRedux(initialState)
      .render(<Explore />);
    expect(component.find('Container')).toHaveLength(1);
    expect(component.find('Row')).toHaveLength(5);
    expect(component.find(ExploreSearch)).toHaveLength(1);
    expect(component.find(Opportunities)).toHaveLength(1);
  });
});
