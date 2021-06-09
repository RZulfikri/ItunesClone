import MusicPlayerHolder from '../../src/Helper/MusicPlayerHolder';
import MusicControl, {
  mockPlay,
  mockHide,
  mockShow,
  mockPause,
  mockStop,
} from '../__mocks__/MusicControl';

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  // MusicControl.mockClear();
  mockPause.mockClear();
  mockPlay.mockClear();
  mockHide.mockClear();
  mockShow.mockClear();
  mockStop.mockClear();
});

test('setInstance', () => {
  MusicPlayerHolder.setInstance(MusicControl);
  expect(MusicPlayerHolder.player).toStrictEqual(MusicControl);
});

test('hide', () => {
  MusicPlayerHolder.setInstance(MusicControl);
  expect(MusicPlayerHolder.player).toStrictEqual(MusicControl);
  MusicPlayerHolder.hide();
  expect(mockHide).toHaveBeenCalledTimes(1);
  expect(MusicPlayerHolder.isShow).toStrictEqual(false);
});

test('play', () => {
  const activeSong = {trackId: 1};
  MusicPlayerHolder.setInstance(MusicControl);
  expect(MusicPlayerHolder.player).toStrictEqual(MusicControl);
  MusicPlayerHolder.play(activeSong);
  expect(mockShow).toHaveBeenCalledTimes(1);
  expect(MusicPlayerHolder.isShow).toStrictEqual(true);
  expect(MusicPlayerHolder.activeSong).toStrictEqual(activeSong);
  expect(mockPlay).toHaveBeenCalledTimes(1);
  expect(mockPlay).toHaveBeenCalledWith(activeSong, true);
});

test('pause', () => {
  MusicPlayerHolder.setInstance(MusicControl);
  expect(MusicPlayerHolder.player).toStrictEqual(MusicControl);
  MusicPlayerHolder.pause();
  expect(mockPause).toHaveBeenCalledTimes(1);
});

test('stop', () => {
  MusicPlayerHolder.setInstance(MusicControl);
  expect(MusicPlayerHolder.player).toStrictEqual(MusicControl);
  MusicPlayerHolder.stop();
  expect(mockHide).toHaveBeenCalledTimes(1);
  expect(MusicPlayerHolder.isShow).toStrictEqual(false);
  expect(MusicPlayerHolder.activeSong).toStrictEqual(undefined);
  expect(mockStop).toHaveBeenCalledTimes(1);
  expect(mockHide).toHaveBeenCalledTimes(1);
});
