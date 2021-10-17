import React from 'react';
import { DeepPartial } from 'redux';
import { Story, Meta } from '@storybook/react/types-6-0';

import Login, { ILoginInfo } from 'app/modules/login/login';
import { redux, withRoute, App } from './decorators';
import { IRootState } from 'app/shared/reducers';
import { LoginType } from 'app/shared/model/enumerations/login-type.model';
import 'app/app.scss';

const initialState: DeepPartial<IRootState> = {
  authentication: {
    isAuthenticated: true,
    authNavType: LoginType.LOGIN,
    loading: false,
  },
  register: {
    userRecord: {},
  },
};

export default {
  title: 'Login page',
  component: Login,
  decorators: [withRoute, redux(initialState), App],
} as Meta;

const Template: Story<ILoginInfo> = () => <Login />;

export const LoggedIn = Template.bind({});
