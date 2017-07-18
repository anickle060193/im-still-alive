declare module 'firebaseui';

interface AuthUi
{
    start: ( id: string, config: any ) => void; // tslint:disable-line
    reset: () => void;
}