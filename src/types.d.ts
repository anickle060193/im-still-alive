import * as Bootstrap from 'react-bootstrap';

declare global
{
    type BootstrapInputChangeEvent = React.FormEvent<React.Component<Bootstrap.FormControlProps, {}> | HTMLInputElement>;
    type BootstrapTextAreaInputChangeEvent = React.FormEvent<React.Component<Bootstrap.FormControlProps, {}> | HTMLTextAreaElement>;
    type FormSubmitEvent = React.FormEvent<HTMLFormElement>;
}