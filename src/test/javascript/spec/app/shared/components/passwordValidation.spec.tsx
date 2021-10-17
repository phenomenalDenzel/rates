import React from 'react';
import { PasswordValidation, validatePassword } from 'app/shared/components/passwordValidation';
import { renderer } from '../../utils';

describe('PasswordValidation', () => {
  it('should validate lowercase and number ', () => {
    const props = {
      password: 'admin2',
    };
    const { component } = renderer().render(<PasswordValidation {...props} />);
    const wrapper = component.find('div');
    expect(wrapper.at(2).find('[className="valid"]')).toHaveLength(1);
    expect(wrapper.at(3).find('[className="invalid"]')).toHaveLength(1);
    expect(wrapper.at(4).find('[className="valid"]')).toHaveLength(1);
    expect(wrapper.at(5).find('[className="invalid"]')).toHaveLength(1);
    expect(wrapper.at(6).find('[className="invalid"]')).toHaveLength(1);
  });

  it('should validate the regex', () => {
    validatePassword('admin2A%', '', '', event => {
      expect(event).toBeTruthy;
    });
    validatePassword('admin', '', '', event => {
      expect(event).toBeFalsy;
    });
  });
});
