import * as firebase from 'firebase';
import Eventable, { Listener } from 'helpers/eventable';

type ListData<T> = { [ key: string ]: T };

export default class ListRefEventable<T> extends Eventable<ListData<T>>
{
    private listRef: firebase.database.Reference;
    private listData: ListData<T>;
    private attached: boolean;

    constructor( listRef: firebase.database.Reference )
    {
        super();

        this.listRef = listRef;
        this.listData = { };
        this.attached = false;
    }

    on( listener: Listener<ListData<T>> )
    {
        super.on( listener );

        if( !this.attached )
        {
            this.attached = true;

            this.listRef.on( 'child_added', ( data ) => this.onChildAddedChanged( data ) );
            this.listRef.on( 'child_changed', ( data ) => this.onChildAddedChanged( data ) );
            this.listRef.on( 'child_removed', ( data ) => this.onChildRemoved( data ) );
        }
    }

    off( listener?: Listener<ListData<T>> )
    {
        super.off( listener );

        if( this.attached )
        {
            this.attached = false;

            this.listRef.off();
        }
    }

    private onChildAddedChanged( data: firebase.database.DataSnapshot | null )
    {
        if( data )
        {
            let key = data.key as string;
            let value = data.val() as T;
            this.listData[ key ] = value;
            this.trigger( this.listData );
        }
    }

    private onChildRemoved( data: firebase.database.DataSnapshot | null )
    {
        if( data )
        {
            let key = data.key as string;
            delete this.listData[ key ];
            this.trigger( this.listData );
        }
    }
}