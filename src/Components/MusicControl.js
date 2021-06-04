import React, {PureComponent} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Colors from '../Themes/Colors';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';

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
  slider: {
    width: '100%',
    height: 30,
  },
});

class MusicControl extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isPlay: false,
      containerHeight: new Animated.Value(0),
    };

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.stop = this.stop.bind(this);
    this.backward = this.backward.bind(this);
    this.forward = this.forward.bind(this);
  }

  componentDidMount() {
    const {setRef} = this.props;

    if (typeof setRef === 'function') {
      setRef({
        show: this.show,
        hide: this.hide,
        play: this.play,
        pause: this.pause,
        stop: this.stop,
      });
    }
  }

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

  play() {
    this.setState({isPlay: true});
  }

  pause() {
    this.setState({isPlay: false});
  }

  stop() {
    this.setState({isPlay: false});
  }

  backward() {
    //
  }

  forward() {
    //
  }

  render() {
    const {isPlay, containerHeight} = this.state;
    return (
      <Animated.View style={[styles.container, {height: containerHeight}]}>
        <View style={styles.topContainer}>
          <TouchableOpacity
            style={styles.actionContainer}
            activeOpacity={0.8}
            onPress={this.backward}>
            <Icons name={'skip-backward'} size={35} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionContainer, styles.playActionContainer]}
            activeOpacity={0.8}
            onPress={isPlay ? this.pause : this.play}>
            <Icons name={isPlay ? 'pause' : 'play'} size={35} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionContainer}
            activeOpacity={0.8}
            onPress={this.forward}>
            <Icons name={'skip-forward'} size={35} />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomContainer}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor={Colors.taleGreen}
            maximumTrackTintColor={Colors.border}
          />
        </View>
      </Animated.View>
    );
  }
}

export default MusicControl;
