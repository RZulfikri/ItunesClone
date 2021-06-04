import React, {PureComponent} from 'react';
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import Colors from '../Themes/Colors';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import TrackPlayer, {STATE_PAUSED} from 'react-native-track-player';
import ProgressBar from './ProgressBar';
import ActiveSongItem from './ActiveSongItem';
import ItunesActions from '../Redux/ItunesRedux';
import {connect} from 'react-redux';

const MAX_HEIGHT = 100;
const MIN_HEIGHT = 0;

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingHorizontal: 15,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  actionContainer: {
    width: 50,
    height: 40,
  },
  playActionContainer: {marginHorizontal: 10},
  bottomContainer: {},
  infoContainer: {
    flex: 1,
  },
  playerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});

/**
 * This component is used as music player/control.
 * the feature is play, pause, stop, seek, backward and forward music/song
 */

class MusicControl extends PureComponent {
  activeSong;

  constructor(props) {
    super(props);
    this.state = {
      isPause: false,
      isStop: false,
      containerHeight: new Animated.Value(0),
    };

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.stop = this.stop.bind(this);
    this.backward = this.backward.bind(this);
    this.forward = this.forward.bind(this);
    this.seek = this.seek.bind(this);
  }

  async componentDidMount() {
    const {setRef} = this.props;

    // action to passing function from child to parent component
    if (typeof setRef === 'function') {
      setRef({
        show: this.show,
        hide: this.hide,
        play: this.play,
        pause: this.pause,
        stop: this.stop,
      });
    }

    // an event listener for player playback state
    this.playbackListener = await TrackPlayer.addEventListener(
      'playback-state',
      async ({state}) => {
        if (state === STATE_PAUSED) {
          const position = await TrackPlayer.getPosition();
          const duration = await TrackPlayer.getDuration();
          if (duration > 0 && position > 0) {
            if (position === duration) {
              this.setState({isPause: true, isStop: true});
            } else {
              this.setState({isPause: true, isStop: false});
            }
          }
        }
      },
    );
  }

  async componentWillUnmount() {
    await TrackPlayer.stop();
    await TrackPlayer.destroy();
    this.playbackListener.remove();
  }

  // action to start show animation
  show() {
    Animated.timing(this.state.containerHeight, {
      toValue: MAX_HEIGHT,
      duration: 300,
      useNativeDriver: false,
    }).start(({finished}) => {
      /* completion callback */
      if (finished) {
        this.isShown = true;
      }
    });
  }

  // action to start hide animation
  hide() {
    Animated.timing(this.state.containerHeight, {
      toValue: MIN_HEIGHT,
      duration: 300,
      useNativeDriver: false,
    }).start(({finished}) => {
      /* completion callback */
      if (finished) {
        this.isShow = false;
      }
    });
  }

  // function to play/resume music
  play(data, force) {
    this.activeSong = data;
    if (this.state.isStop || force) {
      this.setState({isPause: false, isStop: false}, async () => {
        await TrackPlayer.stop();
        await TrackPlayer.setupPlayer();

        // Add a track to the queue
        await TrackPlayer.add({
          id: this.activeSong.get('trackId'),
          url: this.activeSong.get('previewUrl'),
          title: this.activeSong.get('trackName'),
          artist: this.activeSong.get('artistName'),
          artwork: this.activeSong.get('artworkUrl60'),
        });

        // Start playing it
        await TrackPlayer.play();
      });
    } else {
      this.setState({isPause: false, isStop: false}, async () => {
        await TrackPlayer.play();
      });
    }
  }

  // function to pause music player
  pause() {
    this.setState({isPause: true}, async () => {
      await TrackPlayer.pause();
    });
  }

  // function to stop music player
  stop() {
    this.setState({isPause: false, isStop: true}, async () => {
      this.activeSong = undefined;
      await TrackPlayer.stop();
    });
  }

  // function to seek playe based on slider position
  async seek(position) {
    this.setState({isPause: false}, async () => {
      const duration = await TrackPlayer.getDuration();
      await TrackPlayer.seekTo(position * duration);
      await TrackPlayer.play();
    });
  }

  // function to backward music
  backward() {
    const {setBackward} = this.props;
    setBackward();
  }

  // function to forward music
  forward() {
    const {setForward} = this.props;
    setForward();
  }

  render() {
    const {isPause, containerHeight} = this.state;
    return (
      <Animated.View style={[styles.container, {height: containerHeight}]}>
        <View style={styles.topContainer}>
          <View style={styles.infoContainer}>
            <ActiveSongItem />
          </View>
          <View style={styles.playerContainer}>
            <TouchableOpacity
              style={styles.actionContainer}
              activeOpacity={0.8}
              onPress={this.backward}>
              <Icons name={'skip-backward'} size={35} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionContainer, styles.playActionContainer]}
              activeOpacity={0.8}
              onPress={isPause ? () => this.play(this.activeSong) : this.pause}>
              <Icons name={isPause ? 'play' : 'pause'} size={35} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionContainer}
              activeOpacity={0.8}
              onPress={this.forward}>
              <Icons name={'skip-forward'} size={35} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <ProgressBar onPause={this.pause} onSeek={this.seek} />
        </View>
      </Animated.View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setBackward: () => dispatch(ItunesActions.setBackward()),
    setForward: () => dispatch(ItunesActions.setForward()),
  };
};

export default connect(null, mapDispatchToProps)(MusicControl);
