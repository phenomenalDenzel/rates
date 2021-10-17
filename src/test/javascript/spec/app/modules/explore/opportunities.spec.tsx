import React from 'react';
import Opportunities from 'app/modules/explore/opportunities/opportunities';
import { Row, Col, Card, Button } from 'reactstrap';
import { renderer } from '../../utils';
import { IRootState } from 'app/shared/reducers';

const initialState: DeepPartial<IRootState> = {
  opportunity: {
    searchEntities: {
      opportunities: [
        { id: 1, name: 'my name', providerName: 'provider name', interestRate: 20, tenor: 20, effectiveApr: 32, minimumInvestment: 43 },
      ],
    },
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
      canApplyForOpportunities: true
    },
  },
};

describe('Opportunities', () => {
  const props = {
    opportunity: {
      links: { next: jest.fn() },
      entities: [
        { id: 1, name: 'my name', providerName: 'provider name', interestRate: '20', tenor: 20, effectiveApr: 32, minimumInvestment: 43 },
      ],
    },
    match: jest.fn(),
    sort: '',
    location: jest.fn(),
    getSearchEntitieS: jest.fn(),
    getEntities: jest.fn(),
    reset: jest.fn(),
    loading: false,
    totalItems: 20,
    links: 2,
    entity: {},
    updateSuccess: false,
    history: { push: jest.fn() },
  };

  it('Renders content of the component ', () => {
    const { component } = renderer()
      .withRouter()
      .withRedux(initialState)
      .render(<Opportunities {...props} />);
    expect(component.find(Row)).toHaveLength(5);
    expect(component.find(Col)).toHaveLength(9);
    expect(component.find(Card)).toHaveLength(1);
    expect(component.find(Button)).toHaveLength(1);
  });
});
