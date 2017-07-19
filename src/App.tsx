import * as React from 'react';
import * as Bootstrap from 'react-bootstrap';
import * as ReactRouter from 'react-router-dom';

import AppNavbar from './components/AppNavbar';
import Home from './scenes/Home';
import SignIn from './scenes/SignIn';

const App: React.SFC<{}> = ( props ) =>
{
    return (
        <ReactRouter.BrowserRouter>
            <Bootstrap.Grid>
                <AppNavbar />

                <ReactRouter.Switch>
                    <ReactRouter.Route exact={true} path="/" component={Home} />
                    <ReactRouter.Route path="/sign-in" component={SignIn} />
                    <ReactRouter.Redirect to="/" />
                </ReactRouter.Switch>

            </Bootstrap.Grid>
        </ReactRouter.BrowserRouter>
    );
};

export default App;