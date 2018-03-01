import { inject } from 'aurelia-framework';
import { DiscussionService } from '../services/discussion-service';

@inject(DiscussionService)
export class Tag
{
    constructor(discussionService)
    {
        this.discussionService = discussionService;

        this.discussions = [];
        this.tags = [];


        /*this.discussionService.getTags().then(jsonResponse =>
        {
            jsonResponse.data.tags.forEach(d =>
            {
                this.discussionService.getTagById(d.id).then(t =>
                {
                    this.tags.push(t);
                });
            });
        });*/

        this.discussionService.getDiscussions().then(jsonResponse =>
        {
            jsonResponse.data.discussions.forEach(d =>
            {
                this.discussionService.getDiscussionById(d.id).then(dsc =>
                {
                    this.discussions.push(dsc);

                    this.discussionService.getTags().then(jsonResponse =>
                     {
                         jsonResponse.data.tags.forEach(t =>
                         {
                             this.discussionService.getTagById(t.id).then(tag =>
                             {
                                 this.tags[d.id].push(tag);

                             });
                         });
                     });
                });
            });
        });
    }
}
