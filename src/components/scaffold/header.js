import { inject } from 'aurelia-framework';
import { AuthService } from '../../services/auth-service';

@inject(AuthService)
export class Header
{
    constructor(authService: AuthService)
    {
        this.authService = authService;
    }

    attached()
    {
        $(this).foundation();
    }

    submitLogout()
    {
        this.authService.logout().catch(error => {
            alert('Logout failed. Check console.');
            console.log(error);
        });
    }
}
