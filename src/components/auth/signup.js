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
                alert('DONE');
                this.router.navigate('/auth/login');
            })
            .catch(error =>
            {
                alert('Error');
                console.log(error);
                error.json().then(console.log);
            });
    }
}
