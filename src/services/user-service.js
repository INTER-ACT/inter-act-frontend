import { inject } from 'aurelia-framework';
import { BaseService } from './base-service';
import { AuthService, ROLE_ADMIN, ROLE_EXPERT, ROLE_GUEST, ROLE_SCIENTIST, ROLE_USER } from './auth-service';

@inject(BaseService, AuthService)
export class UserService
{
    constructor(baseService: BaseService, authService: AuthService)
    {
        this.baseService = baseService;
        this.authService = authService;
    }

    changeEmail(newEmail: string)
    {
        this.baseService.patch(this.getSelfURI(), { email: newEmail }, this.authService.createHeadersWithAccessToken());
    }

    changePassword(oldPassword: string, newPassword: string)
    {
        this.baseService.patch(this.getSelfURI(), { old_password: oldPassword, password: newPassword }, this.authService.createHeadersWithAccessToken());
    }

    getSelfID()
    {
        return this.authService.getSelfID();
    }

    getSelfURI()
    {
        return this.authService.getSelfURI();
    }

    getSelfRole()
    {
        return this.authService.getSelfRole();
    }

    getUserDetailsByID(userID: number)
    {
        return this.baseService.getIntoJSON(this.getSelfURI() + '/details', null, this.authService.createHeadersWithAccessToken());
    }

    getUserRoleByID(userID: number)
    {
        return this.getUserDetailsByID(userID).then(json =>
        {
            return json.role;
        });
    }

    isSelfAdmin(): boolean
    {
        return (this.getSelfRole() === ROLE_ADMIN);
    }

    isSelfExpert(): boolean
    {
        return (this.getSelfRole() === ROLE_EXPERT);
    }

    isSelfExpertOrHigher(): boolean
    {
        return (this.isSelfExpert() || this.isSelfAdmin());
    }

    isSelfScientist(): boolean
    {
        return (this.getSelfRole() === ROLE_SCIENTIST);
    }

    isSelfScientistOrHigher(): boolean
    {
        return (this.isSelfScientist() || this.isSelfScientistOrHigher());
    }

    isSelfUser(): boolean
    {
        return (this.getSelfRole() === ROLE_USER);
    }

    isSelfUserOrHigher(): boolean
    {
        return (this.isSelfUser() || this.isSelfScientist() || this.isSelfExpert() || this.isSelfAdmin());
    }

    isSelfGuest(): boolean
    {
        return (this.getSelfRole() === ROLE_GUEST);
    }
}
