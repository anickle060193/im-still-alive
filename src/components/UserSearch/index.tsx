import * as React from 'react';
import * as Bootstrap from 'react-bootstrap';
import * as BootstrapRouter from 'react-router-bootstrap';
import * as firebase from 'firebase';

import * as database from 'database';

interface UserSearchProps
{
    placeholder?: string;
    userRender?: ( userId: string, user: database.UserProfile ) => JSX.Element | null | false;
}

interface UserSearchState
{
    userSearch: string;
    users: { [ userId: string ]: database.UserProfile };
}

export default class UserSearch extends React.Component<UserSearchProps, UserSearchState>
{
    constructor( props: UserSearchProps )
    {
        super( props );

        this.state = { userSearch: '', users: { } };
    }

    render()
    {
        let userListGroup = null;
        if( this.state.users )
        {
            userListGroup = (
                <Bootstrap.ListGroup>
                    {
                        Object.keys( this.state.users ).map( ( userId ) =>
                        {
                            if( this.props.userRender )
                            {
                                return this.props.userRender( userId, this.state.users[ userId ] );
                            }
                            else
                            {
                                return (
                                    <BootstrapRouter.IndexLinkContainer key={userId} to={`/user/${userId}`} activeClassName="">
                                        <Bootstrap.ListGroupItem>
                                            {this.state.users[ userId ].email}
                                        </Bootstrap.ListGroupItem>
                                    </BootstrapRouter.IndexLinkContainer>
                                );
                            }
                        } )
                    }
                </Bootstrap.ListGroup>
            );
        }

        return (
            <div>
                <form onSubmit={( e ) => this.onSubmit( e )}>
                    <Bootstrap.FormGroup>
                        <Bootstrap.InputGroup>
                            <Bootstrap.FormControl componentClass="input" type="search" placeholder={this.props.placeholder} defaultValue={this.state.userSearch} onChange={( e ) => this.onChange( e )} />
                            <Bootstrap.InputGroup.Button>
                                <Bootstrap.Button type="submit"><Bootstrap.Glyphicon glyph="search" /></Bootstrap.Button>
                            </Bootstrap.InputGroup.Button>
                        </Bootstrap.InputGroup>
                    </Bootstrap.FormGroup>
                </form>
                {userListGroup}
            </div>
        );
    }

    private onChange( e: BootstrapInputChangeEvent )
    {
        this.setState( { userSearch: ( e.currentTarget as HTMLInputElement ).value } );
    }

    private onSubmit( e: FormSubmitEvent )
    {
        e.preventDefault();

        let query = firebase.database().ref( 'users' ).orderByChild( 'email' ).equalTo( this.state.userSearch );
        query.once( 'value', ( data ) =>
        {
            if( data )
            {
                this.setState( { users: data.val() } );
            }
        } );
    }
}