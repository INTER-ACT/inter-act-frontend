import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AuthService, UserData } from '../../services/auth-service';

@inject(Router, AuthService)
export class Signup
{
    signupData: UserData;

    constructor(router: Router, authService: AuthService)
    {
        this.router = router;
        this.authService = authService;
        this.signupData = new UserData();
        this.signupData.sex = 'f';
    }

    attached()
    {
        // Load reCAPTCHA
        let captcha = document.createElement('script');
        captcha.src = 'https://www.google.com/recaptcha/api.js?onload=captchaCallback&render=explicit';
        captcha.async = true;
        captcha.defer = true;
        document.body.appendChild(captcha);

        window.captchaCallback = function()
        {
            grecaptcha.render(
                'g-recaptcha',
                {
                    'sitekey': '6Lfu3EcUAAAAAJ0NpEKbJpr722J4FxbdzfXEsBNb'
                }
            );
        };
    }

    submitSignup()
    {
        // verify pw
        if (this.pwInput.value !== this.pwInputConfirm.value)
        {
            alert('Fehler:\nPasswörter ungleich.');
            return;
        }

        this.authService.signup(this.signupData)
            .then(r =>
            {
                alert('Erfolgreich registriert.\nSie sollten nun ein Bestätigungs-E-Mail erhalten haben.\nNach dem Bestätigen Ihrer E-Mail-Adresse können Sie sich einloggen.');
                this.router.navigate('/auth/login');
            })
            .catch(error =>
            {
                if (error.status >= 400 && error.status <= 499)
                {
                    alert('Fehler:\nDie eingegebenen Infos waren ungültig.');
                }
                else
                {
                    alert('Unbekannter Fehler.');
                    console.log(error);
                    error.json().then(console.log);
                }
            });
    }
}
