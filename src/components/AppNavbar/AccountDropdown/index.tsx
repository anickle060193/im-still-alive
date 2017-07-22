import * as React from 'react';
import * as Bootstrap from 'react-bootstrap';
import * as ReactRouterBootstrap from 'react-router-bootstrap';
import * as firebase from 'firebase';

const AccountDropdown: React.SFC = ( props ) =>
{
    let user = firebase.auth().currentUser;

    if( user )
    {
        return (
            <Bootstrap.NavDropdown id="account-dropdown-signed-in" title={( user.displayName || user.email ) as string}>
                <ReactRouterBootstrap.LinkContainer to={`/user/${user.uid}`}>
                    <Bootstrap.MenuItem>Profile</Bootstrap.MenuItem>
                </ReactRouterBootstrap.LinkContainer>
                <Bootstrap.MenuItem onClick={() => firebase.auth().signOut()}>Sign Out</Bootstrap.MenuItem>
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
};

export default AccountDropdown;