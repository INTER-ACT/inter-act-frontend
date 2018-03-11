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
        this.insertEmail();
    }

    insertEmail()
    {
        this.userService.getSelfDetails().then(details =>
        {
            if (this.emailChangeData.email === '')
            {
                // don't replace user input
                this.emailChangeData.email = details.email;
            }
        });
    }

    submitChangePassword()
    {
        if (this.pwChangeData.new_ !== this.pwChangeData.confirm_)
        {
            alert('Fehler: Passwörter ungleich!');
            return;
        }

        this.userService.changePassword(this.pwChangeData.old, this.pwChangeData.new_).then(() =>
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
