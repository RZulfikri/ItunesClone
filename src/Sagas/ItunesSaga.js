import {call, put, select} from '@redux-saga/core/effects';
import MusicPlayerHolder from '../Helper/MusicPlayerHolder';
import ItunesActions, {ItunesSelectors} from '../Redux/ItunesRedux';

export function* SearchArtistSaga(api, {data}) {
  try {
    console.log(data);
    const response = yield call(api.searchArtist, data);
    console.log(response);
    if (response.ok) {
      yield put(ItunesActions.searchArtistSuccess(response.data.results));
    } else {
      throw response.error;
    }
  } catch (error) {
    yield put(ItunesActions.searchArtistFailure());
  }
}

export function* SetBackwardSaga() {
  const activeSong = yield select(ItunesSelectors.getActiveSong);
  MusicPlayerHolder.play(activeSong);
}

export function* SetForwardSaga() {
  const activeSong = yield select(ItunesSelectors.getActiveSong);
  MusicPlayerHolder.play(activeSong);
}
