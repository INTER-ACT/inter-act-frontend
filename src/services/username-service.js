import { inject } from 'aurelia-framework';
import { UserService } from './user-service';

@inject(UserService)
export class UsernameService
{
    _users: object = {};

    constructor(userService: UserService)
    {
        this.userService = userService;
    }

    getUsername(userID: number): Promise
    {
        return (userID in this._users) ?
            Promise.resolve().then(() =>
            {
                return this._users[userID];
            }) :
            this.userService.getUserInfoByID(userID).then(info =>
            {
                this._users[userID] = info.username;
                return this._users[userID];
            });
    }
}
