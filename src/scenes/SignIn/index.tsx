import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import * as history from 'history';

import FirebaseUi from './FirebaseUi';

type SignInProps = ReactRouter.RouteComponentProps<{}>;

interface SignInState
{
    from: history.Location;
}

export default class SignIn extends React.Component<SignInProps, SignInState>
{
    constructor( props: SignInProps )
    {
        super( props );
    }

    render()
    {
        return (
            <FirebaseUi onSignInSuccess={() => this.onSignInSuccess()} />
        );
    }

    private onSignInSuccess()
    {
        this.props.history.replace( '/' );
    }
}