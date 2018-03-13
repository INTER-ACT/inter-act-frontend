import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AuthService } from '../services/auth-service';
import { DiscussionService } from '../services/discussion-service';

@inject(Router, AuthService, DiscussionService)
export class CreateDiscussion
{
    replyTitle: string = '';
    replyNumber: string = '';
    replyLaw: string = '';
    replyStatement: string = '';





    constructor(router: Router, authService: AuthService, discussionService: DiscussionService)
    {
        this.authService = authService;
        this.router = router;
        this.discussionservice = discussionService;

        if (!this.authService.isLoggedIn())
        {
            this.router.navigate('');
        };

    }

    report()
    {
        alert('not implemented yet');
    }

    newDiscussion()
    {
        this.discussionservice.createDiscussion(this.replyTitle, this.replyNumber, this.replyLaw, this.replyStatement).then(r =>
        {

            this.replyTitle = '';
            this.replyLaw = '';
            this.replyStatement = '';
        }).catch(error =>
        {
            alert('ERROR');
            console.log(error);
        });
    }

    newDiscussionCancel()
    {
        this.replyTitle = '';
        this.replyLaw = '';
        this.replyStatement = '';
    }
}
