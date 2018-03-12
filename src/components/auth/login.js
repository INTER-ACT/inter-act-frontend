import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AuthService } from '../../services/auth-service';
import { FormLocker } from '../../utils/form-locker';

@inject(Router, AuthService, FormLocker)
export class Login
{
    email = '';
    password = '';

    alerts = [];

    showBadCredentialsMessage = false;

    constructor(router: Router, authService: AuthService, formLocker: FormLocker)
    {
        this.router = router;
        this.authService = authService;
        this.formLocker = formLocker;

        if (this.authService.isLoggedIn())
        {
            this.router.navigate('');
        }
    }

    submitLogin()
    {
        this.formLocker.lockForm(this.loginForm);

        this.authService.login(this.email, this.password).then(x =>
        {
            this.router.navigate('dashboard');
            this.formLocker.unlockForm(this.loginForm);
        }).catch(error =>
        {
            if (error.status === 401)
            {
                // bad credentials
                this.alerts.push('Die eingegebenen Zugangsdaten waren falsch. Bitte überprüfe deine Eingaben!');
            }
            else
            {
                this.alerts.push('Unbekannter Fehler: ' + error.status + ' ' + error.statusText);
                console.log(error); // eslint-disable-line no-console
            }

            this.formLocker.unlockForm(this.loginForm);
        });
    }
}
