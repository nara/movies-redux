'use strict';

import React from 'react-native'
import { StyleObj } from 'StyleSheetTypes';

var {
  StyleSheet
} = React;

var MAX_VALUE = 200;

class Helper {

  getImageSource(movie: Object, kind: ?string): {uri: ?string} {
    var uri = movie && movie.posters ? movie.posters.thumbnail : null;
    if (uri && kind) {
        uri = uri.replace('tmb', kind);
    }
    return { uri };
  }
  
  getStyleFromScore(score: number): StyleObj {
    if (score < 0) {
        return styles.noScore;
    }

    var normalizedScore = Math.round((score / 100) * MAX_VALUE);
    return {
        color: 'rgb(' +
        (MAX_VALUE - normalizedScore) + ', ' +
        normalizedScore + ', ' +
        0 +
        ')'
    };
  }
  
  getTextFromScore(score: number): string {
    return score > 0 ? score + '%' : 'N/A';
  }
}

var styles = StyleSheet.create({
  noScore: {
    color: '#999999',
  },
});

export default new Helper();


