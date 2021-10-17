import React from 'react';
import { DeepPartial } from 'redux';
import { Story, Meta } from '@storybook/react/types-6-0';

import { redux, withRoute, App } from './decorators';

import UserProfile from 'app/modules/user-profile/user-profile';
import { IRootState } from 'app/shared/reducers';

const initialState: DeepPartial<IRootState> = {
    customer: {
        entity: {
            firstName: 'first name',
            lastName: 'my name',
            dob: '2020-02-24',
            mobile: '123456789',
            email: 'email@gmail.com',
        },
    },
    password: {
        loading: false,
    },
    authentication: {
        isAuthenticated: false,
    },
    passwordReset: {
        resetPasswordSuccess: true,
        loading: false,
    },
};


export default {
    title: 'User Profile page',
    component: UserProfile,
    decorators: [withRoute, redux(initialState), App],
} as Meta;

const Template: Story = () => <UserProfile />;

export const UserProfileStory = Template.bind({});
