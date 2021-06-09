export const mockPlay = jest.fn();
export const mockHide = jest.fn();
export const mockShow = jest.fn();
export const mockPause = jest.fn();
export const mockStop = jest.fn();

const mock = {
  play: mockPlay,
  hide: mockHide,
  show: mockShow,
  pause: mockPause,
  stop: mockStop,
};

export default mock;
