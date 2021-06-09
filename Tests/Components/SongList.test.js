import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {fromJS, Map} from 'immutable';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import SongList from '../../src/Components/SongList';
import {DEFAULT_REDUCER} from '../../src/Data/Const';

const mockStore = configureStore([]);

describe('SongList React-Redux Component', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore(
      Map({
        itunes: fromJS({
          searchArtist: fromJS(DEFAULT_REDUCER),
          songList: require('./ItunesResult.json'),
        }),
      }),
    );

    component = renderer.create(
      <Provider store={store}>
        <SongList />
      </Provider>,
    );
  });

  it('should renders list if data exist', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
