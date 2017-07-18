import * as React from 'react';
import * as Bootstrap from 'react-bootstrap';
import * as ReactRouter from 'react-router-dom';

import AppNavbar from './components/AppNavbar';

const App: React.SFC<{}> = ( props ) =>
{
    return (
        <ReactRouter.BrowserRouter>
            <Bootstrap.Grid>
                <AppNavbar />

                <ReactRouter.Switch>
                    <ReactRouter.Route exact={true} path="/" component={() => <div/>} />
                    <ReactRouter.Redirect to="/" />
                </ReactRouter.Switch>
            </Bootstrap.Grid>
        </ReactRouter.BrowserRouter>
    );
};

export default App;