import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as firebase from 'firebase';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

( firebase as any ).initializeApp( { // tslint:disable-line
    apiKey: 'AIzaSyDtrYo8056t2Sad8Oxa0suXW0yOUlu7BYA',
    authDomain: 'im-still-alive-c149c.firebaseapp.com',
    databaseURL: 'https://im-still-alive-c149c.firebaseio.com',
    projectId: 'im-still-alive-c149c',
    storageBucket: '',
    messagingSenderId: '566432330278'
} );

ReactDOM.render(
    <App />,
    document.getElementById( 'root' ) as HTMLElement
);

registerServiceWorker();
