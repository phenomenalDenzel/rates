import * as React from 'react';
import { Row, Col } from 'reactstrap';

import { renderer } from '../../utils';
import Sponsors from 'app/modules/sponsors/sponsors';

describe('Sponsors', () => {
  it('Should renders its content', () => {
    const { component } = renderer()
      .withRouter()
      .render(<Sponsors />);
    expect(component.find(Row)).toHaveLength(1);
    expect(component.find(Col)).toHaveLength(6);
    expect(component.find('div')).toHaveLength(7);
    expect(component.find('img')).toHaveLength(6);
    expect(component.find('button')).toHaveLength(0);
  });
});
