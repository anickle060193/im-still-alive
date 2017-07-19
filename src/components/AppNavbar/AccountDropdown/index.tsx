import * as React from 'react';
import * as Bootstrap from 'react-bootstrap';
import * as ReactRouterBootstrap from 'react-router-bootstrap';
import * as firebase from 'firebase';

import UserManagment from './../../UserManagement';

const SignedInDropdownEntry: React.SFC<{ user: firebase.User, onSignOutClick: () => void }> = ( props ) =>
{
    return(
        <Bootstrap.NavDropdown id="account-dropdown-signed-in" title={props.user.displayName as string}>
            <Bootstrap.MenuItem onClick={() => props.onSignOutClick()}>Sign Out</Bootstrap.MenuItem>
        </Bootstrap.NavDropdown>
    );
};

const NotSignedInDropdownEntry: React.SFC<{}> = ( props ) =>
{
    return (
        <ReactRouterBootstrap.LinkContainer to="/sign-in">
            <Bootstrap.NavItem>Sign In</Bootstrap.NavItem>
        </ReactRouterBootstrap.LinkContainer>
    );
};

export default class AccountDropdown extends React.Component<{}, {}>
{
    render()
    {
        return (
            <UserManagment
                signedIn={( user ) => <SignedInDropdownEntry user={user} onSignOutClick={() => this.onSignOutClick()} />}
                notSignedIn={() => <NotSignedInDropdownEntry/>}
            />
        );
    }

    private onSignOutClick()
    {
        firebase.auth().signOut();
    }
}