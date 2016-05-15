export const FETCHING_MOVIES = "FETCHING_MOVIES";
export const FETCHING_NEXT_PAGE_MOVIES = "FETCHING_NEXT_PAGE_MOVIES";
export const RECEIVED_DATA = "RECEIVED_DATA";
export const ERROR_GETTING_MOVIES = "ERROR_GETTING_MOVIES";

import movieService from '../middleware/movieService'

export const fetchMovies = (): Object => {
  return {
    type: FETCHING_MOVIES
  }
}

export const fetchingNextPageMovies = (): Object => {
  return {
    type: FETCHING_NEXT_PAGE_MOVIES
  }
}

export const searchMovies = (filter: string): Function => {
  return (dispatch) => {
    dispatch(fetchMovies());
    movieService.fetchMovies(filter, dispatch);
  };
};

export const getMoviesNextPage = (filter: string): Function => {
  return (dispatch) => {
    dispatch(fetchingNextPageMovies());
    movieService.getNextPage(filter, dispatch);
  };
};

export const errorOnReceivingMoving = (): Object => {
  return {
    type: ERROR_GETTING_MOVIES,
  };
};

export const retrievedMovies = (data: Object): Object => {
  return {
    type: RECEIVED_DATA,
    data
  };
};

export const fetchData = (): Function => {
  return (dispatch) => {
    dispatch(requestData());
    return setTimeout(() => {
      const data = {message: "Hello"};
      dispatch(receiveData(data));
    }, 300);
  };
};
