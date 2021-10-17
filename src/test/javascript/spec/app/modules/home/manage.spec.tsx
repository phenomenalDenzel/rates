import * as React from 'react';
import { Row, Col } from 'reactstrap';

import { renderer } from '../../utils';
import Manage from 'app/modules/manage/manage';

describe('Manage', () => {
  it('Should renders its content', () => {
    const { component } = renderer()
      .withRouter()
      .render(<Manage />);
    expect(component.find(Row)).toHaveLength(1);
    expect(component.find(Col)).toHaveLength(2);
    expect(component.find('div')).toHaveLength(7);
    expect(component.find('img')).toHaveLength(2);
    expect(component.find('button')).toHaveLength(1);
  });
});
