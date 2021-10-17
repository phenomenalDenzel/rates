import React from 'react';
import { DeepPartial } from 'redux';
import { Story, Meta } from '@storybook/react/types-6-0';
import { redux, withRoute, App } from './decorators';

import Opportunities from 'app/modules/explore/opportunities/opportunities';
import { Row, Col, Card, Button } from 'reactstrap';
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

export default {
    title: 'Opportunities page',
    component: Opportunities,
    decorators: [withRoute, redux(initialState), App],
} as Meta;

const Template: Story = () => <Opportunities />;

export const LoggedIn = Template.bind({});
