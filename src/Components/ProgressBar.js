import React, {PureComponent} from 'react';
import Slider from '@react-native-community/slider';
import {StyleSheet, View} from 'react-native';
import {ProgressComponent, TrackPlayerEvents} from 'react-native-track-player';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  slider: {
    width: '100%',
    height: 30,
  },
});

class ProgressBar extends ProgressComponent {
  constructor(props) {
    super(props);

    this.onTouchStart = this.onTouchStart.bind(this);
    this.onSlidingComplete = this.onSlidingComplete.bind(this);
  }

  async onTouchStart() {
    const {onPause} = this.props;
    onPause();
  }

  onSlidingComplete(val) {
    console.log(val);
    const {onSeek} = this.props;
    onSeek(val);
  }

  render() {
    return (
      // Note: formatTime and ProgressBar are just examples:
      <View>
        {/* <Text>{formatTime(this.state.position)}</Text> */}
        {/* <ProgressBar
          progress={this.getProgress()}
          buffered={this.getBufferedProgress()}
        /> */}
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={this.getProgress()}
          onTouchStart={this.onTouchStart}
          onSlidingComplete={this.onSlidingComplete}
          minimumTrackTintColor={Colors.taleGreen}
          maximumTrackTintColor={Colors.border}
        />
      </View>
    );
  }
}

export default ProgressBar;
