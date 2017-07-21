import * as React from 'react';
import * as Bootstrap from 'react-bootstrap';
// import * as ReactRouterBootstrap from 'react-router-bootstrap';
import * as ReactRouter from 'react-router-dom';

import AccountDropdown from './AccountDropdown';

import './styles.css';

const AppNavbar: React.SFC = ( props ) =>
{
    return (
        <Bootstrap.Navbar inverse={false} fluid={true} collapseOnSelect={true}>

            <Bootstrap.Navbar.Header>
                <Bootstrap.Navbar.Brand>
                    <ReactRouter.Link to="/">I'm Still Alive</ReactRouter.Link>
                </Bootstrap.Navbar.Brand>
                <Bootstrap.Navbar.Toggle />
            </Bootstrap.Navbar.Header>

            <Bootstrap.Navbar.Collapse>
                <Bootstrap.Nav pullRight={true}>
                    {/*
                    <ReactRouterBootstrap.LinkContainer to="/check-ins">
                        <Bootstrap.NavItem>Check Ins</Bootstrap.NavItem>
                    </ReactRouterBootstrap.LinkContainer>
                    <ReactRouterBootstrap.LinkContainer to="/check-in">
                        <Bootstrap.NavItem>Check In</Bootstrap.NavItem>
                    </ReactRouterBootstrap.LinkContainer>
                    */}

                    <AccountDropdown />
                </Bootstrap.Nav>
            </Bootstrap.Navbar.Collapse>

        </Bootstrap.Navbar>
    );
};

export default AppNavbar;