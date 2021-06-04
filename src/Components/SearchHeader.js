import React, {PureComponent} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import debounce from 'debounce';
import Colors from '../Themes/Colors';
import ItunesActions from '../Redux/ItunesRedux';
import {connect} from 'react-redux';
import MusicPlayerHolder from '../Helper/MusicPlayerHolder';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 17.5,
    height: 35,
    paddingHorizontal: 15,
    borderColor: Colors.border,
  },
});

/**
 * Search Component this component used to trigger search action on typing using debounce schema.
 */
class SearchHeader extends PureComponent {
  constructor(props) {
    super(props);

    this.onChangeText = debounce(this.onChangeText.bind(this), 300);
  }

  // this function will trigger search action to the api and stop & hide music playar
  onChangeText(text) {
    const {searchArtistRequest} = this.props;
    MusicPlayerHolder.stop();
    searchArtistRequest(text);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder={'Search Artist'}
          onChangeText={this.onChangeText}
          style={styles.textInput}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    searchArtistRequest: keywords =>
      dispatch(ItunesActions.searchArtistRequest(keywords)),
  };
};

export default connect(null, mapDispatchToProps)(SearchHeader);
