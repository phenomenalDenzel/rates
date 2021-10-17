import React from 'react';

import PaymentModal, { IPaymentProps } from 'app/modules/explore/paymentModal/payment-modal';
import { DeepPartial } from 'redux';
import { Story, Meta } from '@storybook/react/types-6-0';
import { redux, withRoute, App } from './decorators';

import { IRootState } from 'app/shared/reducers';


const initialState: DeepPartial<IRootState> = {
    opportunity: {
        searchEntities: {},
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

export default {
    title: 'Payment modal page',
    component: PaymentModal,
    decorators: [withRoute, redux(initialState), App],
} as Meta;

const props = {
    showModal: true,
    toggle: jest.fn(),
    data: { effectiveApr: 20, minimumInvestment: 50337, name: "Estate high", providerName: "Estate high2", denomination: 32588 },
}
const Template: Story<IPaymentProps> = () => <PaymentModal {...props} />;

export const PaymentModalStories = Template.bind({});
