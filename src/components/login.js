import { inject } from 'aurelia-framework';
import { AuthService } from '../services/auth-service';

@inject(AuthService)
export class Login
{
    constructor(authService: AuthService)
    {
        this.email = '';
        this.password = '';

        this.authService = authService;
    }

    submitLogin()
    {
        this.authService.login(this.email, this.password);
    }
}
