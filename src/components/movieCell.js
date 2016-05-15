'use strict';

import React from 'react'
import ReactNative from 'react-native'

const { PropTypes } = React;

const {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  View
} = ReactNative;

import helper from '../helpers/helper'

class MovieCell extends React.Component{
  
  render() {
      
    var criticsScore = this.props.movie.ratings.critics_score;
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }
    return (
      <View>
        <TouchableElement
          onPress={this.props.onSelect}
          onShowUnderlay={this.props.onHighlight}
          onHideUnderlay={this.props.onUnhighlight}>
          <View style={styles.row}>
            <Image
              source={helper.getImageSource(this.props.movie, 'det')}
              style={styles.cellImage}
            />
            <View style={styles.textContainer}>
              <Text style={styles.movieTitle} numberOfLines={2}>
                {this.props.movie.title}
              </Text>
              <Text style={styles.movieYear} numberOfLines={1}>
                {this.props.movie.year}
                {' '}&bull;{' '}
                <Text style={helper.getStyleFromScore(criticsScore)}>
                  Critics {helper.getTextFromScore(criticsScore)}
                </Text>
              </Text>
            </View>
          </View>
        </TouchableElement>
      </View>
    );
  }
}

MovieCell.propTypes = {
    movie: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
    onHighlight: PropTypes.func,
    onUnhighlight: PropTypes.func
}

var styles = StyleSheet.create({
  textContainer: {
    flex: 1,
  },
  movieTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  movieYear: {
    color: '#999999',
    fontSize: 12,
  },
  row: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 5,
  },
  cellImage: {
    backgroundColor: '#dddddd',
    height: 93,
    marginRight: 10,
    width: 60,
  },
  cellBorder: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: StyleSheet.hairlineWidth,
    marginLeft: 4,
  },
});

export default MovieCell;
