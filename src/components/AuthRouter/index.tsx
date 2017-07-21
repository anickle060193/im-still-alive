import * as React from 'react';
import * as ReactRouter from 'react-router-dom';

interface AuthRouteProps
{
    component: React.Component;
    signedIn: boolean;
}

export const PrivateRoute: React.SFC<AuthRouteProps & ReactRouter.RouteProps & any> = ( { component: Component, signedIn, ...rest } ) => //tslint:disable-line
{
    return (
        <ReactRouter.Route
            {...rest}
            render={( props ) =>
            (
                signedIn
                    ? <Component {...props} />
                    : <ReactRouter.Redirect to={{ pathname: '/sign-in', state: { from: props.location } }} />
            )}
        />
    );
};

export const PublicRoute: React.SFC<AuthRouteProps & ReactRouter.RouteProps & any> = ( { component: Component, signedIn, ...rest } ) => //tslint:disable-line
{
    return (
        <ReactRouter.Route
            {...rest}
            render={( props ) =>
            (
                !signedIn
                    ? <Component {...props} />
                    : <ReactRouter.Redirect to="/" />
            )}
        />
    );
};