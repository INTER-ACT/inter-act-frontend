import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { UserService } from '../services/user-service';
import { FormLocker } from '../utils/form-locker';

@inject(UserService, Router, FormLocker)
export class Settings
{
    pwChangeData: object = {
        old: '',
        new_: ''
    };

    emailChangeData: object = {
        email: ''
    };

    constructor(userService: UserService, router: Router, formLocker: FormLocker)
    {
        this.userService = userService;
        this.router = router;
        this.formLocker = formLocker;

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
        this.formLocker.lockForm(this.pwForm);

        if (this.pwChangeData.new_ !== this.pwChangeData.confirm_)
        {
            alert('Fehler: Passwörter ungleich!');
            this.formLocker.unlockForm(this.pwForm);
            return;
        }

        this.userService.changePassword(this.pwChangeData.old, this.pwChangeData.new_).then(() =>
        {
            alert('Passwort erfolgreich geändert.');
            this.formLocker.unlockForm(this.pwForm);
            this.pwForm.reset();
        }, error =>
        {
            error.json().then(ej =>
            {
                if (ej.code == 3) // eslint-disable-line eqeqeq
                {
                    alert('Fehler:\nDas angegebene alte Passwort ist falsch.');
                }
                else
                {
                    alert('Unbekannter Fehler: ' + ej.message);
                }

                this.formLocker.unlockForm(this.pwForm);
            });
        });
    }

    submitChangeEmail()
    {
        this.formLocker.lockForm(this.emailForm);
        this.userService.changeEmail(this.emailChangeData.email).then(() =>
        {
            alert('E-Mail-Adresse erfolgreich geändert.');
            this.formLocker.unlockForm(this.emailForm);
        }).catch(() =>
        {
            alert('Fehlgeschlagen.');
            this.formLocker.unlockForm(this.emailForm);
        });
    }

    gotoDownloadPrivacy()
    {
        this.router.navigateToRoute('privacy');
    }
}
