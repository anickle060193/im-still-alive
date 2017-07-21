import * as React from 'react';
import * as Bootstrap from 'react-bootstrap';
import * as ReactRouter from 'react-router-dom';
import * as firebase from 'firebase';

import * as AuthRouter from 'components/AuthRouter';
import AppNavbar from 'components/AppNavbar';
import Welcome from 'scenes/Welcome';
import Home from 'scenes/Home';
import SignIn from 'scenes/SignIn';

interface AppState
{
    signedIn: boolean;
    loading: boolean;
}

export default class App extends React.Component<{}, AppState>
{
    private removeOnAuthStateChangedListener: ( () => void ) | null;

    constructor( props: {} )
    {
        super( props );

        this.state = {
            signedIn: false,
            loading: true
        };
    }

    componentWillMount()
    {
        this.removeOnAuthStateChangedListener = firebase.auth().onAuthStateChanged( ( user: firebase.User ) =>
        {
            this.setState( {
                signedIn: !!user,
                loading: false
            } );
        } );
    }

    componentWillUnMount()
    {
        if( this.removeOnAuthStateChangedListener )
        {
            this.removeOnAuthStateChangedListener();
        }
    }

    render()
    {
        if( this.state.loading )
        {
            return (
                <Bootstrap.ProgressBar active={true} striped={true} now={100} />
            );
        }
        else
        {
            return (
                <ReactRouter.BrowserRouter>
                    <Bootstrap.Grid>
                        <AppNavbar/>

                        <ReactRouter.Switch>
                            <ReactRouter.Route exact={true} path="/" component={this.state.signedIn ? Home : Welcome} />
                            <AuthRouter.PublicRoute path="/sign-in" signedIn={this.state.signedIn} component={SignIn} />
                            <ReactRouter.Redirect to="/" />
                        </ReactRouter.Switch>

                    </Bootstrap.Grid>
                </ReactRouter.BrowserRouter>
            );
        }
    }
}