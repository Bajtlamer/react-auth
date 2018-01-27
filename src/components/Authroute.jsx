import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import { checkAuth } from '../services/AuthService';

export const AuthRoute = ({ component: Component, ...rest }) => {
    return <Route { ...rest } render = { props => (
        checkAuth() ? (
            <Component { ...props } />
        ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
    )} />
}