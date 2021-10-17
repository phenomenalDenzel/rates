import React from 'react';
import { mount } from 'enzyme';
import { Card, Row, Col } from 'reactstrap';
import { Doughnut } from 'react-chartjs-2';

import { BrowserRouter as Router } from 'react-router-dom';

import Overview from 'app/modules/dashboard/overview/overview';
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
};


describe('BreakDownChart', () => {
  it('Renders its content ', () => {
    const { component } = renderer()
      .withRouter()
      .withRedux(initialState)
      .render(<Overview />);
    expect(component.find('.value').at(0).text()).toBe('2300');
    expect(component.find('.value').at(1).text()).toBe('3300');
    expect(component.find('.value').at(2).text()).toBe('4300');
    expect(component.find('.value').at(3).text()).toBe('5300');
    expect(component.find(Col)).toHaveLength(5);
    expect(component.find(Card)).toHaveLength(1);
  });
});
