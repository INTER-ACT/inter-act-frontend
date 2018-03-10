import { inject } from 'aurelia-framework';
import { UserService } from '../services/user-service';

@inject(UserService)
export class Settings
{
    pwChangeData: object = {
        old: '',
        new_: ''
    };

    emailChangeData: object = {
        email: ''
    };

    constructor(userService: UserService)
    {
        this.userService = userService;
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

    submitDownloadPrivacy()
    {
        alert('No appropriate API call found.');
    }
}
