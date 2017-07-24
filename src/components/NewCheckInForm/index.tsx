import * as React from 'react';
import * as Bootstrap from 'react-bootstrap';
import * as firebase from 'firebase';

import * as database from 'helpers/database';

import './styles.css';

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
            <form className="new-check-in-form">
                <Bootstrap.FormGroup validationState={!this.state.messageError ? undefined : 'error'}>
                    <Bootstrap.FormControl componentClass="textarea" rows={5} placeholder="Message..." value={this.state.message} onChange={( e ) => this.onChange( e )} />
                    <Bootstrap.HelpBlock>{this.state.messageError}</Bootstrap.HelpBlock>
                </Bootstrap.FormGroup>
                <Bootstrap.Button type="button" bsStyle="primary" block={true} onClick={( e ) => this.onClick()}>
                    Save
                </Bootstrap.Button>
            </form>
        );
    }

    private onChange( e: BootstrapTextAreaInputChangeEvent )
    {
        this.setState( { message: ( e.currentTarget as HTMLTextAreaElement ).value } );
    }

    private onClick()
    {
        let user = firebase.auth().currentUser;
        if( user === null )
        {
            this.setState( { messageError: 'Must be signed in to Check In.' } );
            return;
        }

        database.addUserCheckIn( user, this.state.message ).then(
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