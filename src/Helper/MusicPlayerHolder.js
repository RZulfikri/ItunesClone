class MusicPlayerHolder {
  player = undefined;
  activeSong = undefined;
  isShow = false;

  constructor() {
    this.setInstance = this.setInstance.bind(this);
  }

  setInstance(instance) {
    this.player = instance;
  }

  hide() {
    this.player.hide();
    this.isShow = false;
  }

  play(data) {
    if (!this.isShow) {
      this.player.show();
      this.isShow = true;
    }
    this.activeSong = data;
    this.player.play(data, true);
  }

  pause() {
    this.player.pause();
  }

  stop() {
    this.player.hide();
    this.isShow = false;
    this.activeSong = undefined;
    this.player.stop();
  }
}

export default new MusicPlayerHolder();
