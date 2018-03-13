import { bindable, inject } from 'aurelia-framework';
import { ROLE_ADMIN, ROLE_EXPERT, ROLE_SCIENTIST, ROLE_USER } from '../../services/auth-service';
import { UserService } from '../../services/user-service';
import { FormLocker } from '../../utils/form-locker';

@inject(UserService, FormLocker)
export class ElevateUser
{
    @bindable userId;

    roles: Array = [
        {
            val: ROLE_ADMIN,
            name: 'Administrator'
        },
        {
            val: ROLE_EXPERT,
            name: 'Experte'
        },
        {
            val: ROLE_SCIENTIST,
            name: 'Sozialwissenschaftler'
        },
        {
            val: ROLE_USER,
            name: 'Benutzer'
        }
    ];

    user: object = {
        id: -1,
        username: 'nobody',
        role: ROLE_USER,
        init_role: ROLE_USER
    };

    isReady: boolean = false;
    success: boolean = false;

    constructor(userService: UserService, formLocker: FormLocker)
    {
        this.userService = userService;
        this.formLocker = formLocker;
    }

    attached()
    {
        this.updateViaAPI().then(() =>
        {
            this.isReady = true;
        });
    }

    updateViaAPI()
    {
        return this.userService.getUserInfoByID(this.userId).then(info =>
        {
            this.user = info;
            this.user.init_role = info.role;
        });
    }

    elevateCancel()
    {
        this.user.role = this.user.init_role;
        this.success = false;
    }

    elevateSubmit()
    {
        this.success = false;        
        this.formLocker.lockForm(this.roleForm);
        this.userService.changeRole(this.user.id, this.user.role).then(() =>
        {
            this.success = true;
            this.user.init_role = this.user.role;
            this.formLocker.unlockForm(this.roleForm);
        }).catch(error =>
        {
            alert('Fehler');
            console.log(error);
            this.formLocker.unlockForm(this.roleForm);
        });
    }
}
