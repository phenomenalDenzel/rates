import React from 'react';
import { DeepPartial } from 'redux';
import { Story, Meta } from '@storybook/react/types-6-0';
import { redux, withRoute, App } from './decorators';

import Overview from 'app/modules/dashboard/overview/overview';

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

export default {
    title: 'Overview page',
    component: Overview,
    decorators: [withRoute, redux(initialState), App],
} as Meta;

const Template: Story = () => <Overview />;

export const OverviewStory = Template.bind({});
