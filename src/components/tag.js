import { inject } from 'aurelia-framework';
import { DiscussionService } from '../services/discussion-service';

@inject(DiscussionService)
export class Tag
{
    constructor(discussionService)
    {
        this.discussionService = discussionService;


        this.discussions = [];


        this.discussionService.getTags().then(jsonResponse =>
        {
            jsonResponse.data.discussions.forEach(d =>
            {
                this.discussionService.getTagById(d.id).then(dsc =>
                {
                    this.discussions.push(dsc);
                });
            });
        });
    }
}
