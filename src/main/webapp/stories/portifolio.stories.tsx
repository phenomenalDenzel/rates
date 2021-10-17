import React from 'react';
import { DeepPartial } from 'redux';
import { Story, Meta } from '@storybook/react/types-6-0';
import { redux, withRoute, App } from './decorators';

import { IRootState } from 'app/shared/reducers';
import Portifolio from 'app/modules/dashboard/portifolio/portifolio';

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

export default {
    title: 'Portifolio page',
    component: Portifolio,
    decorators: [withRoute, redux(initialState), App],
} as Meta;

const Template: Story = () => <Portifolio />;

export const PortifolioStory = Template.bind({});
