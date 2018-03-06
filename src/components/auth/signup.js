import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AuthService, UserData } from '../../services/auth-service';

@inject(Router, AuthService)
export class Signup
{
    signupData = new UserData();

    constructor(router: Router, authService: AuthService)
    {
        this.router = router;
        this.authService = authService;
    }

    submitSignup()
    {
        // verify pw
        if (this.pwInput.value !== this.pwInputConfirm.value)
        {
            // ERROR
        }
        console.log(this.signupData);
    }
}
