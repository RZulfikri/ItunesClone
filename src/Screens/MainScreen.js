import React, {PureComponent} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import MusicControl from '../Components/MusicControl';
import SearchHeader from '../Components/SearchHeader';
import SongList from '../Components/SongList';
import MusicPlayerHolder from '../Helper/MusicPlayerHolder';
import ItunesActions from '../Redux/ItunesRedux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class MainScreen extends PureComponent {
  componentWillUnmount() {
    const {resetStore} = this.props;
    resetStore();
  }

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

const mapDispatchToProps = dispatch => {
  return {
    resetStore: () => dispatch(ItunesActions.resetStore()),
  };
};

export default connect(null, mapDispatchToProps)(MainScreen);
