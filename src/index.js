import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Account from './components/Account';
import { Redirect } from 'react-router';
import { checkAuth } from './services/AuthService';

const AuthRoute = ({ component: Component, ...rest }) => {
    return <Route { ...rest } render = { props => (
        checkAuth() ? (
            <Component { ...props } />
        ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
    )} />
}

ReactDOM.render(
    <Router>
        <div>
            <AuthRoute exact path="/" component={App} />
            <AuthRoute exact path="/account" component={Account} />
            <Route exact path="/login" render = {props => <Login {...props} />} />
            <Route exact path="/register"  render = {props => <Register {...props} />}/>
        </div>
    </Router>
, document.getElementById('root'));
registerServiceWorker();
