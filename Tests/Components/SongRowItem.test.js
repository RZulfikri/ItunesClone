import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {fromJS, Map} from 'immutable';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import SongRowItem from '../../src/Components/SongRowItem';
import MusicPlayerHolder from '../../src/Helper/MusicPlayerHolder';
import MusicControl, {mockPlay} from '../__mocks__/MusicControl';
import ItunesActions from '../../src/Redux/ItunesRedux';

const mockStore = configureStore([]);

describe('SongRowItem React-Redux Component', () => {
  let store;
  let component;
  let data;

  beforeEach(() => {
    mockPlay.mockClear();

    store = mockStore(
      Map({
        itunes: fromJS({
          activeSong: undefined,
        }),
      }),
    );

    store.dispatch = jest.fn();

    data = Map({
      activeSong: fromJS({
        wrapperType: 'track',
        kind: 'song',
        artistId: 466532,
        collectionId: 1165630592,
        trackId: 1165631048,
        artistName: 'Korn',
        collectionName: 'Follow the Leader',
        trackName: 'Justin',
        collectionCensoredName: 'Follow the Leader',
        trackCensoredName: 'Justin',
        artistViewUrl: 'https://music.apple.com/us/artist/korn/466532?uo=4',
        collectionViewUrl:
          'https://music.apple.com/us/album/justin/1165630592?i=1165631048&uo=4',
        trackViewUrl:
          'https://music.apple.com/us/album/justin/1165630592?i=1165631048&uo=4',
        previewUrl:
          'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/54/57/70/545770b4-fa22-3d84-50fd-8007f97a4192/mzaf_8941792383747410636.plus.aac.p.m4a',
        artworkUrl30:
          'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/78/2b/8f/782b8fa1-0e66-b76d-83c9-80e6013e25f4/source/30x30bb.jpg',
        artworkUrl60:
          'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/78/2b/8f/782b8fa1-0e66-b76d-83c9-80e6013e25f4/source/60x60bb.jpg',
        artworkUrl100:
          'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/78/2b/8f/782b8fa1-0e66-b76d-83c9-80e6013e25f4/source/100x100bb.jpg',
        collectionPrice: 9.99,
        trackPrice: 1.29,
        releaseDate: '1998-08-18T12:00:00Z',
        collectionExplicitness: 'explicit',
        trackExplicitness: 'notExplicit',
        discCount: 1,
        discNumber: 1,
        trackCount: 14,
        trackNumber: 10,
        trackTimeMillis: 257547,
        country: 'USA',
        currency: 'USD',
        primaryGenreName: 'Hard Rock',
        isStreamable: true,
      }),
    });

    component = renderer.create(
      <Provider store={store}>
        <SongRowItem data={data} />
      </Provider>,
    );
  });

  it('should renders song info if data exist', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should dispatch setActiveSong on tap', () => {
    MusicPlayerHolder.setInstance(MusicControl);

    renderer.act(() => {
      component.toJSON().props.onClick();
    });

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      ItunesActions.setActiveSong(data.toJS()),
    );
  });
});
