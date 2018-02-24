import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// Import default Bootstrap 4 CSS
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NotFound from './components/not-found';
import Logout from './components/Logout';
import Account from './components/Account';
import Sections from './components/SectionList';
import { AuthRoute } from './components/Authroute'
import { Switch } from 'react-router';

ReactDOM.render(
    <Router>
        <Switch>
            <AuthRoute exact path="/" component={App} />
            <AuthRoute exact path="/account" component={Account} />
            <AuthRoute exact path="/sections" component={Sections} />
            <AuthRoute exact path="/sections/:id" component={Sections} />
            <Route exact path="/login" render = {props => <Login {...props} />} />
            <Route exact path="/logout" render = {props => <Logout {...props} />} />
            <Route exact path="/register"  render = {props => <Register {...props} />}/>
            <Route component={NotFound} />
        </Switch>
    </Router>
, document.getElementById('root'));
registerServiceWorker();
