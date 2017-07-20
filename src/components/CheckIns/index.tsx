import * as React from 'react';
import * as Bootstrap from 'react-bootstrap';
import * as firebase from 'firebase';

import * as database from 'database';

interface CheckInsState
{
    checkIns: { [ key: string ]: database.CheckIn };
}

export default class CheckIns extends React.Component<{}, CheckInsState>
{
    private checkInsRef: firebase.database.Reference | null;

    constructor( props: {} )
    {
        super( props );

        this.state = {
            checkIns: { }
        };

        this.checkInsRef = null;
    }

    componentWillMount()
    {
        let user = firebase.auth().currentUser;
        if( !user )
        {
            throw 'User must be signed-in to view CheckIns';
        }

        this.checkInsRef = firebase.database().ref( `/user-check-ins/${user.uid}/check-ins/` );

        this.checkInsRef.on( 'child_added', ( data ) =>
        {
            if( data && data.key )
            {
                console.log( 'child_added', data.val() );
                this.setState( ( prevState: CheckInsState ) =>
                {
                    prevState.checkIns[ data.key as string ] = data.val() as database.CheckIn;
                    return { checkIns: prevState.checkIns };
                } );
            }
        } );

        this.checkInsRef.on( 'child_changed', ( data ) =>
        {
            if( data && data.key )
            {
                this.setState( ( prevState: CheckInsState ) =>
                {
                    prevState.checkIns[ data.key as string ] = data.val() as database.CheckIn;
                    return { checkIns: prevState.checkIns };
                } );
            }
        } );

        this.checkInsRef.on( 'child_removed', ( data ) =>
        {
            if( data && data.key )
            {
                this.setState( ( prevState: CheckInsState ) =>
                {
                    delete prevState.checkIns[ data.key as string ];
                    return { checkIns: prevState.checkIns };
                } );
            }
        } );
    }

    render()
    {
        return (
            <Bootstrap.ListGroup>
                {
                    Object.keys( this.state.checkIns ).map( ( key ) =>
                        <Bootstrap.ListGroupItem key={key}>
                            {this.state.checkIns[ key ].message} - {new Date( this.state.checkIns[ key ].checkedInAt ).toLocaleString()}
                        </Bootstrap.ListGroupItem>
                    ).reverse()
                }
            </Bootstrap.ListGroup>
        );
    }

    componentWillUnmount()
    {
        if( this.checkInsRef )
        {
            this.checkInsRef.off();
            this.checkInsRef = null;
        }
    }
}