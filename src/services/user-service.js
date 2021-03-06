import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AuthService, ROLE_ADMIN, ROLE_EXPERT, ROLE_GUEST, ROLE_SCIENTIST, ROLE_USER } from './auth-service';
import { BaseService } from './base-service';
import { DiscussionService } from './discussion-service';

@inject(BaseService, AuthService, Router, DiscussionService)
export class UserService
{
    constructor(baseService: BaseService, authService: AuthService, router: Router, discussionService: DiscussionService)
    {
        this.baseService = baseService;
        this.authService = authService;
        this.router = router;
        this.discussionService = discussionService;
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

    getUsers()
    {
        return this.baseService.getIntoJSON('users', null, this.authService.createHeadersWithAccessToken());
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

    changeRole(userID: number, role: string)
    {
        return this.baseService.put(this.getUserURI(userID) + '/role', { role: role }, this.authService.createHeadersWithAccessToken());
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
        return (this.isSelfScientist() || this.isSelfAdmin());
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

    redirectIfNotAdmin(target: string = 'home'): boolean
    {
        return this._redirectIfNot(this.isSelfAdmin(), target);
    }

    redirectIfNotExpert(target: string = 'home'): boolean
    {
        return this._redirectIfNot(this.isSelfExpertOrHigher(), target);
    }

    redirectIfNotScientist(target: string = 'home'): boolean
    {
        return this._redirectIfNot(this.isSelfScientistOrHigher(), target);
    }

    _redirectIfNot(check: boolean, target: string): boolean
    {
        if (!check)
        {
            this.router.navigate(target);
            return true;
        }

        return false;
    }

    getSelfRelevantDiscussions()
    {
        return this.discussionService.getRelevantDiscussions(this.getSelfID());
    }
}
