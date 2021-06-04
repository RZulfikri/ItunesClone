import React from 'react';
import Slider from '@react-native-community/slider';
import {StyleSheet, View} from 'react-native';
import {ProgressComponent} from 'react-native-track-player';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  slider: {
    width: '100%',
    height: 30,
  },
});

/**
 * This is a component that extend event from ProgressComponent, to track player position in realtime
 */

class ProgressBar extends ProgressComponent {
  constructor(props) {
    super(props);

    this.onTouchStart = this.onTouchStart.bind(this);
    this.onSlidingComplete = this.onSlidingComplete.bind(this);
  }

  // function to pause player on slider touched
  async onTouchStart() {
    const {onPause} = this.props;
    onPause();
  }

  // function to seek player on slider complete
  onSlidingComplete(val) {
    const {onSeek} = this.props;
    onSeek(val);
  }

  render() {
    return (
      <View>
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
