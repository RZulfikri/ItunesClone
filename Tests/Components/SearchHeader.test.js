import 'react-native';
import React from 'react';
import SearchHeader from '../../src/Components/SearchHeader';
import renderer from 'react-test-renderer';
import {fromJS, Map} from 'immutable';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import MusicPlayerHolder from '../../src/Helper/MusicPlayerHolder';
import MusicControl, {mockPlay} from '../__mocks__/MusicControl';
import ItunesActions from '../../src/Redux/ItunesRedux';
import debounce from 'debounce';

jest.mock('debounce', () => jest.fn(fn => fn));

const mockStore = configureStore([]);

describe('SearchHeader React-Redux Component', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore();

    store.dispatch = jest.fn();

    component = renderer.create(
      <Provider store={store}>
        <SearchHeader />
      </Provider>,
    );
  });

  it('should renders correctly', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
