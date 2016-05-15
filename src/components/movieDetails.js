'use strict';

import React from 'react'
import ReactNative from 'react-native'
import helper from '../helpers/helper'

const { PropTypes } =  React;

const {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} = ReactNative;

class MovieDetails extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.mainSection}>
          <Image
            source={helper.getImageSource(this.props.movie, 'det')}
            style={styles.detailsImage}
          />
          <View style={styles.rightPane}>
            <Text style={styles.movieTitle}>{this.props.movie.title}</Text>
            <Text>{this.props.movie.year}</Text>
            <View style={styles.mpaaWrapper}>
              <Text style={styles.mpaaText}>
                {this.props.movie.mpaa_rating}
              </Text>
            </View>
            <Ratings ratings={this.props.movie.ratings} />
          </View>
        </View>
        <View style={styles.separator} />
        <Text>
          {this.props.movie.synopsis}
        </Text>
        <View style={styles.separator} />
        <Cast actors={this.props.movie.abridged_cast} />
      </ScrollView>
    );
  }
}

MovieDetails.propTypes = {
    movie: PropTypes.object.isRequired
}

class Ratings extends React.Component{
  render() {
    var criticsScore = this.props.ratings.critics_score;
    var audienceScore = this.props.ratings.audience_score;

    return (
      <View>
        <View style={styles.rating}>
          <Text style={styles.ratingTitle}>Critics:</Text>
          <Text style={[styles.ratingValue, helper.getStyleFromScore(criticsScore)]}>
            {helper.getTextFromScore(criticsScore)}
          </Text>
        </View>
        <View style={styles.rating}>
          <Text style={styles.ratingTitle}>Audience:</Text>
          <Text style={[styles.ratingValue, helper.getStyleFromScore(audienceScore)]}>
            {helper.getTextFromScore(audienceScore)}
          </Text>
        </View>
      </View>
    );
  }
}

class Cast extends React.Component{
  render() {
    if (!this.props.actors) {
      return null;
    }

    return (
      <View>
        <Text style={styles.castTitle}>Actors</Text>
        {this.props.actors.map(actor =>
          <Text key={actor.name} style={styles.castActor}>
            &bull; {actor.name}
          </Text>
        )}
      </View>
    );
  }
};

var styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
  },
  rightPane: {
    justifyContent: 'space-between',
    flex: 1,
  },
  movieTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  rating: {
    marginTop: 10,
  },
  ratingTitle: {
    fontSize: 14,
  },
  ratingValue: {
    fontSize: 28,
    fontWeight: '500',
  },
  mpaaWrapper: {
    alignSelf: 'flex-start',
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 3,
    marginVertical: 5,
  },
  mpaaText: {
    fontFamily: 'Palatino',
    fontSize: 13,
    fontWeight: '500',
  },
  mainSection: {
    flexDirection: 'row',
  },
  detailsImage: {
    width: 134,
    height: 200,
    backgroundColor: '#eaeaea',
    marginRight: 10,
  },
  separator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
  castTitle: {
    fontWeight: '500',
    marginBottom: 3,
  },
  castActor: {
    marginLeft: 2,
  },
});

export default MovieDetails;
