import React from 'react';

import PortifolioDetails from 'app/modules/dashboard/portifolio/portifolio-details/portifolio-details';
import { ApplicationStatus } from 'app/shared/model/enumerations/application-status.model';
import { OpportunityType } from 'app/shared/model/enumerations/opportunity-type.model';
import { renderer } from '../../utils';

describe('Portifolio details', () => {
  const props = {
    portifolio: {
      amount: 2000,
      id: 1,
      applicationId: 'applicationId',
      status: ApplicationStatus.COMPLETE,
      opportunityName: 'opportunityName',
      opportunityId: 1,
      customerId: 2,
      opportunity: {
        name: 'name',
        type: OpportunityType.BALANCED_FUND,
        summary: 'summary',
        fundSize: 'fundSize',
        startDate: 'startDate',
        endDate: '12/12/2020',
        visible: true,
        interestRate: 100,
        tenor: 10,
        effectiveApr: 200,
        minimumInvestment: 599,
        providerName: 'providerName',
      },
    },
  };

  it('Renders its content ', () => {
    const { component } = renderer()
      .withRouter()
      .render(<PortifolioDetails {...props} />);
    expect(component.find('Row')).toHaveLength(6);
    expect(component.find('Col')).toHaveLength(12);
    expect(component.find('.portifolio-name').text()).toBe('name');
    expect(component.find('.portifolio-desc').text()).toBe('providerName');
    expect(component.find('.amount-earned').text()).toBe('2000');
    expect(component.find('.portifolio-fund-amount').text()).toBe('fundSize');
    expect(component.find('.portifolio-fund-value').at(0).text()).toBe('2000');
    expect(component.find('.portifolio-fund-value').at(1).text()).toBe('100%');
    expect(component.find('.portifolio-fund-value').at(2).text()).toBe('12/12/2020');
    expect(component.find('.portifolio-fund-value').at(3).text()).toBe('10');
    expect(component.find('.portifolio-fund-value').at(4).text()).toBe('providerName');
  });
});
