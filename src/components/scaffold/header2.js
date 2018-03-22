import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AuthService } from '../../services/auth-service';
import { UserService } from '../../services/user-service';

@inject(Router, AuthService, UserService)
export class Header2
{
    isLoggedIn = false;
    isScientist = false;
    isExpert = false;
    isAdmin = false;
    searchTerm = '';

    constructor(router: Router, authService: AuthService, userService: UserService)
    {
        this.authService = authService;
        this.router = router;
        this.userService = userService;

        this.updateLoginStateData();

        this.authService.onLogin.push(() => this.updateLogin());
        this.authService.onLogout.push(() => this.updateLogout());
    }

    attached()
    {
        $(this).foundation();
    }

    gotoLogin()
    {
        this.router.navigate('/auth/login');
    }

    gotoSignup()
    {
        this.router.navigate('/auth/signup');
    }

    submitLogout()
    {
        this.authService.logout();
    }

    updateLoginStateData()
    {
        this.isLoggedIn = this.authService.isLoggedIn();
        this.isAdmin = this.userService.isSelfAdmin();
        this.isScientist = this.userService.isSelfScientist();
        this.isExpert = this.userService.isSelfExpert();
    }

    updateLogin()
    {
        this.updateLoginStateData();
    }

    updateLogout()
    {
        this.updateLoginStateData();

        // probably not really a good idea, but...
        window.location.href = '/';
    }

    submitSearch()
    {
        this.router.navigateToRoute('search', { term: this.searchTerm });
    }
}
