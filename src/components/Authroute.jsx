import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import { checkAuth } from '../services/fireAuth';
import { firebase } from '../firebase';

class AuthRoute extends React.Component {
    componentDidMount() {
        firebase.auth.onAuthStateChanged(authUser => {
            localStorage.setItem('user', JSON.stringify(authUser));
        });
    }

    render() {
        const { component: Component, ...rest } = this.props;
        return <Route {...rest} render={props => (
            checkAuth() ? (
                <Component {...props} isLogged={checkAuth()} />
            ) : (
                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                )
        )} />
    }
}

export default AuthRoute;