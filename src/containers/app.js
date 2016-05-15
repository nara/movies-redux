import React from "react"
import ReactNative from "react-native"
import { connect } from "react-redux"
import { fetchData } from "../actions"
import MoviesScreen from '../containers/moviesScreen'

let {
  NavigatorIOS,
  StyleSheet
} = ReactNative;

class App extends React.Component {
  
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Movies',
          component: MoviesScreen 
        }}
      >
      </NavigatorIOS>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});

export default App;
