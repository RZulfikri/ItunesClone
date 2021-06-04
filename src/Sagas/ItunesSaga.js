import {call, put} from '@redux-saga/core/effects';
import ItunesActions from '../Redux/ItunesRedux';

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
