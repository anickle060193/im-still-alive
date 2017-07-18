import * as React from 'react';
import * as Bootstrap from 'react-bootstrap';
import * as ReactRouter from 'react-router-dom';
import * as ReactRouterBootstrap from 'react-router-bootstrap';

import './styles.css';

const AppNavbar: React.SFC<{}> = ( props ) =>
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
                    <ReactRouterBootstrap.LinkContainer to="/check_in">
                        <Bootstrap.NavItem >Check Ins</Bootstrap.NavItem>
                    </ReactRouterBootstrap.LinkContainer>
                    <ReactRouterBootstrap.LinkContainer exact={true} to="/">
                        <Bootstrap.NavItem >Check In</Bootstrap.NavItem>
                    </ReactRouterBootstrap.LinkContainer>
                </Bootstrap.Nav>
            </Bootstrap.Navbar.Collapse>
        </Bootstrap.Navbar>
    );
};

export default AppNavbar;