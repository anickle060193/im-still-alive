import * as React from 'react';
import * as ReactRouter from 'react-router-dom';
import * as Bootstrap from 'react-bootstrap';
import * as firebase from 'firebase';

import * as database from 'database';
import UserSearch from 'components/UserSearch';

export default class NewFollower extends React.Component<{}, {}>
{
    render()
    {
        return (
            <UserSearch placeholder="Search for new follower" userRender={( userId, user ) => this.userRender( userId, user )} />
        );
    }

    private userRender( userId: string, user: database.UserProfile )
    {
        return (
            <Bootstrap.ListGroupItem key={userId}>
                <ReactRouter.Link to={`/user/${userId}`}>
                    {user.email}
                </ReactRouter.Link>
                <Bootstrap.Button className="pull-right" bsSize="xs" title="Add as Follower" bsStyle="success" onClick={() => this.addFollower( userId )}>
                    <Bootstrap.Glyphicon glyph="plus" />
                </Bootstrap.Button>
            </Bootstrap.ListGroupItem>
        );
    }

    private addFollower( followerId: string )
    {
        let currentUser = firebase.auth().currentUser;
        if( currentUser )
        {
            database.addFollower( currentUser.uid, followerId );
        }
    }
}