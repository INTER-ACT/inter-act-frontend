import { inject } from 'aurelia-framework';
import { AuthService } from '../../services/auth-service';

@inject(AuthService)
export class Header
{
    isLoggedIn = false;

    constructor(authService: AuthService)
    {
        this.authService = authService;

        this.isLoggedIn = this.authService.isLoggedIn();

        this.authService.onLogin.push(() => this.updateLogin());
        this.authService.onLogout.push(() => this.updateLogout());
    }

    attached()
    {
        $(this).foundation();
    }

    submitLogout()
    {
        this.authService.logout();
    }

    updateLogin()
    {
        this.isLoggedIn = true;
    }

    updateLogout()
    {
        this.isLoggedIn = false;
    }
}
