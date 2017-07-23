import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import * as Bootstrap from 'react-bootstrap';
import * as firebase from 'firebase';

import * as database from 'database';
import Loading from 'components/Loading';
import NewFollower from 'components/NewFollower';
import UserList from 'components/UserList';
import { UserProfileComponentProps } from 'components/UserProfileWrapper';

interface ProfileRoutePropsMatch
{
    userId: string;
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

        this.userProfileRef = database.getUserProfileRef( this.props.match.params.userId );

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
                <Bootstrap.Grid>
                    {
                        this.state.userProfile.displayName
                            ? <h1>{this.state.userProfile.displayName} <small>{this.state.userProfile.email}</small></h1>
                            : <h1>{this.state.userProfile.email}</h1>
                    }

                    <Bootstrap.Row>
                        <Bootstrap.Col xs={12} md={4}>
                            <h3>New Follower</h3>
                            <NewFollower/>
                        </Bootstrap.Col>
                    </Bootstrap.Row>

                    <Bootstrap.Row>
                        <Bootstrap.Col xs={12} md={4}>
                            <h3>Followers</h3>
                            <UserList usersRefPath={`followers/${this.props.match.params.userId}/`} userComponent={Follower} followeeId={this.props.match.params.userId} />
                        </Bootstrap.Col>
                    </Bootstrap.Row>

                </Bootstrap.Grid>
            );
        }
    }
}

const Follower: React.SFC<UserProfileComponentProps & { followeeId: string }> = ( props ) =>
{
    if( props.loading )
    {
        return (
            <Bootstrap.ListGroupItem key={props.userId}>
                Loading follower...
            </Bootstrap.ListGroupItem>
        );
    }
    else if( !props.userProfile )
    {
        return (
            <Bootstrap.ListGroupItem key={props.userId}>
                Failed to load follower: {props.userId}
            </Bootstrap.ListGroupItem>
        );
    }
    else
    {
        let currentUser = firebase.auth().currentUser;
        let removeFollowerButton = null;
        if( currentUser && currentUser.uid === props.followeeId )
        {
            removeFollowerButton = (
                <Bootstrap.Button className="pull-right" bsSize="xs" title="Remove Follower" bsStyle="danger">
                    <Bootstrap.Glyphicon glyph="remove" />
                </Bootstrap.Button>
            );
        }

        return (
            <Bootstrap.ListGroupItem key={props.userId}>
                <ReactRouter.Link to={`/user/${props.userId}`}>
                    {props.userProfile.displayName ? props.userProfile.displayName : props.userProfile.email}
                </ReactRouter.Link>
                {removeFollowerButton}
            </Bootstrap.ListGroupItem>
        );
    }
};