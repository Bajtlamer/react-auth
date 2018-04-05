import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NotFound from './components/not-found';
import Logout from './components/Logout';
import Account from './components/Account';
import AuthRoute from './components/Authroute'
import { Switch } from 'react-router';
import Dashboard from './components/dashboard';

ReactDOM.render(
    <Router>
        <Switch>
            <AuthRoute exact path="/" component={Dashboard} />
            <AuthRoute exact path="/account" component={Account} />
            <Route exact path="/login" render = {props => <Login {...props} />} />
            <Route exact path="/logout" render = {props => <Logout {...props} />} />
            <Route exact path="/register"  render = {props => <Register {...props} />}/>
            <Route component={NotFound} />
        </Switch>
    </Router>
, document.getElementById('root'));
// registerServiceWorker();
