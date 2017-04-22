var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, browserHistory} = require('react-router');
var io = require('socket.io-client');
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

var Main = require('./components/Main');
var About = require('./components/About');
import Login from './components/Login';
import Polls from './components/Polls';
import Poll from './components/Poll';
import Result from './components/Result';
import NewPoll from './components/NewPoll';
import SignupPage from './components/signup/SignupPage';
import reducers from './reducers/reducers';
import {setState} from './actions/actions';
import remoteActionMiddleware from './middleware/remote_action_middleware';
//Load foundation
$(document).foundation();

//App css
require('style!css!sass!applicationStyles');

const socket = io('http://localhost:8090');
socket.on('state', (state) => {
  console.log('received',state);
  store.dispatch(setState(state));
});

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket),
  thunk
)(createStore);
const store = createStoreWithMiddleware(reducers);

const routes = <Route path="/" component={Main}>
      <Route path="about" component={About}/>
      <Route path="signup" component={SignupPage}/>
      <Route path="login" component={Login}/>
      <Route path="polls/new" component={NewPoll}/>
      <Route path="polls/:id/vote" component={Poll}/>
      <Route path="polls/:id/result" component={Result}/>
      <IndexRoute component={Polls}/>    
    </Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
