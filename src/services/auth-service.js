import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { BaseService } from './base-service';

const LOCALSTORAGE_ACCESSTOKEN = 'access_token';
const LOCALSTORAGE_REFRESHTOKEN = 'refresh_token';

@inject(BaseService)
export class AuthService
{
    onLogin = [];
    onLogout = [];

    constructor(baseService: BaseService, router: Router)
    {
        this.baseService = baseService;
        this.router = router;
    }

    catchBadLogin(promise: Promise)
    {
        return promise.catch(error =>
        {
            if (error.status === 401 && this.isLoggedIn())
            {
                this.removeTokens();
                this.triggerOnLogout();
            }
            else
            {
                throw error;
            }
        });
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
            this.triggerOnLogin();
            return response;
        });
    }

    logout()
    {
        return this.catchBadLogin(this.baseService.delete('oauth/token', this.createHeadersWithAccessToken()).then(response =>
        {
            this.removeTokens();
            this.triggerOnLogout();
            return response;
        }));
    }

    removeTokens()
    {
        window.localStorage.removeItem(LOCALSTORAGE_ACCESSTOKEN);
        window.localStorage.removeItem(LOCALSTORAGE_REFRESHTOKEN);
    }


    triggerOnLogin()
    {
        this.onLogin.forEach(callback => callback(this));
    }

    triggerOnLogout()
    {
        this.onLogout.forEach(callback => callback(this));
    }
}