import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import {DiscussionService} from "../services/discussion-service";

@inject(Router, DiscussionService)
export class SearchTag
{

    discussions: Array = [];
    constructor(router: Router, discussionService: DiscussionService)
    {
        this.router = router;
        this.discussionService = discussionService;
    }

    activate(args: object)
    {
        let tagID = Number.parseInt(args.tagid, 10);

        if (Number.isNaN(tagID) || tagID < 0)
        {
            this.router.navigateToRoute('groups');
        }

        this.tagID = tagID;

        this.discussionService.getDiscussionsByTagID(tagID).then(jsonResponse =>
        {
            jsonResponse.data.discussions.forEach(d =>
            {
                this.discussionService.getDiscussionById(d.id).then(dsc =>
                {
                    this.discussions.push(dsc);
                });
            });
        });
    }
}