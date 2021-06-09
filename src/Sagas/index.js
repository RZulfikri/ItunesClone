import {takeLatest, all, takeEvery} from 'redux-saga/effects';

/* ------------- Types ------------- */
import {ItunesTypes} from '../Redux/ItunesRedux';

/* ------------- Sagas ------------- */
import {SearchArtistSaga, SetBackwardSaga, SetForwardSaga} from './ItunesSaga';

/* ------------- API ------------- */
import API from '../Services/Api';

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(ItunesTypes.SEARCH_ARTIST_REQUEST, SearchArtistSaga, api),
    takeLatest(ItunesTypes.SET_BACKWARD, SetBackwardSaga),
    takeLatest(ItunesTypes.SET_FORWARD, SetForwardSaga),
  ]);
}
