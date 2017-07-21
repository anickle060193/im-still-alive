import * as React from 'react';
import * as Bootstrap from 'react-bootstrap';
import * as ReactRouter from 'react-router-dom';

const Welcome: React.SFC = ( props ) =>
{
    return (
        <Bootstrap.Row>
            <Bootstrap.Col xs={12} md={10} mdOffset={1} className="text-center">
                <Bootstrap.Jumbotron>
                    <h1>Welcome to I'm Still Alive!</h1>
                    <ReactRouter.Link to="/sign-in" className="btn btn-lg btn-primary">
                        Sign In
                    </ReactRouter.Link>
                </Bootstrap.Jumbotron>
            </Bootstrap.Col>
        </Bootstrap.Row>
    );
};

export default Welcome;