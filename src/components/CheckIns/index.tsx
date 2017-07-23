import * as React from 'react';
import * as Bootstrap from 'react-bootstrap';
import * as firebase from 'firebase';

import * as database from 'database';
import ListRefEventable from 'helpers/listRefEventable';

interface CheckInsState
{
    checkIns: { [ key: string ]: database.CheckIn };
}

export default class CheckIns extends React.Component<{}, CheckInsState>
{
    private checkInsListener: ListRefEventable<database.CheckIn>;

    constructor( props: {} )
    {
        super( props );

        this.state = {
            checkIns: { }
        };

        let user = firebase.auth().currentUser;
        if( !user )
        {
            throw 'User must be signed-in to view CheckIns';
        }

        let checkInsRef = database.getUserCheckIns( user.uid );
        this.checkInsListener = new ListRefEventable( checkInsRef );
    }

    componentWillMount()
    {
        this.checkInsListener.on( ( checkIns ) =>
        {
            this.setState( { checkIns: checkIns } );
        } );
    }

    componentWillUnmount()
    {
        this.checkInsListener.off();
    }

    render()
    {
        return (
            <Bootstrap.ListGroup>
                {
                    Object.keys( this.state.checkIns ).map( ( key ) =>
                    {
                        let checkIn = this.state.checkIns[ key ];
                        return (
                            <Bootstrap.ListGroupItem key={key}>
                                {
                                    !checkIn.message
                                        ? null
                                        : <p style={{whiteSpace: 'pre-line'}}>{checkIn.message}</p>
                                }
                                <small>{new Date( checkIn.checkedInAt ).toLocaleString()}</small>
                            </Bootstrap.ListGroupItem>
                        );
                    } ).reverse()
                }
            </Bootstrap.ListGroup>
        );
    }
}