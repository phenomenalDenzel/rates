import React from 'react';

import Dashboard from 'app/modules/dashboard/dashboard';
import Overview from 'app/modules/dashboard/overview/overview';
import Portifolio from 'app/modules/dashboard/portifolio/portifolio';
import { renderer } from '../../utils';
import { IRootState } from 'app/shared/reducers';

const initialState: DeepPartial<IRootState> = {
  customer: {
    dashboard: {
      summary: {
        totalActivePortfolio: 2300,
        earnings: 3300,
        totalInvestment: 4300,
        totalDeposits: 5300,
      }
    }
  },
  authentication: {
    account: {},
  },
  application: {
    entities: [],
    links: { next: 0 },
  },
};
describe('Dashboard', () => {
  it('Renders its content ', () => {
    const { component } = renderer()
      .withRouter()
      .withRedux(initialState)
      .render(<Dashboard />);
    expect(component.find('Container')).toHaveLength(1);
    expect(component.find(Overview)).toHaveLength(1);
    expect(component.find(Portifolio)).toHaveLength(1);
  });
});
