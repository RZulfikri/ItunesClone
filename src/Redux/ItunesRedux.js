import {createReducer, createActions} from 'reduxsauce';
import {Map, fromJS, List} from 'immutable';
import {DEFAULT_REDUCER} from '../Data/Const';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  searchArtistRequest: ['data'],
  searchArtistSuccess: ['payload'],
  searchArtistFailure: null,
  setActiveSong: ['data'],
});

export const ItunesTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Map({
  searchArtist: fromJS(DEFAULT_REDUCER),
  songList: List(),
  activeSong: undefined,
});

/* ------------- Selectors ------------- */

export const ItunesSelectors = {
  getSearchKeyword: state => state.getIn(['itunes', 'searchArtist', 'data']),
  getSearchLoading: state =>
    state.getIn(['itunes', 'searchArtist', 'fetching']),
  getSearchErrorStatus: state =>
    state.getIn(['itunes', 'searchArtist', 'error']),
  getSearchResult: state => state.getIn(['itunes', 'songList']),
  getActiveSong: state => state.getIn(['itunes', 'activeSong']),
};

/* ------------- Reducers ------------- */
export const searchArtistRequestReducer = (state, {data}) => {
  return state.withMutations(s => {
    s.setIn(['searchArtist', 'fetching'], fromJS(true));
    s.setIn(['searchArtist', 'data'], fromJS(data));
    s.set('activeSong', fromJS(undefined));
  });
};
export const searchArtistSuccessReducer = (state, {payload}) => {
  return state.withMutations(s => {
    s.setIn(['searchArtist', 'fetching'], fromJS(false));
    s.setIn(['searchArtist', 'payload'], fromJS(undefined));
    s.setIn(['searchArtist', 'error'], fromJS(undefined));
    s.set('songList', fromJS(payload));
  });
};
export const searchArtistFailureReducer = (state, {data}) => {
  return state.withMutations(s => {
    s.setIn(['searchArtist', 'fetching'], fromJS(false));
    s.setIn(['searchArtist', 'error'], fromJS(true));
  });
};

export const setActiveSongReducer = (state, {data}) => {
  return state.set('activeSong', fromJS(data));
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SEARCH_ARTIST_REQUEST]: searchArtistRequestReducer,
  [Types.SEARCH_ARTIST_SUCCESS]: searchArtistSuccessReducer,
  [Types.SEARCH_ARTIST_FAILURE]: searchArtistFailureReducer,
  [Types.SET_ACTIVE_SONG]: setActiveSongReducer,
});
