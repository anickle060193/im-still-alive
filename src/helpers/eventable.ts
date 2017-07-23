export type Listener<T> = ( data: T ) => void;

export default class Eventable<T>
{
    private listeners: Listener<T>[] = [ ];

    on( listener: Listener<T> )
    {
        this.listeners.push( listener );
    }

    off( listener?: Listener<T> )
    {
        if( listener )
        {
            let index = this.listeners.indexOf( listener );
            if( index >= 0 )
            {
                this.listeners.splice( index, 1 );
            }
        }
        else
        {
            this.listeners = [ ];
        }
    }

    trigger( data: T )
    {
        for( let listener of this.listeners )
        {
            listener( data );
        }
    }
}