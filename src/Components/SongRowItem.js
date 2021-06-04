import React, {PureComponent} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MusicPlayerHolder from '../Helper/MusicPlayerHolder';
import Colors from '../Themes/Colors';
import ItunesActions from '../Redux/ItunesRedux';
import {connect} from 'react-redux';
import ActiveSongIndicator from './ActiveSongIndicator';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  coverImage: {
    width: 50,
    height: 50,
  },
  songName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  songArtist: {
    fontSize: 12,
  },
  songAlbum: {
    fontSize: 10,
  },
});

class SongRowItem extends PureComponent {
  constructor(props) {
    super(props);
    this.onPressItem = this.onPressItem.bind(this);
  }

  onPressItem() {
    const {data, setActiveSong} = this.props;
    MusicPlayerHolder.play(data);
    setActiveSong(data.toJS());
  }

  render() {
    const {data} = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.8}
        onPress={this.onPressItem}>
        <Image
          source={{uri: data.get('artworkUrl100')}}
          resizeMethod={'resize'}
          resizeMode={'cover'}
          style={styles.coverImage}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.songName}>{data.get('trackName')}</Text>
          <Text style={styles.songArtist}>{data.get('artistName')}</Text>
          <Text style={styles.songAlbum}>{data.get('collectionName')}</Text>
        </View>
        <View>
          <ActiveSongIndicator data={data} />
        </View>
      </TouchableOpacity>
    );
  }
}

const mapDisPatchToProps = dispatch => {
  return {
    setActiveSong: params => dispatch(ItunesActions.setActiveSong(params)),
  };
};

export default connect(null, mapDisPatchToProps)(SongRowItem);
