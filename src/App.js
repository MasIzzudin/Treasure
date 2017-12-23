import React, { Component } from 'react';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Route } from '../Route';
import reducers from './reducers';

export default class App extends Component {
  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        Actions.home();
      }
    });
  }
  
  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Route />
      </Provider>
    );
  }
}
