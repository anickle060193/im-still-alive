import * as React from 'react';
import * as firebase from 'firebase';

interface UserManagementProps
{
    signedIn: ( user: firebase.User ) => JSX.Element | null | false;
    notSignedIn: () => JSX.Element | null | false;
    loading?: () => JSX.Element | null | false;
}

export interface UserManagementState
{
    user: firebase.User | null;
    hasAuthStateChanged: boolean;
}

export default abstract class UserManagement extends React.Component<UserManagementProps, UserManagementState>
{
    private onAuthStateChangedOff: () => void;

    constructor( props: UserManagementProps )
    {
        super( props );

        this.state = { user: null, hasAuthStateChanged: false };
    }

    componentWillMount()
    {
        this.onAuthStateChangedOff = firebase.auth().onAuthStateChanged( ( user: firebase.User ) =>
        {
            this.setState( { user: user, hasAuthStateChanged: true } );
        } );
    }

    render()
    {
        if( !this.state.hasAuthStateChanged && this.props.loading )
        {
            return this.props.loading();
        }
        else if( this.state.user )
        {
            return this.props.signedIn( this.state.user );
        }
        else
        {
            return this.props.notSignedIn();
        }
    }

    componentWillUnmount()
    {
        if( this.onAuthStateChangedOff )
        {
            this.onAuthStateChangedOff();
        }
    }
}
