import * as React from 'react';
import { Row, Col } from 'reactstrap';

import { renderer } from '../utils';
import Footer from 'app/shared/layout/footer/footer';

describe('Footer', () => {
  it('Should renders its content', () => {
    const { component } = renderer()
      .withRouter()
      .render(<Footer />);
    expect(component.find(Row)).toHaveLength(3);
    expect(component.find(Col)).toHaveLength(4);
    expect(component.find('img')).toHaveLength(6);
    expect(component.find('button')).toHaveLength(0);
  });
});
