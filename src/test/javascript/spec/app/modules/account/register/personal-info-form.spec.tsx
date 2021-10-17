import React, { useState as useStateMock } from 'react';
import PersonalInfo from 'app/modules/account/register/personal-info-form';
import { renderer } from '../../../utils';
import { IRootState } from 'app/shared/reducers';

const initialState = {
  register: {
    userRecord: {
      firstName: 'first name',
      lastName: 'last name',
      dob: '2020-02-23',
      bvn: '12345678909',
      mobile: '123456789',
      bankAccountNumber: '1234567890',
      mothersMaidenName: 'mothersMaidenName',
      countryOfBirth: 'countryOfBirth',
      nationality: 'nationality',
      bankName: 'Rate.ng',
      email: 'email',
      langKey: 'langKey',
      login: 'login',
      password: 'password',
      state: 'my state',
      stateName: 'my state',
      localGovtName: 'my lga',
      addressLine1: 'address 1',
      addressLine2: 'address 2',
      addresses: {
        addressLine1: 'addressLine1',
        addressLine2: 'addressLine2',
        localGovtName: 'localGovtName',
      },
      nextOfKins: {
        name: 'name',
        phoneNumber: 'phoneNumber',
      },
    },
    localGovt: [],
  },
};

describe('PersonalInfo', () => {
  it('Renders form for personal information ', () => {
    const step = jest.fn();
    const { component } = renderer()
      .withRedux(initialState)
      .render(<PersonalInfo setStep={step} />);
    expect(component.find('AvField')).toHaveLength(8);
    expect(component.find('AvField[value="first name"]')).toHaveLength(1);
    expect(component.find('AvField[value="last name"]')).toHaveLength(1);
    expect(component.find('AvField[value="12345678909"]')).toHaveLength(1);
    expect(component.find('AvField[value="123456789"]')).toHaveLength(1);
    expect(component.find('AvInput[value="my state"]')).toHaveLength(1);
    expect(component.find('AvInput[value="my lga"]')).toHaveLength(1);
    expect(component.find('AvField[value="address 1"]')).toHaveLength(1);
    expect(component.find('AvField[value="address 2"]')).toHaveLength(1);
    expect(component.find('AvField[value="mothersMaidenName"]')).toHaveLength(1);
    expect(component.find('AvInput[value="countryOfBirth"]')).toHaveLength(1);
    expect(component.find('AvInput[value="nationality"]')).toHaveLength(1);
    expect(component.find('Button')).toHaveLength(1);
  });
});
