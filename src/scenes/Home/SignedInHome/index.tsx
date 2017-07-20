import * as React from 'react';
import * as Bootstrap from 'react-bootstrap';

import NewCheckInForm from 'components/NewCheckInForm';

export default class SignedInHome extends React.Component<{}, {}>
{
    render()
    {
        return (
            <Bootstrap.Col xs={12} md={4}>
                <NewCheckInForm />
            </Bootstrap.Col>
        );
    }
}