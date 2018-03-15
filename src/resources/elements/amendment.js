import { bindable, inject } from 'aurelia-framework';
import { Author } from '../../models/author';
import { AuthService } from '../../services/auth-service';
import { DiscussionService } from '../../services/discussion-service';

@inject(AuthService, DiscussionService, UserService)
export class AmendmentCustomElement
{
    /*@bindable statement: string;
    @bindable law: string;
    @bindable rid: number;
    @bindable author: Author;

    hasAmendmentBoxOpen: boolean = false;
    subamendments: Array = [];
    replyLaw: string = '';
    replyStatement: string = '';*/

    @bindable rdata: object;
    @bindable comments: Array;
    @bindable amendments: Array;


    @bindable resourceid = '';

    @bindable author: Author;
    @bindable content: string;
    @bindable rid: number;

    hasCommentateBoxOpen: boolean = false;
    hasAmendmentBoxOpen: boolean = false;
    amendmentText: string = '';
    amendmentReason: string = '';

    hasShareBoxOpen: boolean = false;
    shareLink: string = '';
    shareCopied: boolean = false;
    replyText: string = '';


    constructor(authService: AuthService, discussionService: DiscussionService, userService: UserService)
    {
        this.authService = authService;
        this.discussionService = discussionService;
        this.userService = userService;
    }

    commentateBegin()
    {
        if (!this.authService.isLoggedIn())
        {
            alert('Bitte loggen Sie sich ein, um mitdiskutieren zu können...');
            return;
        }

        this.hasCommentateBoxOpen = true;
    }

    shareBegin()
    {
        if (this.hasShareBoxOpen)
        {
            this.hasShareBoxOpen = false;
            return;
        }
        this.shareCopied = false;
        this.shareLink = window.location.href;
        this.hasShareBoxOpen = true;
    }

    shareCopy()
    {
        this.shareLinkBox.select();
        if (document.execCommand('Copy'))
        {
            this.shareCopied = true;
        }
    }

    submitComment()
    {
        this.discussionService.commentAmendment(this.rdata.id, this.replyText).then(r =>
        {
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

    submitAmendment()
    {
        let ts = [];
        this.rdata.tags.forEach(t =>
        {
            ts.push(t.id);
        });

        this.discussionService.submitAmendment(this.rdata.id, this.amendmentText, this.amendmentReason, ts).then(r =>
        {
            this.discussionService.getAmendmentById(r.id).then(c => this.amendments.push(c));
        }).catch(error =>
        {
            alert('ERROR');
            console.log(error);
        });
    }

    submitAmendmentCancel()
    {
        this.hasAmendentBoxOpen = false;
    }

    amendmentBegin()
    {
        this.amendmentText = this.rdata.law_text;
        this.hasAmendentBoxOpen = true;
    }
}


