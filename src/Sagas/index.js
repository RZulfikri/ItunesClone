import {takeLatest, all, takeEvery} from 'redux-saga/effects';
import {ItunesTypes} from '../Redux/ItunesRedux';
import API from '../Services/Api';
import {SearchArtistSaga} from './ItunesSaga';

/* ------------- Types ------------- */

/* ------------- Sagas ------------- */

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(ItunesTypes.SEARCH_ARTIST_REQUEST, SearchArtistSaga, api),
  ]);
}
