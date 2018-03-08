import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AuthService } from '../../services/auth-service';

@inject(Router, AuthService)
export class Header
{
    isLoggedIn = false;
    isScientist = false;
    isAdmin = false;

    constructor(router: Router, authService: AuthService)
    {
        this.authService = authService;
        this.router = router;

        this.isLoggedIn = this.authService.isLoggedIn();

        this.authService.onLogin.push(() => this.updateLogin());
        this.authService.onLogout.push(() => this.updateLogout());
    }

    attached()
    {
        $(this).foundation();
    }

    gotoLogin()
    {
        this.router.navigateToRoute('auth');
    }

    gotoSignup()
    {
        this.router.navigate('auth/signup');
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
