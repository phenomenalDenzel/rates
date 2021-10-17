import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { BrowserRouter as Router } from 'react-router-dom';

import PortifolioList from 'app/modules/dashboard/portifolio/portifolio-list/portifolio-list';
import { renderer } from '../../utils';
import { IRootState } from 'app/shared/reducers';

const initialState: DeepPartial<IRootState> = {
  application: {
    applicationEntities: [
      { id: 1, opportunity: { name: 'name 1', providerName: 'provider name 1' } },
      { id: 2, opportunity: { name: 'name 2', providerName: 'provider name 2' } },
      { id: 3, opportunity: { name: 'name 3', providerName: 'provider name 2' } },
    ],
    links: { next: 0 },
  },
  authentication: {
    customerAccount: {
      id: 2,
    },
  },
};
describe('BankAccountForm', () => {
  const props = {
    location: { search: '' },
    getPortifolio: jest.fn(),
    userId: 2,
  };

  it('Renders its content ', () => {
    const { component } = renderer()
      .withRouter()
      .withRedux(initialState)
      .render(<PortifolioList {...props} />);
    const infiniteScroll = component.find(InfiniteScroll);
    expect(infiniteScroll).toHaveLength(1);
    expect(infiniteScroll.find('[pageStart]')).toHaveLength(1);
    expect(infiniteScroll.find('[loader]')).toHaveLength(1);
    expect(infiniteScroll.find('[hasMore]')).toHaveLength(1);
    expect(infiniteScroll.find('[loadMore]')).toHaveLength(1);
    expect(component.find('.list-title').at(0).text()).toBe('name 1');
    expect(component.find('.list-description').at(0).text()).toBe('provider name 1');
    expect(component.find('.portifolio-list-card').hostNodes()).toHaveLength(3);
  });

  it('Should called a function when portofolio is clicked', () => {
    const { component } = renderer()
      .withRouter()
      .withRedux(initialState)
      .render(<PortifolioList {...props} />);
    component.find('.active-border').hostNodes().simulate('click');
    expect(props.getPortifolio).toHaveBeenCalled();
  });
});
