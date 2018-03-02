import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AuthService } from '../../services/auth-service';

@inject(Router, AuthService)
export class Login
{
    email = '';
    password = '';

    alerts = [];

    showBadCredentialsMessage = false;

    constructor(router: Router, authService: AuthService)
    {
        this.router = router;
        this.authService = authService;

        if (this.authService.isLoggedIn())
        {
            this.router.navigate('');
        }
    }

    submitLogin()
    {
        this.authService.login(this.email, this.password).then(x =>
        {
            this.router.navigate('dashboard');
        }).catch(error =>
        {
            if (error.status === 401)
            {
                // bad credentials
                this.alerts.push('Die eingegebenen Zugangsdaten waren falsch. Bitte überprüfe deine Eingaben!');
            }
        });
    }
}
