import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { match } from 'react-router';
import { createMemoryHistory, createLocation } from 'history';

import ExploreDetail from 'app/modules/explore/explore-details/explore-details';
import DetailProfile from 'app/modules/explore/explore-details/explore-detail-profile/explore-detail-profile';
import FundDetails from 'app/modules/explore/explore-details/explore-fund-details/explore-fund-details';
import AdditionalDocument from 'app/modules/explore/explore-details/additional-document/additional-document';

import { renderer } from '../../utils';
import { IRootState } from 'app/shared/reducers';

const initialState: DeepPartial<IRootState> = {
  opportunity: {
    entity: { id: 1, name: 'my name', providerName: 'provider name', interestRate: 20, tenor: 20, effectiveApr: 32, minimumInvestment: 43 },
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
const history = createMemoryHistory();
const path = `/route/:id`;
const match: match<{ id: string }> = {
  isExact: false,
  path,
  url: path.replace(':id', '1'),
  params: { id: '1' },
};
describe('Explore', () => {
  it('Renders content of the component ', () => {
    const props = {
      match,
      history,
      location: createLocation(match.url),
    };
    const { component } = renderer()
      .withRouter()
      .withRedux(initialState)
      .render(<ExploreDetail {...props} />);
    expect(component.find(DetailProfile)).toHaveLength(1);
    expect(component.find(FundDetails)).toHaveLength(1);
    expect(component.find(AdditionalDocument)).toHaveLength(1);
  });
});
