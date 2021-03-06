import * as React from 'react';
import * as Bootstrap from 'react-bootstrap';
import * as ReactRouter from 'react-router-dom';
import * as firebase from 'firebase';

import * as AuthRouter from 'components/AuthRouter';
import AppNavbar from 'components/AppNavbar';
import Loading from 'components/Loading';

import Welcome from 'scenes/Welcome';
import Home from 'scenes/Home';
import SignIn from 'scenes/SignIn';
import Profile from 'scenes/Profile';

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
                <Loading/>
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
                            <ReactRouter.Route path="/user/:userId" render={( props ) => <Profile key={props.match.params.userId} userId={props.match.params.userId}/>} />
                            <ReactRouter.Redirect to="/" />
                        </ReactRouter.Switch>

                    </Bootstrap.Grid>
                </ReactRouter.BrowserRouter>
            );
        }
    }
}