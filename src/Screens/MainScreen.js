import React, {PureComponent} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import MusicControl from '../Components/MusicControl';
import SearchHeader from '../Components/SearchHeader';
import SongList from '../Components/SongList';
import MusicPlayerHolder from '../Helper/MusicPlayerHolder';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class MainScreen extends PureComponent {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <SearchHeader />
        <SongList />
        <MusicControl setRef={r => MusicPlayerHolder.setInstance(r)} />
      </SafeAreaView>
    );
  }
}

export default MainScreen;
