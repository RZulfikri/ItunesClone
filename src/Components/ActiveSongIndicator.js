import React, {PureComponent} from 'react';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import {ItunesSelectors} from '../Redux/ItunesRedux';
import Colors from '../Themes/Colors';

/**
 * Component to idicate active music/song in the list
 */

class ActiveSongIndicator extends PureComponent {
  render() {
    const {data, activeSong} = this.props;
    if (activeSong) {
      if (data.get('trackId') === activeSong.get('trackId')) {
        return <Icons name={'volume-high'} size={30} color={Colors.black} />;
      }
    }

    return null;
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

export default connect(mapStateToProps, null)(ActiveSongIndicator);
