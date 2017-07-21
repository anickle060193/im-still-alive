import * as firebase from 'firebase';

export interface CheckIn
{
    checkedInAt: number;
    message?: string | null;
}

export function userCheckIns( user: firebase.User )
{
    return firebase.database().ref( `users/${user.uid}/check-ins` );
}

export function createCheckIn( user: firebase.User, message?: string | null )
{
    let checkIns = userCheckIns( user );
    let checkIn: CheckIn = {
        message: message,
        checkedInAt: firebase.database.ServerValue.TIMESTAMP as number
    };
    return checkIns.push( checkIn );
}