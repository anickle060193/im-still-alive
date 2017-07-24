import * as React from 'react';
import * as Bootstrap from 'react-bootstrap';
import * as BootstrapRouter from 'react-router-bootstrap';
import * as firebase from 'firebase';

import withUserProfile, { UserProfileComponent, UserProfileComponentProps, UserProfileWrapper } from 'components/UserProfileWrapper';
import ListRefEventable from 'helpers/listRefEventable';

type UserListProps = {
    usersRefPath: string;
    userComponent?: UserProfileComponent;
} & any; // tslint:disable-line

interface UserListState
{
    users: { [ userId: string ]: boolean };
}

export default class UserList extends React.Component<UserListProps, UserListState>
{
    private usersRef: firebase.database.Reference;
    private usersListener: ListRefEventable<boolean>;
    private userComponentWrapper: UserProfileWrapper;

    constructor( props: UserListProps )
    {
        super( props );

        this.state = { users: { } };

        this.usersRef = firebase.database().ref( this.props.usersRefPath );
        this.usersListener = new ListRefEventable( this.usersRef );

        this.userComponentWrapper = withUserProfile( this.props.userComponent ? this.props.userComponent : BasicUserProfile );
    }

    componentWillMount()
    {
        this.usersListener.on( ( users ) =>
        {
            this.setState( { users: users } );
        } );
    }

    componentWillUnmount()
    {
        this.usersRef.off();
    }

    render()
    {
        const { usersRefPath: _, userComponent: __, ...rest }: UserListProps = this.props;
        let UserComponent = this.userComponentWrapper;
        return (
            <Bootstrap.ListGroup>
                {
                    Object.keys( this.state.users ).map( ( userId ) =>
                    {
                        return <UserComponent {...rest} userId={userId} key={userId} />;
                    } )
                }
            </Bootstrap.ListGroup>
        );
    }
}

const BasicUserProfile: React.SFC<UserProfileComponentProps> = ( props ) =>
{
    if( props.loading )
    {
        return (
            <Bootstrap.ListGroupItem key={props.userId}>
                Loading user...
            </Bootstrap.ListGroupItem>
        );
    }
    else if( !props.userProfile )
    {
        return (
            <Bootstrap.ListGroupItem key={props.userId}>
                Failed to load user: {props.userId}
            </Bootstrap.ListGroupItem>
        );
    }
    else
    {
        return (
            <BootstrapRouter.LinkContainer key={props.userId} to={`/user/${props.userId}`} activeClassName="">
                <Bootstrap.ListGroupItem>
                    {props.userProfile.displayName ? props.userProfile.displayName : props.userProfile.email}
                </Bootstrap.ListGroupItem>
            </BootstrapRouter.LinkContainer>
        );
    }
};