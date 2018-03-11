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
        return this.baseService.patch(this.getSelfURI(), { email: newEmail }, this.authService.createHeadersWithAccessToken());
    }

    changePassword(oldPassword: string, newPassword: string)
    {
        return this.baseService.patch(this.getSelfURI(), { old_password: oldPassword, password: newPassword }, this.authService.createHeadersWithAccessToken());
    }

    getSelfID(): number
    {
        return this.authService.getSelfID();
    }

    getUserURI(userID: number): string
    {
        return this.authService.getUserURI(userID);
    }

    getSelfURI(): string
    {
        return this.authService.getSelfURI();
    }

    getSelfRole(): string
    {
        return this.authService.getSelfRole();
    }

    getCountAmendmentsByUser(userID: number)
    {
        return this.baseService.getIntoJSON(this.getUserURI(userID) + '/amendments').then(json =>
        {
            let amC = json.meta.total;
            return this.baseService.getIntoJSON(this.getUserURI(userID) + '/amendments').then(json2 =>
            {
                let samC = json2.meta.total;
                return amC + samC;
            });
        });
    }

    getCountCommentsByUser(userID: number)
    {
        return this.baseService.getIntoJSON(this.getUserURI(userID) + '/comments').then(json =>
        {
            return json.meta.total;
        });
    }

    /**
     *  @see also: getUserDetailsByID(number)
     */
    getUserInfoByID(userID: number)
    {
        return this.baseService.getIntoJSON(this.getUserURI(userID));
    }

    /**
     * @see also: getUserInfoByID(number)
     */
    getUserDetailsByID(userID: number)
    {
        return this.baseService.getIntoJSON(this.getUserURI(userID) + '/details', null, this.authService.createHeadersWithAccessToken());
    }

    getSelfDetails()
    {
        return this.getUserDetailsByID(this.getSelfID());
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
