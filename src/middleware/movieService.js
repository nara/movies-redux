
import movieCache from './movieCache'
import { errorOnReceivingMoving, retrievedMovies } from '../actions/index'

var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/';
var API_KEYS = [
  '7waqfqbprs7pajbz28mqf6vz',
  // 'y4vwv8m33hed9ety83jmv52f', Fallback api_key
];

const getUrlForQuery = (query: string, pageNumber: number, queryNumber: number): string => {
    var apiKey = API_KEYS[queryNumber % API_KEYS.length];
    if (query) {
      return (
        API_URL + 'movies.json?apikey=' + apiKey + '&q=' +
        encodeURIComponent(query) + '&page_limit=20&page=' + pageNumber
      );
    } else {
      // With no query, load latest movies
      return (
        API_URL + 'lists/movies/in_theaters.json?apikey=' + apiKey +
        '&page_limit=20&page=' + pageNumber
      );
    }
}

class MovieService {
    
    constructor(){
        this.queryNumber = 0;
    }
     
     fetchMovies(filter: string, dispatch: any) {
        
        var cachedData = movieCache.getDataForQuery(filter);
        if(cachedData) return cachedData;

        this.queryNumber += 1;        
        var pageNumber = 1;
        
        var url = getUrlForQuery(filter, pageNumber, this.queryNumber);
        fetch(url)
            .then((response) => response.json())
            .catch((error) => {
                movieCache.setDataForQuery(filter, null, pageNumber);
                dispatch(errorOnReceivingMoving());
            })
            .then((responseData) => {
                movieCache.setDataForQuery(filter, responseData, pageNumber);
                cachedData = movieCache.getDataForQuery(filter);
                dispatch(retrievedMovies(cachedData));
            });
            
        return null;
    }
    
    getNextPage(filter: string, dispatch: any) {
        
        var cachedData = movieCache.getDataForQuery(filter);
        
        this.queryNumber += 1;
        var pageNumber = cachedData.pageNumber + 1;
        
        var url = getUrlForQuery(filter, pageNumber, this.queryNumber);
        
        fetch(url)
            .then((response) => response.json())
            .catch((error) => {
                dispatch(errorOnReceivingMoving());
            })
            .then((responseData) => {
                if (!responseData.movies) {
                    resultsCache.totalForQuery[query] = moviesForQuery.length;
                    movieCache.setDataForQuery(filter, cachedData, pageNumber, cachedData.length);
                } else {
                    for (var i in responseData.movies) {
                        cachedData.movies.push(responseData.movies[i]);
                    }
                    movieCache.setDataForQuery(filter, cachedData, pageNumber, cachedData.length);
                }
                dispatch(retrievedMovies(cachedData));
            });
            
        return null;
    }
}

export default new MovieService();