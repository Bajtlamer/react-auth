import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Switch } from 'react-router';
import Login from './components/Login';
import Register from './components/Register';
import NotFound from './components/not-found';
import Logout from './components/Logout';
import Account from './components/Account';
import AuthRoute from './components/Authroute'
import Dashboard from './components/Dashboard';
import Administration from './components/Administration';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
    <Router>
        <Switch>
            <AuthRoute exact path="/" component={Dashboard} />
            <AuthRoute exact path="/account" component={Account} />
            <AuthRoute exact path="/admin" component={Administration} />
            <Route exact path="/login" render = {props => <Login {...props} />} />
            <Route exact path="/logout" render = {props => <Logout {...props} />} />
            <Route exact path="/register"  render = {props => <Register {...props} />}/>
            <Route component={NotFound} />
        </Switch>
    </Router>
, document.getElementById('root'));
registerServiceWorker();
