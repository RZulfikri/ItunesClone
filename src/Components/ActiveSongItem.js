import React, {PureComponent} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {ItunesSelectors} from '../Redux/ItunesRedux';
import Colors from '../Themes/Colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cover: {
    width: 35,
    height: 35,
    backgroundColor: Colors.border,
    marginRight: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
  },
  songName: {
    fontSize: 13,
    fontWeight: '700',
  },
  songArtist: {
    fontSize: 10,
  },
  songAlbum: {
    fontSize: 8,
  },
});

class ActiveSongItem extends PureComponent {
  render() {
    const {activeSong} = this.props;
    if (activeSong) {
      return (
        <View style={styles.container}>
          <Image
            source={{uri: activeSong.get('artworkUrl100')}}
            resizeMethod={'resize'}
            resizeMode={'cover'}
            style={styles.cover}
          />
          <View style={{flex: 1}}>
            <Text
              style={styles.songName}
              numberOfLines={1}
              ellipsizeMode={'tail'}>
              {activeSong.get('trackName')}
            </Text>
            <Text
              style={styles.songArtist}
              numberOfLines={1}
              ellipsizeMode={'tail'}>
              {activeSong.get('artistName')}
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.cover} />
          <Text style={styles.label}>No Music</Text>
        </View>
      );
    }
  }
}

const selector = createSelector([ItunesSelectors.getActiveSong], activeSong => {
  return {
    activeSong,
  };
});

const mapStateToProps = state => {
  return selector(state);
};

export default connect(mapStateToProps, null)(ActiveSongItem);
