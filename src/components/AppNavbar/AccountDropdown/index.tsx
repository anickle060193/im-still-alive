import * as React from 'react';
import * as Bootstrap from 'react-bootstrap';
import * as ReactRouterBootstrap from 'react-router-bootstrap';
import * as firebase from 'firebase';

interface AccountDropdownState
{
    user: firebase.User | null;
}

export default class AccountDropdown extends React.Component<{}, AccountDropdownState>
{
    constructor( props: {} )
    {
        super( props );

        firebase.auth().onAuthStateChanged( ( user: firebase.User ) =>
        {
            this.setState( { user: user } );
        } );

        this.state = { user: null };
    }

    render()
    {
        if( this.state.user )
        {
            return (
                <Bootstrap.NavDropdown id="account-dropdown-signed-in" title={this.state.user.displayName as string}>
                    <Bootstrap.MenuItem>Account</Bootstrap.MenuItem>
                    <Bootstrap.MenuItem divider={true} />
                    <Bootstrap.MenuItem onClick={() => this.onSignOutClick()}>Sign Out</Bootstrap.MenuItem>
                </Bootstrap.NavDropdown>
            );
        }
        else
        {
            return (
                <ReactRouterBootstrap.LinkContainer to="/sign-in">
                    <Bootstrap.NavItem>Sign In</Bootstrap.NavItem>
                </ReactRouterBootstrap.LinkContainer>
            );
        }
    }

    private onSignOutClick()
    {
        firebase.auth().signOut();
    }
}