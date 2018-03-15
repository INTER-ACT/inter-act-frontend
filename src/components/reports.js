import { inject } from 'aurelia-framework';
import { DiscussionService } from '../services/discussion-service';
import { UserService } from '../services/user-service';

@inject(DiscussionService, UserService)
export class Reports
{
    reportedComments = [];

    constructor(discussionService: DiscussionService, userService: UserService)
    {
        this.discussionService = discussionService;
        this.userService = userService;

        this.userService.redirectIfNotAdmin();
    }

    activate()
    {
        this.discussionService.getReportedComments().then(cs =>
        {
            cs.data.reports.forEach(r =>
            {
                let v = {
                    reportID: r.id
                };
                this.discussionService.getReportByID(r.id).then(rc =>
                {
                    this.discussionService.getCommentById(rc.reported_item.id).then(cm =>
                    {
                        console.log(cm);
                    });
                    console.log(rc);
                });
                console.log(r);
            });
            console.log(cs);
        });
    }
}
