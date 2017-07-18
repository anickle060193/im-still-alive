import * as React from 'react';
import * as ReactRouter from 'react-router-dom';

import FirebaseUi from './FirebaseUi';

type SignInProps = ReactRouter.RouteComponentProps<{}>;

export default class SignIn extends React.Component<SignInProps, {}>
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
        this.props.history.push( '/' );
    }
}