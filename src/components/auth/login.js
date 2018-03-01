import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AuthService } from '../../services/auth-service';

@inject(Router, AuthService)
export class Login
{
    constructor(router: Router, authService: AuthService)
    {
        this.email = '';
        this.password = '';

        this.authService = authService;

        if (this.authService.isLoggedIn())
        {
            router.navigate('');
        }
    }

    submitLogin()
    {
        this.authService.login(this.email, this.password);
    }
}
