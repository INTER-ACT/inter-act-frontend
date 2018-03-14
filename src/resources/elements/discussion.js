import { bindable, inject } from 'aurelia-framework';
import { Author } from '../../models/author';
import { AuthService } from '../../services/auth-service';
import { DiscussionService } from '../../services/discussion-service';

@inject(AuthService, DiscussionService)
export class DiscussionCustomElement
{
    @bindable rdata: object;
    @bindable comments: Array;
    @bindable amendments: Array;

    /**
     * DiscussionID
     */
    @bindable resourceid = '';

    @bindable author: Author;
    @bindable content: string;
    @bindable rid: number;

    hasCommentateBoxOpen: boolean = false;
    hasAmendmentBoxOpen: boolean = false;
    replyText: string = '';

    images = [];

    constructor(authService: AuthService, discussionService: DiscussionService)
    {
        this.authService = authService;
        this.discussionService = discussionService;

        /*

        this.discussionService.getDiscussions().then(jsonResponse =>
        {
            jsonResponse.data.discussions.forEach(d =>
            {
                this.discussionService.getDiscussionById(d.id).then(dsc =>
                {
                    this.discussions.push(dsc);
                });
            });
        }); */
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
        this.discussionService.commentDiscussion(this.rdata.id, this.replyText).then(r =>
        {
            alert(r);
            this.discussionService.getCommentById(r.id).then(c => this.comments.push(c));
            this.replyText = '';
            this.hasCommentateBoxOpen = false;
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
