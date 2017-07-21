import * as React from 'react';
import * as Bootstrap from 'react-bootstrap';

import NewCheckInForm from 'components/NewCheckInForm';
import CheckIns from 'components/CheckIns';

export default class Home extends React.Component<{}, {}>
{
    render()
    {
        return (
            <Bootstrap.Row>
                <Bootstrap.Col xs={12} md={4}>
                    <h2>New Check In</h2>
                    <NewCheckInForm />
                </Bootstrap.Col>
                <Bootstrap.Col xs={12} md={4}>
                    <h2>Your Check Ins</h2>
                    <CheckIns />
                </Bootstrap.Col>
            </Bootstrap.Row>
        );
    }
}