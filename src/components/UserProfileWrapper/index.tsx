import * as React from 'react';
import * as firebase from 'firebase';

import * as database from 'database';

export interface UserProfileComponentProps
{
    userId: string;
    userProfile: database.UserProfile | null;
    loading: boolean;
}

export type UserProfileComponent = React.ComponentType<UserProfileComponentProps & { }>;

interface UserProfileWrapperProps
{
    userId: string;
}

interface UserProfileWrapperState
{
    userProfile: database.UserProfile | null;
    loading: boolean;
}

export default function withUserProfile( WrappedComponent: UserProfileComponent )
{
    return class UserProfileWrapper extends React.Component<UserProfileWrapperProps, UserProfileWrapperState>
    {
        private userRef: firebase.database.Reference;

        constructor( props: UserProfileWrapperProps )
        {
            super( props );

            this.state = {
                userProfile: null,
                loading: true
            };

            this.userRef = firebase.database().ref( `users/${this.props.userId}` );
        }

        componentWillMount()
        {
            this.userRef.on( 'value', ( data ) =>
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
            this.userRef.off();
        }

        render()
        {
            const { userId, ...rest } = this.props;
            return <WrappedComponent {...rest} userId={userId} userProfile={this.state.userProfile} loading={this.state.loading} />;
        }
    };
}