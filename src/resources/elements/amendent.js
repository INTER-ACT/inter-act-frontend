import { bindable, inject } from 'aurelia-framework';
import { Author } from '../../models/author';
import { AuthService } from '../../services/auth-service';
import { DiscussionService } from '../../services/discussion-service';

@inject(AuthService, DiscussionService)
export class AmendentCustomElement
{
    @bindable statement: string;
    @bindable law: string;
    @bindable rid: number;
    @bindable author: Author;

    hasAmendentBoxOpen: boolean = false;
    subamendents: Array = [];
    replyLaw: string = '';
    replyStatement: string = '';

    constructor(authService: AuthService, discussionService: DiscussionService)
    {
        this.authService = authService;
        this.discussionService = discussionService;
    }

    amendentBegin()
    {
        if (!this.authService.isLoggedIn())
        {
            $('#plzLogin').foundation('reveal', 'open');
            return;
        }

        this.hasAmendentBoxOpen = true;
    }

    report()
    {
        alert('not implemented yet');
    }

    submitAmendent()
    {
        this.discussionService.replyToAmendent(this.rid, this.replyStatement, this.replyLaw).then(r =>
        {
            alert(r);
            this.discussionService.getAmendentById(r.id).then(c => this.subamendents.push(c));
        }).catch(error =>
        {
            alert('ERROR');
            console.log(error);
        });
    }

    submitAmendentCancel()
    {
        replyLaw: string = '';
        replyStatement: string = '';
        this.hasAmendentBoxOpen = false;
    }
}
