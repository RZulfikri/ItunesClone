import React, {PureComponent} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {ItunesSelectors} from '../Redux/ItunesRedux';
import SongRowItem from './SongRowItem';

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 15,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

/**
 * This component is used to show list of music/song respone from the api
 */

class SongList extends PureComponent {
  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onLoadMore = this.onLoadMore.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  onRefresh() {}

  onLoadMore() {}

  fetchData() {}

  renderItem({item}) {
    return <SongRowItem data={item} />;
  }

  render() {
    const {isLoading, results, keyword} = this.props;
    return (
      <FlatList
        data={results.toArray()}
        keyExtractor={item => item.get('trackId').toString()}
        renderItem={this.renderItem}
        refreshing={isLoading}
        onRefresh={this.onRefresh}
        onEndReached={this.onLoadMore}
        contentContainerStyle={{flexGrow: 1}}
        keyboardDismissMode={'interactive'}
        keyboardShouldPersistTaps={'handled'}
        ListEmptyComponent={() => {
          if (isLoading) {
            return (
              <View style={styles.emptyContainer}>
                <Text style={styles.title}>Loading</Text>
                <Text style={styles.message}>Looking for your music</Text>
              </View>
            );
          }

          if (keyword && keyword.length > 0) {
            return (
              <View style={styles.emptyContainer}>
                <Text style={styles.title}>No Result Found</Text>
                <Text style={styles.message}>Try another keyword</Text>
              </View>
            );
          }

          return (
            <View style={styles.emptyContainer}>
              <Text style={styles.title}>Search your artist</Text>
              <Text style={styles.message}>To start listening your music</Text>
            </View>
          );
        }}
      />
    );
  }
}

const selector = createSelector(
  [
    ItunesSelectors.getSearchLoading,
    ItunesSelectors.getSearchResult,
    ItunesSelectors.getSearchErrorStatus,
    ItunesSelectors.getSearchKeyword,
  ],
  (isLoading, results, isError, keyword) => {
    return {
      isLoading,
      results,
      isError,
      keyword,
    };
  },
);

const mapStateToProps = state => {
  return selector(state);
};

export default connect(mapStateToProps, null)(SongList);
