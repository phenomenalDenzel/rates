import React from 'react';
import { Row, Col, Card, Progress } from 'reactstrap';

import FundDetails from 'app/modules/explore/explore-details/explore-fund-details/explore-fund-details';

import { renderer } from '../../utils';

describe('FundBreakDown', () => {
  it('Renders content of the component ', () => {
    const props = {
      data: { id: 1, name: 'my name', providerName: 'provider name', interestRate: 20, tenor: 20, effectiveApr: 32, minimumInvestment: 43 },
    };
    const { component } = renderer()
      .withRouter()
      .render(<FundDetails {...props} />);
    expect(component.find(Row)).toHaveLength(5);
    expect(component.find(Col)).toHaveLength(10);
  });
});
