import { inject } from 'aurelia-framework';
import { UserService } from '../services/user-service';

@inject(UserService)
export class Elevate
{
    users: Array = [];

    constructor(userService: UserService)
    {
        this.userService = userService;
    }

    activate()
    {
        if (this.userService.redirectIfNotAdmin())
        {
            return;
        }

        this.userService.getUsers().then(u =>
        {
            u.data.users.forEach(user =>
            {
                this.users.push(user);
            });
        });
    }
}
