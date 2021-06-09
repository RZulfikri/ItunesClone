import {fromJS, Map, List} from 'immutable';
import {DEFAULT_REDUCER} from '../../src/Data/Const';
import Actions, {
  reducer,
  INITIAL_STATE,
  ItunesSelectors,
} from '../../src/Redux/ItunesRedux';

describe('searchArtist', () => {
  // test to check when searchArtistRequest called
  test('request', () => {
    const keyword = 'justin';
    const state = reducer(INITIAL_STATE, Actions.searchArtistRequest(keyword));

    expect(state.getIn(['searchArtist', 'fetching'])).toBe(true);
    expect(state.getIn(['searchArtist', 'data'])).toBe(fromJS(keyword));
    expect(state.getIn(['searchArtist', 'payload'])).toBe(undefined);
    expect(state.getIn(['searchArtist', 'error'])).toBe(undefined);
  });

  // test to check when searchArtistSuccess called
  test('success', () => {
    const results = [];
    const state = reducer(INITIAL_STATE, Actions.searchArtistSuccess(results));
    expect(state.getIn(['searchArtist', 'fetching'])).toBe(false);
    expect(state.getIn(['searchArtist', 'payload'])).toBe(undefined);
    expect(state.getIn(['searchArtist', 'error'])).toBe(undefined);
    expect(state.get('songList')).toBe(fromJS(results));
  });

  // test to check when searchArtistFailure called
  test('failure', () => {
    const results = [];
    const state = reducer(INITIAL_STATE, Actions.searchArtistFailure(results));

    expect(state.getIn(['searchArtist', 'fetching'])).toBe(false);
    expect(state.getIn(['searchArtist', 'error'])).toBe(true);
  });
});

// test to check when setActiveSong called
test('setActiveSong', () => {
  const activeSong = {trackId: 1};
  const state = reducer(INITIAL_STATE, Actions.setActiveSong(activeSong));

  expect(state.get('activeSong')).toStrictEqual(fromJS(activeSong));
});

// test to check when setBackward called
describe('setBackward', () => {
  test('if activeSong position/index is 0 (at the initial list)', () => {
    const currentIndex = 0;
    const songList = [{trackId: 1}, {trackId: 2}];
    const INITIAL_STATE_WITH_SONG_LIST = INITIAL_STATE.withMutations(s => {
      s.set('songList', fromJS(songList));
      s.set('activeSong', fromJS(songList[currentIndex]));
    });
    const state = reducer(INITIAL_STATE_WITH_SONG_LIST, Actions.setBackward());

    expect(state.get('activeSong')).toStrictEqual(
      fromJS(songList[currentIndex]),
    );
  });

  test('if activeSong position/index not equal to 0 (not at the initial list)', () => {
    const currentIndex = 1;
    const songList = [{trackId: 1}, {trackId: 2}];
    const INITIAL_STATE_WITH_SONG_LIST = INITIAL_STATE.withMutations(s => {
      s.set('songList', fromJS(songList));
      s.set('activeSong', fromJS(songList[currentIndex]));
    });
    const state = reducer(INITIAL_STATE_WITH_SONG_LIST, Actions.setBackward());

    expect(state.get('activeSong')).toStrictEqual(
      fromJS(songList[currentIndex - 1]),
    );
  });
});

// test to check when setForward called
describe('setForward', () => {
  test('if activeSong position/index at the latest postition of the list', () => {
    const currentIndex = 1;
    const songList = [{trackId: 1}, {trackId: 2}];
    const INITIAL_STATE_WITH_SONG_LIST = INITIAL_STATE.withMutations(s => {
      s.set('songList', fromJS(songList));
      s.set('activeSong', fromJS(songList[currentIndex]));
    });
    const state = reducer(INITIAL_STATE_WITH_SONG_LIST, Actions.setForward());

    expect(state.get('activeSong')).toStrictEqual(
      fromJS(songList[currentIndex]),
    );
  });

  test('if activeSong position/index not at the latest postition of the list', () => {
    const currentIndex = 0;
    const songList = [{trackId: 1}, {trackId: 2}];
    const INITIAL_STATE_WITH_SONG_LIST = INITIAL_STATE.withMutations(s => {
      s.set('songList', fromJS(songList));
      s.set('activeSong', fromJS(songList[currentIndex]));
    });
    const state = reducer(INITIAL_STATE_WITH_SONG_LIST, Actions.setForward());

    expect(state.get('activeSong')).toStrictEqual(
      fromJS(songList[currentIndex + 1]),
    );
  });
});

// test to check when resetStore called
test('resetStore', () => {
  const state = reducer(INITIAL_STATE, Actions.resetStore());
  expect(state).toStrictEqual(INITIAL_STATE);
});

// test ti check selector value
describe('Selector', () => {
  test('getSearchKeyword', () => {
    const searchKeyword = 'Justin';
    const INITIAL_STATE_WITH_SEARCH_KEYWORD = INITIAL_STATE.setIn(
      ['itunes', 'searchArtist', 'data'],
      fromJS('Justin'),
    );
    const state = reducer(INITIAL_STATE_WITH_SEARCH_KEYWORD);
    expect(ItunesSelectors.getSearchKeyword(state)).toStrictEqual(
      fromJS(searchKeyword),
    );
  });

  test('getSearchLoading', () => {
    const value = true;
    const INITIAL_STATE_WITH_SEARCH_KEYWORD = INITIAL_STATE.setIn(
      ['itunes', 'searchArtist', 'fetching'],
      fromJS(value),
    );
    const state = reducer(INITIAL_STATE_WITH_SEARCH_KEYWORD);
    expect(ItunesSelectors.getSearchLoading(state)).toStrictEqual(
      fromJS(value),
    );
  });

  test('getSearchErrorStatus', () => {
    const value = false;
    const INITIAL_STATE_WITH_SEARCH_KEYWORD = INITIAL_STATE.setIn(
      ['itunes', 'searchArtist', 'error'],
      fromJS(value),
    );
    const state = reducer(INITIAL_STATE_WITH_SEARCH_KEYWORD);
    expect(ItunesSelectors.getSearchErrorStatus(state)).toStrictEqual(
      fromJS(value),
    );
  });

  test('getSearchResult', () => {
    const songList = [{trackId: 1}, {trackId: 2}];
    const INITIAL_STATE_WITH_SEARCH_KEYWORD = INITIAL_STATE.setIn(
      ['itunes', 'songList'],
      fromJS(songList),
    );
    const state = reducer(INITIAL_STATE_WITH_SEARCH_KEYWORD);
    expect(ItunesSelectors.getSearchResult(state)).toStrictEqual(
      fromJS(songList),
    );
  });

  test('getActiveSong', () => {
    const value = {trackId: 1};
    const INITIAL_STATE_WITH_SEARCH_KEYWORD = INITIAL_STATE.setIn(
      ['itunes', 'activeSong'],
      fromJS(value),
    );
    const state = reducer(INITIAL_STATE_WITH_SEARCH_KEYWORD);
    expect(ItunesSelectors.getActiveSong(state)).toStrictEqual(fromJS(value));
  });
});

// test to check Initial store
test('initial store', () => {
  const state = reducer(INITIAL_STATE, Actions.resetStore());
  expect(DEFAULT_REDUCER).toStrictEqual({
    fetching: false,
    data: undefined,
    error: undefined,
    payload: undefined,
  });
  expect(state).toStrictEqual(
    Map({
      searchArtist: fromJS(DEFAULT_REDUCER),
      songList: List(),
      activeSong: undefined,
    }),
  );
});
