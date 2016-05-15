# movies-redux app

This is redux implementation of Movies app that is part of react-native at [Movies Example](https://github.com/facebook/react-native/tree/master/Examples/Movies). Most of the code is taken from Movies example from react-native and refactored to using Redux. Same license that applies to original Movies example applies to this example as well.

It uses logging and thunk redux middlewares.

### Running this app on ios

Mac OS and Xcode are required.

    git clone git@github.com:nara/movies-redux.git
    cd movies-redux
    npm install
    open ios/MoviesRedux.xcodeproj
    Hit run button

- Open `Examples/Movies/Movies.xcodeproj` in Xcode
- Hit the Run button

See [Running on device](https://facebook.github.io/react-native/docs/running-on-device-ios.html) if you want to use a physical device.

This source is built using `react-native init`