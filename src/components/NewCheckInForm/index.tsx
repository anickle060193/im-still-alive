import * as React from 'react';
import * as Bootstrap from 'react-bootstrap';
import * as firebase from 'firebase';

import * as database from 'database';

interface NewCheckInFormProps
{
    onNewCheckIn?: () => void;
}

interface NewCheckInFormState
{
    message: string;
    messageError: string | null;
}

export default class NewCheckInForm extends React.Component<NewCheckInFormProps, NewCheckInFormState>
{
    constructor( props: NewCheckInFormProps )
    {
        super( props );

        this.state = {
            message: '',
            messageError: null
        };
    }

    render()
    {
        return (
            <form>
                <Bootstrap.FormGroup validationState={!this.state.messageError ? undefined : 'error'}>
                    <Bootstrap.FormControl componentClass="textarea" rows={5} placeholder="Message..." value={this.state.message} onChange={( e ) => this.onChange( e )} />
                    <Bootstrap.HelpBlock>{this.state.messageError}</Bootstrap.HelpBlock>
                </Bootstrap.FormGroup>
                <Bootstrap.Button type="button" bsStyle="primary" block={true} onClick={( e ) => this.onClick( e )}>
                    Save
                </Bootstrap.Button>
            </form>
        );
    }

    private onChange( e: React.FormEvent<React.Component<Bootstrap.FormControlProps, {}>> )
    {
        this.setState( { message: ( e.target as HTMLTextAreaElement ).value } );
    }

    private onClick( e: React.FormEvent<React.ClassicComponent<Bootstrap.ButtonProps, {}>> )
    {
        let user = firebase.auth().currentUser;
        if( user === null )
        {
            this.setState( { messageError: 'Must be signed in to Check In.' } );
            return;
        }

        let checkIn: database.CheckIn = {
            message: this.state.message,
            checkedInAt: firebase.database.ServerValue.TIMESTAMP as number
        };
        firebase.database().ref( '/user-check-ins/' + user.uid + '/check-ins' ).push( checkIn ).then(
            ( data: firebase.database.Reference ) =>
            {
                this.setState( { message: '', messageError: null } );
                if( this.props.onNewCheckIn )
                {
                    this.props.onNewCheckIn();
                }
            },
            ( error ) =>
            {
                this.setState( { messageError: error.message } );
            }
        );
    }
}