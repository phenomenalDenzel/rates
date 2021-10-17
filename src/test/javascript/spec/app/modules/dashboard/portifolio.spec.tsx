import React from 'react';

import PortifolioDetails from 'app/modules/dashboard/portifolio/portifolio-details/portifolio-details';
import PortifolioList from 'app/modules/dashboard/portifolio/portifolio-list/portifolio-list';

import Portifolio from 'app/modules/dashboard/portifolio/portifolio';

import { renderer } from '../../utils';
import { IRootState } from 'app/shared/reducers';
import { ApplicationStatus } from 'app/shared/model/enumerations/application-status.model';

const initialState: DeepPartial<IRootState> = {
  authentication: {
    customerAccount: {
      id: 2,
    },
  },
  application: {
    applicationEntities: [
      { id: 1, opportunity: { name: 'name 1', providerName: 'provider name 1' } },
      { id: 2, opportunity: { name: 'name 2', providerName: 'provider name 2' } },
      { id: 3, opportunity: { name: 'name 3', providerName: 'provider name 2' } },
    ],
    links: { next: 0 },
  },
};

describe('Portifolio', () => {
  const emptyState: DeepPartial<IRootState> = {
    authentication: {
      customerAccount: {
        id: 2,
      },
    },
    application: {
      applicationEntities: [],
      links: { next: 0 },
    },
  };
  it('Should render empty state', () => {
    const { component } = renderer()
      .withRouter()
      .withRedux(emptyState)
      .render(<Portifolio />);
    expect(component.find('Row')).toHaveLength(4);
    expect(component.find('.empty-state').at(0).text()).toBe('You dont have any portifolio yet');
    expect(component.find('img')).toHaveLength(1);
    expect(component.find(PortifolioList)).toHaveLength(1);
    expect(component.find(PortifolioDetails)).toHaveLength(0);
  });

  it('Should render portifolio details', () => {
    const { component } = renderer()
      .withRouter()
      .withRedux(initialState)
      .render(<Portifolio />);
    expect(component.find(PortifolioList).props()).toEqual({
      getPortifolio: expect.any(Function),
      userId: 2,
    });
    expect(component.find(PortifolioDetails).at(0).props()).toEqual({
      portifolio: {
        id: 1,
        opportunity: {
          name: "name 1",
          providerName: "provider name 1",
        },
      },
    });
  });
});
