import React from 'react';
import { DeepPartial } from 'redux';
import { Story, Meta } from '@storybook/react/types-6-0';
import { redux, withRoute, App } from './decorators';

import SearchExplore from 'app/modules/explore/explore-search/explore-search';
import { IRootState } from 'app/shared/reducers';

const initialState: DeepPartial<IRootState> = {
    opportunity: {
        searchEntities: {
            facets: [{ key: 'my key', terms: [{ term: 'my term', count: 3 }] }],
        },
    },
};

export default {
    title: 'Search Explore page',
    component: SearchExplore,
    decorators: [withRoute, redux(initialState), App],
} as Meta;

const Template: Story = () => <SearchExplore />;

export const LoggedIn = Template.bind({});
