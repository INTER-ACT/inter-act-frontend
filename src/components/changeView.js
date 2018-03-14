import { inject } from 'aurelia-framework';
import { UserService } from '../services/user-service';

@inject(UserService)
export class ChangeView
{
    isReady: boolean = false;

    discussions = [];

    constructor(userService: UserService)
    {
        this.userService = userService;
        this.discussionService = this.userService.discussionService;

        this.userService.getSelfRelevantDiscussions().then(jsonResponse =>
        {
            jsonResponse.discussions.forEach(d =>
            {
                this.discussionService.getDiscussionById(d.id).then(dsc =>
                {
                    this.discussions.push(dsc);
                });
            });
            this.isReady = true;
        });
    }
}
