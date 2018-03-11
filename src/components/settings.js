import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { UserService } from '../services/user-service';

@inject(UserService, Router)
export class Settings
{
    pwChangeData: object = {
        old: '',
        new_: ''
    };

    emailChangeData: object = {
        email: ''
    };

    constructor(userService: UserService, router: Router)
    {
        this.userService = userService;
        this.router = router;
    }

    submitChangePassword()
    {
        this.userService.changePassword(this.pwChangeData.old, this.pwChangeData.new).then(() =>
        {
            alert('Passwort erfolgreich geändert.');
            this.pwForm.reset();
        }).catch(() => alert('Fehlgeschlagen.'));
    }

    submitChangeEmail()
    {
        this.userService.changeEmail(this.emailChangeData.email).then(() =>
        {
            alert('E-Mail-Adresse erfolgreich geändert.');
        }).catch(() => alert('Fehlgeschlagen.'));
    }

    gotoDownloadPrivacy()
    {
        this.router.navigateToRoute('privacy');
    }
}
