import * as React from 'react';
import { Row, Col } from 'reactstrap';

import { renderer } from '../../utils';
import Benefits from 'app/modules/benefits/benefits';

describe('Benefits', () => {
  it('Should renders its content', () => {
    const { component } = renderer()
      .withRouter()
      .render(<Benefits />);
    expect(component.find(Row)).toHaveLength(7);
    expect(component.find(Col)).toHaveLength(13);
    expect(component.find('div')).toHaveLength(35);
    expect(component.find('img')).toHaveLength(4);
    expect(component.find('button')).toHaveLength(0);
  });
});
