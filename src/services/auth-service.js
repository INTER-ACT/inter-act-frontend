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
        this.bsSrvc.get('');
        this.bsSrvc.postIntoJSON(
            'token',
            {
                form_params:
                {
                    grant_type: 'password',
                    client_id: '?',
                    client_secret: '?',
                    email: email,
                    password: password,
                    scope: '*'
                }
            }
        ).then(response =>
        {
            console.log(response);
        });
    }

    logout()
    {
        this.bsSrvc.delete('/token');
    }
}
