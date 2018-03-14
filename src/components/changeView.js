import { inject } from 'aurelia-framework';
import { DiscussionService } from '../services/discussion-service';

@inject(DiscussionService)
export class ChangeView
{
    isReady: boolean = false;

    constructor(discussionService)
    {
        this.discussionService = discussionService;


        this.discussions = [];


        this.discussionService.getDiscussions().then(jsonResponse =>
        {
            jsonResponse.data.discussions.forEach(d =>
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
