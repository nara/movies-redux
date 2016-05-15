import React from 'react-native'

const {
  ListView
} = React;

import { combineReducers } from "redux";
import * as types from "../actions";

const defaultState = {
  isLoading: false,
  isLoadingTail: false,
  hasMoviesToDisplay: false,
  filter: '',
  movies: []
}
  
const movieReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.FETCHING_MOVIES:
    
      return {
        ...state,
        isLoading: true,
      };
      
    case types.FETCHING_NEXT_PAGE_MOVIES:
    
      return {
        ...state,
        isLoadingTail: true,
      };
      
    case types.ERROR_GETTING_MOVIES:
      return {
        ...state,
        isLoading: false,
        isLoadingTail: false,
        movies: []
      };
      
    case types.RECEIVED_DATA:
      return {
        ...state,
        isLoading: false,
        isLoadingTail: false,
        hasMoviesToDisplay: action.data.total != action.data.movies.length,
        filter: action.data.filter,
        movies: action.data.movies
      };
      
    default:    
      return state;
    }
};

const rootReducer = combineReducers({
  movieData : movieReducer
});

export default rootReducer;
