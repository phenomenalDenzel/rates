import React from 'react';
import NextOfKin from 'app/modules/account/register/next-of-kin-form';
import { renderer } from '../../../utils';
import { IRootState } from 'app/shared/reducers';
import { RelationshipType } from 'app/shared/model/enumerations/relationship-type.model';
import { Title } from 'app/shared/model/enumerations/title.model';

const initialState: DeepPartial<IRootState> = {
  register: {
    userRecord: {
      nextOfKins: {
        title: Title.MR,
        name: 'my name',
        relation: RelationshipType.SIBLING,
        phoneNumber: '07080808080',
      },
    },
  },
};

describe('NextOfKin', () => {
  const loginProps = {
    setStep: jest.fn(),
  };

  it('Renders form with next of kin information ', () => {
    const { component } = renderer()
      .withRedux(initialState)
      .withRouter()
      .render(<NextOfKin {...loginProps} />);

    expect(component.find('AvInput')).toHaveLength(4);
    expect(component.find('AvField')).toHaveLength(2);
    expect(component.find('input[name="name"]').prop('value')).toEqual('my name');
    expect(component.find('AvInput[name="title"]').prop('value')).toEqual(Title.MR);
    expect(component.find('AvInput[name="relation"]').prop('value')).toEqual(RelationshipType.SIBLING);
    expect(component.find('input[name="phoneNumber"]').prop('value')).toEqual('07080808080');

    expect(
      component.find('AvField').forEach(node => {
        expect(node.props()).toEqual({
          className: expect.any(String),
          name: expect.any(String),
          value: expect.any(String),
          type: expect.any(String),
          placeholder: null,
          validate: expect.any(Object),
          onChange: expect.any(Function),
        });
      })
    );
    expect(component.find('Button')).toHaveLength(1);
  });
});
