import { bindable, inject } from 'aurelia-framework';
import { Author } from '../../models/author';
import { AuthService } from '../../services/auth-service';
import { DiscussionService } from '../../services/discussion-service';

@inject(AuthService, DiscussionService)
export class AmendmentCustomElement
{
    @bindable statement: string;
    @bindable law: string;
    @bindable rid: number;
    @bindable author: Author;

    hasAmendmentBoxOpen: boolean = false;
    subamendments: Array = [];
    replyLaw: string = '';
    replyStatement: string = '';

    constructor(authService: AuthService, discussionService: DiscussionService)
    {
        this.authService = authService;
        this.discussionService = discussionService;
    }

    amendmentBegin()
    {
        if (!this.authService.isLoggedIn())
        {
            $('#plzLogin').foundation('reveal', 'open');
            return;
        }

        this.hasAmendmentBoxOpen = true;
    }

    report()
    {
        alert('not implemented yet');
    }

    submitAmendent()
    {
        this.discussionService.replyToAmendment(this.rid, this.replyStatement, this.replyLaw).then(r =>
        {
            alert(r);
            this.discussionService.getAmendmentById(r.id).then(c => this.subamendents.push(c));
        }).catch(error =>
        {
            alert('ERROR');
            console.log(error);
        });
    }

    submitAmendmentCancel()
    {
        replyLaw: string = '';
        replyStatement: string = '';
        this.hasAmendentBoxOpen = false;
    }
}
