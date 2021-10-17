import * as React from 'react';
import { Row, Col } from 'reactstrap';

import { renderer } from '../../utils';
import HowItWorks from 'app/modules/how-it-work/how-it-work';

describe('HowItWorks', () => {
  it('Should renders its content', () => {
    const { component } = renderer()
      .withRouter()
      .render(<HowItWorks />);
    expect(component.find(Row)).toHaveLength(1);
    expect(component.find(Col)).toHaveLength(1);
    expect(component.find('div')).toHaveLength(6);
    expect(component.find('img')).toHaveLength(1);
  });
});
