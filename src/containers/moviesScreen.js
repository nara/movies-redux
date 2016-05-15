import React from 'react'
import ReactNative from 'react-native'
import SearchBar from '../components/searchBar'
import MovieList from '../components/movieList'
import { connect } from 'react-redux'
import { searchMovies, getMoviesNextPage, focusedOnSearch } from '../actions/index' 

const { PropTypes } = React;
const {
    View,
    StyleSheet
} = ReactNative;

class MoviesScreen extends React.Component {

    constructor(props){
        super(props);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSearchFocus = this.onSearchFocus.bind(this);
    }

    componentDidMount(){
        this.props.searchMovies('');
    }
    
    onSearchChange(event: Object){
        var query = event.nativeEvent.text.toLowerCase();
        this.props.searchMovies(query);
    }
    
    onSearchFocus(){
        if(this.refs.movieList){
            this.refs.movieList.scrollUpList();
        }
    }
    
    render(){
        
        const { movies, query, isLoading } = this.props;
        
        return (
          <View style={styles.container}>
            <SearchBar 
                query={query}
                onSearchChange={this.onSearchChange}
                isLoading={isLoading}
                onFocus={this.onSearchFocus}
            >
            </SearchBar>
            
            <MovieList ref="movieList" {...this.props}>
            </MovieList>
          </View>
        );
    }
}

MoviesScreen.propTypes = {
    query: PropTypes.string.isRequired,
    movies: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    hasMoviesToDisplay: PropTypes.bool.isRequired,
    isLoadingTail: PropTypes.bool.isRequired
}

function mapStateToProps(state, props) { 
    const { filter, movies, isLoading, hasMoviesToDisplay, isLoadingTail } = state.movieData;
    
    return {
        query: filter,
        movies,
        isLoading,
        hasMoviesToDisplay,
        isLoadingTail
    };
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});

export default connect(mapStateToProps, {
    searchMovies, getMoviesNextPage, focusedOnSearch
})(MoviesScreen);