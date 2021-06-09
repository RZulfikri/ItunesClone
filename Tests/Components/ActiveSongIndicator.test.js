import 'react-native';
import React from 'react';
import ActiveSongIndicator from '../../src/Components/ActiveSongIndicator';
import renderer from 'react-test-renderer';
import {fromJS, Map} from 'immutable';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
const mockStore = configureStore([]);

describe('ActiveSongIndicator React-Redux Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore(
      Map({
        itunes: fromJS({activeSong: {trackId: 1}}),
      }),
    );
  });

  it('should renders correctly if data.trackId equal to activeSong.trackId', () => {
    const data = Map({trackId: 1});
    const component = renderer.create(
      <Provider store={store}>
        <ActiveSongIndicator data={data} />
      </Provider>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should not renders correctly if data.trackId not equal to activeSong.trackId', () => {
    const data = Map({trackId: 2});
    const component = renderer.create(
      <Provider store={store}>
        <ActiveSongIndicator data={data} />
      </Provider>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
