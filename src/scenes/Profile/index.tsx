import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import * as Bootstrap from 'react-bootstrap';
import * as firebase from 'firebase';

import * as database from 'database';
import Loading from 'components/Loading';

interface ProfileRoutePropsMatch
{
    user_id: string;
}

type ProfileProps = ReactRouter.RouteComponentProps<ProfileRoutePropsMatch>;

interface ProfileState
{
    userProfile: database.UserProfile | null;
    loading: boolean;
}

export default class Profile extends React.Component<ProfileProps, ProfileState>
{
    private userProfileRef: firebase.database.Reference;

    constructor( props: ProfileProps )
    {
        super( props );

        this.userProfileRef = database.getUserProfileRef( this.props.match.params.user_id );

        this.state = {
            userProfile: null,
            loading: true
        };
    }

    componentWillMount()
    {
        this.userProfileRef.on( 'value', ( data ) =>
        {
            if( data )
            {
                this.setState( {
                    userProfile: data.val(),
                    loading: false
                } );
            }
        } );
    }

    componentWillUnmount()
    {
        this.userProfileRef.off();
    }

    render()
    {
        if( this.state.loading )
        {
            return <Loading />;
        }
        else if( !this.state.userProfile )
        {
            return (
                <ReactRouter.Redirect to="/" />
            );
        }
        else
        {
            return (
                <Bootstrap.Row>
                    <Bootstrap.Col xs={12}>
                        {
                            this.state.userProfile.displayName
                                ? <h1>{this.state.userProfile.displayName} <small>{this.state.userProfile.email}</small></h1>
                                : <h1>{this.state.userProfile.email}</h1>
                        }
                    </Bootstrap.Col>
                </Bootstrap.Row>
            );
        }
    }
}