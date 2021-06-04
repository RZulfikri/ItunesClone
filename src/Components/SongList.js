import React, {PureComponent} from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {ItunesSelectors} from '../Redux/ItunesRedux';
import SongRowItem from './SongRowItem';

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
    const {isLoading, results} = this.props;
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
      />
    );
  }
}

const selector = createSelector(
  [
    ItunesSelectors.getSearchLoading,
    ItunesSelectors.getSearchResult,
    ItunesSelectors.getSearchErrorStatus,
  ],
  (isLoading, results, isError) => {
    return {
      isLoading,
      results,
      isError,
    };
  },
);

const mapStateToProps = state => {
  return selector(state);
};

export default connect(mapStateToProps, null)(SongList);
