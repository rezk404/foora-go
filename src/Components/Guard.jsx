import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const GuardedRoute = ({ component: Component, token, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            token ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" /> // Redirect to the login page if the token is not present
            )
        }
    />
);

export default GuardedRoute;