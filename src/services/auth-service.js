import { inject } from 'aurelia-framework';
import { BaseService } from './base-service';

const LOCALSTORAGE_ACCESSTOKEN = 'access_token';
const LOCALSTORAGE_REFRESHTOKEN = 'refresh_token';

@inject(BaseService)
export class AuthService
{
    constructor(baseService: BaseService)
    {
        this.baseService = baseService;
    }

    createHeadersWithAccessToken(): object
    {
        return {
            Authorization: 'Bearer ' + this.getAccessToken()
        };
    }

    getAccessToken(): string
    {
        return window.localStorage.getItem(LOCALSTORAGE_ACCESSTOKEN);
    }

    isLoggedIn(): boolean
    {
        return (this.getAccessToken() && true);
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

        return this.baseService.postFormDataIntoJSON(
            'oauth/token',
            fd
        ).then(response =>
        {
            window.localStorage.setItem(LOCALSTORAGE_ACCESSTOKEN, response.access_token);
            window.localStorage.setItem(LOCALSTORAGE_REFRESHTOKEN, response.refresh_token);
            return response;
        });
    }

    logout()
    {
        return this.baseService.deleteIntoJSON('oauth/token', this.createHeadersWithAccessToken()).then(response =>
        {
            window.localStorage.removeItem(LOCALSTORAGE_ACCESSTOKEN);
            window.localStorage.removeItem(LOCALSTORAGE_REFRESHTOKEN);
            return response;
        });
    }

    signup(sud: UserData)
    {
        return this.baseService.postIntoJSON('users', sud);
    }
}

export class UserData
{
    /* eslint-disable camelcase */
    username: string;
    email: string;
    password: string;

    first_name: string;
    last_name: string;

    sex: string;
    year_of_birth: number;

    postal_code: number;
    residence: string;

    job: string;
    highest_education: string;
    /* eslint-enable camelcase */
}
