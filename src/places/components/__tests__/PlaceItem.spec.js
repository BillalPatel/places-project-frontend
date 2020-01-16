import React from 'react';
import renderer from 'react-test-renderer';

import PlaceItem from '../PlaceItem';

describe('Place Item component', () => {
  it('should match the snapshot', () => {
    const tree = renderer.create(<PlaceItem />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
