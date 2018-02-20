import { inject } from 'aurelia-framework';
import { BaseService } from './base-service';

@inject(BaseService)
export class AuthService
{
    constructor(bsSrvc: BaseService)
    {
        this.bsSrvc = bsSrvc;
    }

    login(email: string, password: string)
    {
        let fd = new FormData();
        fd.append('grant_type', 'password');
        fd.append('client_id', 1);
        fd.append('client_secret', '9mCwDpMOVoFJNwzuHwFJAg0Jh2WYIrW3pMMSdoDc');
        fd.append('username', email);
        fd.append('password', password);
        fd.append('scope', '*');

        this.bsSrvc.postFormDataIntoJSON(
            'oauth/token',
            fd
        ).then(response =>
        {
            console.log(response);
        });
    }

    logout()
    {
        this.bsSrvc.delete('oauth/token');
    }
}
