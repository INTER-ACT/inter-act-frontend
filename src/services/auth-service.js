import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { BaseService } from './base-service';

const LOCALSTORAGE_ACCESSTOKEN = 'access_token';
const LOCALSTORAGE_REFRESHTOKEN = 'refresh_token';
const LOCALSTORAGE_SELFUSERID = 'self_user_id';
const LOCALSTORAGE_SELFROLE = 'self_role';

export const ROLE_ADMIN = 'admin';
export const ROLE_EXPERT = 'expert';
export const ROLE_GUEST = 'guest';
export const ROLE_SCIENTIST = 'scientist';
export const ROLE_USER = 'standard_user';

@inject(BaseService)
export class AuthService
{
    onLogin = [];
    onLogout = [];

    constructor(baseService: BaseService, router: Router)
    {
        this.baseService = baseService;
        this.router = router;
        this.onLogin.push(() => this.fetchSelfID().then(() => this.fetchSelfRole()));
        this.onLogout.push(() => this.removeTokens());
        this.onLogout.push(() => this.removeUserInfo());
    }

    catchBadLogin(promise: Promise)
    {
        return promise.catch(error =>
        {
            if (error.status === 401 && this.isLoggedIn())
            {
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

    getSelfID(): number
    {
        return window.localStorage.getItem(LOCALSTORAGE_SELFUSERID);
    }

    getSelfRole(): string
    {
        let rslt = window.localStorage.getItem(LOCALSTORAGE_SELFROLE);
        return (rslt !== null) ? rslt : ROLE_GUEST;
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
        fd.append('client_secret', 'EoIIqXvu7ckyEjInMeoOZECo3Gs00gIAtF8Nn2bG');
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
            this.triggerOnLogout();
            return response;
        }));
    }

    fetchSelfID()
    {
        return this.baseService.getIntoJSON('self', null, this.createHeadersWithAccessToken()).then(self =>
        {
            window.localStorage.setItem(LOCALSTORAGE_SELFUSERID, self.id);
            return self.id;
        });
    }

    fetchSelfRole()
    {
        return this.baseService.getIntoJSON(this.getSelfURI() + '/details', null, this.createHeadersWithAccessToken()).then(d =>
        {
            window.localStorage.setItem(LOCALSTORAGE_SELFROLE, d.role);
            return d.role;
        });
    }

    getSelfURI(): string
    {
        return this.getUserURI(this.getSelfID());
    }

    getUserURI(userID: number): string
    {
        return 'users/' + userID;
    }

    removeTokens(): void
    {
        window.localStorage.removeItem(LOCALSTORAGE_ACCESSTOKEN);
        window.localStorage.removeItem(LOCALSTORAGE_REFRESHTOKEN);
    }

    removeUserInfo(): void
    {
        window.localStorage.removeItem(LOCALSTORAGE_SELFUSERID);
        window.localStorage.removeItem(LOCALSTORAGE_SELFROLE);
    }

    signup(sud: UserData)
    {
        return this.baseService.post('users', sud);
    }

    triggerOnLogin(): void
    {
        this.onLogin.forEach(callback => callback(this));
    }

    triggerOnLogout(): void
    {
        this.onLogout.forEach(callback => callback(this));
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
