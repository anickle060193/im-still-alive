import * as firebase from 'firebase';

export interface CheckIn
{
    checkedInAt: number;
    message?: string | null;
}

export interface UserProfile
{
    email: string | null;
    displayName: string | null;
}

function getUserRef( uid: string )
{
    return firebase.database().ref( `/users/${uid}` );
}

export function getUserProfileRef( uid: string )
{
    return getUserRef( uid ).child( 'profile' );
}

export function saveUserProfile( user: firebase.User )
{
    let userProfile: UserProfile = {
        email: user.email,
        displayName: user.displayName
    };
    return getUserProfileRef( user.uid ).set( userProfile );
}

export function getUserCheckIns( uid: string )
{
    return getUserRef( uid ).child( 'check-ins' );
}

export function addUserCheckIn( user: firebase.User, message?: string | null )
{
    let checkIns = getUserCheckIns( user.uid );
    let checkIn: CheckIn = {
        message: message,
        checkedInAt: firebase.database.ServerValue.TIMESTAMP as number
    };
    return checkIns.push( checkIn );
}