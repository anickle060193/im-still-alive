import * as React from 'react';
import * as firebase from 'firebase';
import * as firebaseUI from 'firebaseui';

import * as database from 'database';

interface FirebaseUiProps
{
    onSignInSuccess: () => void;
}

export default class FirebaseUi extends React.Component<FirebaseUiProps, {}>
{
    private static authUi: AuthUi;

    constructor( props: FirebaseUiProps )
    {
        super( props );
    }

    componentDidMount()
    {
        if( !FirebaseUi.authUi )
        {
            FirebaseUi.authUi = new firebaseUI.auth.AuthUI( firebase.auth() );
        }

        let uiConfig = {
            callbacks: {
                signInSuccess: ( user: firebase.User ) => this.onSignInSuccess( user )
            },
            signInFlow: 'popup',
            signInOptions: [
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
                firebase.auth.GoogleAuthProvider.PROVIDER_ID
            ]
        };
        FirebaseUi.authUi.start( '#firebaseui-auth-container', uiConfig );
    }

    render()
    {
        return (
            <div id="firebaseui-auth-container" />
        );
    }

    componentWillUnmount()
    {
        FirebaseUi.authUi.reset();
    }

    private onSignInSuccess( user: firebase.User )
    {
        database.saveUserProfile( user ).then( () =>
        {
            this.props.onSignInSuccess();
        } );
        return false;
    }
}