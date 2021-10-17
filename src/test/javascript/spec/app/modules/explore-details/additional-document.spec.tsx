import React from 'react';
import { Row, Col } from 'reactstrap';

import AdditionalDocument from 'app/modules/explore/explore-details/additional-document/additional-document';

import { renderer } from '../../utils';

describe('AdditionalDocument', () => {
  it('Renders content of the component ', () => {
    const { component } = renderer()
      .withRouter()
      .render(<AdditionalDocument />);
    expect(component.find(Row)).toHaveLength(2);
    expect(component.find(Col)).toHaveLength(6);
    expect(component.find('div')).toHaveLength(14);
    expect(component.find('img')).toHaveLength(5);
  });
});
