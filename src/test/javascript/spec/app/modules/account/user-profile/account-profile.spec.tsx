import React, { useState as useStateMock } from 'react';
import AccountInfo from 'app/modules/user-profile/account-profile/account-profile';
import { renderer } from '../../../utils';
import { IRootState } from 'app/shared/reducers';

const initialState = {
  customer: {
    entity: {
      firstName: 'first name',
      lastName: 'last name',
      dob: '2020-02-23',
      mobile: '123456789',
      email: 'email@gmail.com',
    },
  },
};

describe('AccountInfo', () => {
  it('Renders form for personal information ', () => {
    const { component } = renderer()
      .withRedux(initialState)
      .render(<AccountInfo />);
    expect(component.find('AvField')).toHaveLength(5);
    expect(component.find('AvField[value="first name"]')).toHaveLength(1);
    expect(component.find('AvField[value="last name"]')).toHaveLength(1);
    expect(component.find('AvField[value="123456789"]')).toHaveLength(1);
    expect(component.find('AvField[value="email@gmail.com"]')).toHaveLength(1);
    expect(component.find('Button')).toHaveLength(1);
  });
});
