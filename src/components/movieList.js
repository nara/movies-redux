
import React from "react"
import ReactNative from "react-native"
import { connect } from "react-redux";
import MovieCell from './movieCell'
import NoMovies from './noMovies'
import MovieDetails from './movieDetails'

const { PropTypes } = React;

const {
  StyleSheet,
  View,
  Text,
  ListView,
  Platform,
  ActivityIndicatorIOS,
  ProgressBarAndroid
} = ReactNative;

class MovieList extends React.Component {

    constructor(props){
        super(props);
        
        this.renderRow = this.renderRow.bind(this);
        this.selectMovie = this.selectMovie.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.onEndReached = this.onEndReached.bind(this);
        
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
    }
    
    render(){
        
        var { movies } = this.props;
        this.dataSource = this.dataSource.cloneWithRows(movies || []);
        
        var content = this.dataSource.getRowCount() === 0 ?
            <NoMovies
                filter={this.props.filter}
                isLoading={this.props.isLoading}
            /> :
            <ListView
                ref="listview"
                renderSeparator={this.renderSeparator}
                dataSource={this.dataSource}
                renderFooter={this.renderFooter}
                renderRow={this.renderRow}
                onEndReached={this.onEndReached}
                automaticallyAdjustContentInsets={false}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps={true}
                showsVerticalScrollIndicator={false}
            />;
        return (<View style={styles.container}>
                {content}
            </View>
            )
    }
    
    selectMovie(movie: Object) {
        if (Platform.OS === 'ios') {
            this.props.navigator.push({
                title: movie.title,
                component: MovieDetails,
                passProps: {movie},
            });
        } else {
        //dismissKeyboard();
            this.props.navigator.push({
                title: movie.title,
                name: 'movie',
                movie: movie,
            });
        }
    }
    
    renderRow(movie: Object, sectionID: number | string,
        rowID: number | string,
        highlightRowFunc: (sectionID: ?number | string, rowID: ?number | string) => void
    ) {
        return (
        <MovieCell
            key={movie.id}
            onSelect={() => this.selectMovie(movie)}
            onHighlight={() => highlightRowFunc(sectionID, rowID)}
            onUnhighlight={() => highlightRowFunc(null, null)}
            movie={movie}
        />
        );
    }
    
    renderFooter() {
        
        if (!this.props.hasMoviesToDisplay || this.props.isLoadingTail) {
            return <View style={styles.scrollSpinner} />;
        }
        if (Platform.OS === 'ios') {
            return <ActivityIndicatorIOS style={styles.scrollSpinner} />;
        } else {
            return (
                <View  style={{alignItems: 'center'}}>
                  <ProgressBarAndroid styleAttr="Large"/>
                </View>
            );
        }
    }
    
    onEndReached() {
        var query = this.props.filter;
        if (!this.props.hasMoviesToDisplay || this.props.isLoadingTail ||  this.props.isLoading) {
            return;
        }
        
        this.props.getMoviesNextPage(query);
    }
    
    renderSeparator(sectionID: number | string, rowID: number | string, adjacentRowHighlighted: boolean) {
        var style = styles.rowSeparator;
        if (adjacentRowHighlighted) {
            style = [style, styles.rowSeparatorHide];
        }
        return (
            <View key={'SEP_' + sectionID + '_' + rowID}  style={style}/>
        );
    }
    
    scrollUpList(){
        if(this.refs.listview){
            this.refs.listview.getScrollResponder().scrollTo({ x: 0, y: 0 });
        }
    }
}

MovieList.propTypes = {
    query: PropTypes.string.isRequired,
    movies: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    hasMoviesToDisplay: PropTypes.bool.isRequired,
    isLoadingTail: PropTypes.bool.isRequired
}

var styles = StyleSheet.create({
  container:{
    flex: 1  
  },
  scrollSpinner: {
    marginVertical: 20,
  },
  rowSeparator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1,
    marginLeft: 4,
  },
  rowSeparatorHide: {
    opacity: 0.0,
  },
});


export default MovieList;

