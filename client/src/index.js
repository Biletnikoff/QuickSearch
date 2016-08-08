import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/App';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
const lightMuiTheme = getMuiTheme(lightBaseTheme);

// const middlewares = [thunk];

// let enhancer = compose(
//   applyMiddleware(...middlewares),
//   window.devToolsExtension ? window.devToolsExtension() : f => f
// );
//
// function configureStore(initialState) {
//   const store = createStore(reducer, initialState, enhancer);
//   if (module.hot) {
//     module.hot.accept(() => {
//       // combines all the reducers in the file and attaches it to
//       store.replaceReducer(require('./reducers'));
//     });
//   }
//   return store;
// }
//
// let store = configureStore();

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme()}>

  <App />

  </MuiThemeProvider>
  , document.getElementById('app'));
