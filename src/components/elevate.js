import { inject } from 'aurelia-framework';
import { UserService } from '../services/user-service';
import { UsernameService } from '../services/username-service';

@inject(UserService, UsernameService)
export class Elevate
{
    users: Array = [];

    constructor(userService: UserService, usernameService: UsernameService)
    {
        this.userService = userService;
        this.usernameService = usernameService;
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
                this.usernameService.getUsername(user.id).then(username =>
                {
                    user.username = username;
                    this.users.push(user);
                });
            });
        });
    }
}
