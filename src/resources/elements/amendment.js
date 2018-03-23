import { bindable, inject } from 'aurelia-framework';
import { Author } from '../../models/author';
import { AuthService } from '../../services/auth-service';
import { DiscussionService } from '../../services/discussion-service';
import { UserService } from '../../services/user-service';

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

    @bindable discussionId: number = -1;

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

        this.meID = this.authService.getSelfID();
    }

    attached()
    {
        console.log('RDATA');
        console.log(this.rdata);
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

    commentateBegin()
    {
        if (!this.authService.isLoggedIn())
        {
            alert('Bitte loggen Sie sich ein, um mitdiskutieren zu können...');
            return;
        }

        this.hasCommentateBoxOpen = true;
        this.hasShareBoxOpen = false;
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

        console.log(ts);

        this.discussionService.submitSubamendment(this.discussionId, this.rdata.id, this.amendmentText, this.amendmentReason, ts).then(r =>
        {
            console.log(r);
            this.discussionService.getSubAmendmentById(this.discussionId, this.rdata.id, r.id).then(c =>
            {
                this.amendments.push(c);
                this.submitAmendmentCancel();
            });
        }).catch(error =>
        {
            alert('ERROR');
            console.log(error);
        });
    }

    submitAmendmentCancel()
    {
        this.hasAmendmentBoxOpen = false;
        this.amendmentText = '';
        this.amendmentReason = '';
    }

    amendmentBegin()
    {
        if (!this.authService.isLoggedIn())
        {
            alert('Bitte loggen Sie sich ein, um mitdiskutieren zu können...'); // eslint-disable-line no-alert
            return;
        }

        //this.amendmentText = this.rdata.law_text;
        this.amendmentText = '';
        this.hasAmendmentBoxOpen = true;
        this.hasShareBoxOpen = false;
    }

    report()
    {
        /* eslint-disable no-alert */
        if (!this.authService.isLoggedIn())
        {
            alert('Bitte loggen Sie sich ein, um Beiträge melden zu können...');
            return;
        }

        let reason = prompt('Warum möchten Sie diesen Beitrag melden?\nBitte geben Sie eine kurze Begründung ein:');
        if (reason && reason.length > 0)
        {
            this.discussionService.reportAmendment(this.rdata.id, reason).then(() =>
            {
                alert('Meldung gesendeet.\nDanke für deine Mithilfe.');
            }).catch(error =>
            {
                alert('Es ist ein Fehler aufgetreten: ' + error.statusText);
                console.log(error); // eslint-disable-line no-console
            });
        }
        /* eslint-enable no-alert */
    }
}
