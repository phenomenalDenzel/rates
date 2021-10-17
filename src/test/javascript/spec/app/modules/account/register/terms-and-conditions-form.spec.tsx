import React, { useState as useStateMock } from 'react';
import TermsAndConditions from 'app/modules/account/register/terms-and-conditions-form';
import { renderer } from '../../../utils';

describe('TermsAndConditions', () => {
  const props = {
    setStep: jest.fn(),
  };

  it('Renders form with terms and conditions to check ', () => {
    const { component } = renderer()
      .withRouter()
      .render(<TermsAndConditions {...props} />);
    expect(component.find('label')).toHaveLength(1);
    expect(component.find('AvField[type="checkbox"]')).toHaveLength(1);
    expect(component.find('button')).toHaveLength(1);
  });
});
