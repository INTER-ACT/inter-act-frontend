import { bindable, inject } from 'aurelia-framework';
import { Author } from '../../models/author';
import { AuthService } from '../../services/auth-service';
import { DiscussionService } from '../../services/discussion-service';

@inject(AuthService, DiscussionService)
export class DiscussionCustomElement
{
    @bindable rdata: object;
    @bindable comments: Array;

    /**
     * DiscussionID
     */
    @bindable resourceid = '';

    @bindable author: Author;
    @bindable content: string;
    @bindable rid: number;

    hasCommentateBoxOpen: boolean = false;
    replyText: string = '';




    constructor(authService: AuthService, discussionService: DiscussionService)
    {
        this.authService = authService;
        this.discussionService = discussionService;
    }

    commentateBegin()
    {
        if (!this.authService.isLoggedIn())
        {
            $('#plzLogin').foundation('reveal', 'open');
            return;
        }

        this.hasCommentateBoxOpen = true;
    }

    report()
    {
        alert('not implemented yet');
    }

    submitComment()
    {
        this.discussionService.replyToComment(this.rid, this.replyText).then(r =>
        {
            alert(r);
            this.discussionService.getCommentById(r.id).then(c => this.comments.push(c));
        }).catch(error =>
        {
            alert('ERROR');
            console.log(error);
        });
    }

    submitCommentCancel()
    {
        this.replyText = '';
        this.hasCommentateBoxOpen = false;
    }
}
