import API from '../../src/Services/Api';
import {put, call, select} from 'redux-saga/effects';
import {
  SearchArtistSaga,
  SetBackwardSaga,
  SetForwardSaga,
} from '../../src/Sagas/ItunesSaga';
import ItunesActions, {ItunesSelectors} from '../../src/Redux/ItunesRedux';
import {path} from 'ramda';
import MusicPlayerHolder from '../../src/Helper/MusicPlayerHolder';

const stepper = fn => mock => fn.next(mock).value;
const api = API.create();

// test to check that sagas called API
describe('SearchArtistSaga', () => {
  test('SearchArtistSaga first calls API', () => {
    const step = stepper(SearchArtistSaga(api, {data: 'justin'}));
    expect(step()).toEqual(call(api.searchArtist, 'justin'));
  });

  // test to check that sagas call API, response success, and pass the response to the success action
  test('SearchArtistSaga success', async () => {
    const step = stepper(SearchArtistSaga(api, {data: 'justin'}));
    step();
    const response = await api.searchArtist('justin');
    const stepResponse = step(response);
    const results = path(['data', 'results'], response);
    expect(stepResponse).toEqual(
      put(ItunesActions.searchArtistSuccess(results)),
    );
  });

  // test to check that sagas call API, response filure, and call action failure
  test('SearchArtistSaga failure', async () => {
    const step = stepper(SearchArtistSaga(api, {data: 'justin'}));
    // first step API
    step();
    // Second step failed response, use mock value to set api response error
    const response = {ok: false};
    const stepResponse = step(response);
    expect(stepResponse).toEqual(put(ItunesActions.searchArtistFailure()));
  });
});

// mock Music Player Holder instance
import MusicControl, {
  mockPlay,
  mockHide,
  mockShow,
  mockPause,
  mockStop,
} from '../__mocks__/MusicControl';
MusicPlayerHolder.setInstance(MusicControl);
// test to check that sagas call select function
test('SetBackwardSaga', () => {
  const step = stepper(SetBackwardSaga());
  expect(step()).toEqual(select(ItunesSelectors.getActiveSong));
  const response = step({trackId: 1});
  MusicPlayerHolder.play(response);
});

// test to check that sagas call select function
test('SetForwardSaga', () => {
  const step = stepper(SetForwardSaga());
  expect(step()).toEqual(select(ItunesSelectors.getActiveSong));
  const response = step({trackId: 1});
  MusicPlayerHolder.play(response);
});
