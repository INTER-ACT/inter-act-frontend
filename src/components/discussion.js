import { inject } from 'aurelia-framework';
import { DiscussionService } from '../services/discussion-service';

@inject(DiscussionService)
export class Discussion
{
    constructor(discussionService)
    {
        this.discussionService = discussionService;


        this.discussions = [];
        this.comments = [];



        this.discussionService.getDiscussions().then(jsonResponse =>
        {
            jsonResponse.data.discussions.forEach(d =>
            {
                this.discussionService.getDiscussionById(d.id).then(dsc =>
                {
                    this.discussions.push(dsc);

                    this.discussionService.getComments().then(jsonResponse =>
                    {
                        jsonResponse.data.comments.forEach(c =>
                        {
                            this.discussionService.getCommentsById(c.id).then(com =>
                            {
                                this.comments[d.id].push(com);

                            });
                        });
                    });
                });
            });
        });
    }
}
