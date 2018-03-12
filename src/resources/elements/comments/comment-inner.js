import { bindable, inject } from 'aurelia-framework';
import { DiscussionService } from '../../../services/discussion-service';
import { UsernameService } from '../../../services/username-service';

@inject(DiscussionService, UsernameService)
export class CommentInner
{
    isReady: boolean = false;
    isReplying: boolean = false;
    replyText: string = '';

    @bindable authorId: number = -1;
    @bindable commentId: number = -1;
    @bindable selfLoading: boolean = true;
    @bindable resourceData: object = {
        author:
        {
            id: -1,
            username: 'unknown'
        },
        content: '...',
        comments: []
    };

    constructor(discussionService: DiscussionService, usernameService: UsernameService)
    {
        this.discussionService = discussionService;
        this.usernameService = usernameService;
    }

    attached()
    {
        if (this.selfLoading)
        {
            this.loadCommentData().then(() =>
            {
                this.isReady = true;
            });
        }
        else
        {
            this.isReady = true;
        }
    }

    loadCommentData(): Promise
    {
        return this.discussionService.getCommentById(this.commentId).then(comment =>
        {
            comment.comments = [];
            this.resourceData = comment;

            return Promise.all([
                this.usernameService.getUsername(this.resourceData.author.id).then(username =>
                {
                    this.resourceData.author.username = username;
                }),
                this.discussionService.getCommentReplies(this.commentId).then(replies =>
                {
                    this.resourceData.comments = replies.data.comments;
                })
            ]);
        });
    }

    replyBegin()
    {
        if (!this.discussionService.authService.isLoggedIn())
        {
            alert('Nicht eingeloggt.');
            return;
        }

        this.isReplying = true;
    }

    replyCancel()
    {
        this.replyText = '';
        this.isReplying = false;
    }

    replySubmit()
    {
        this.discussionService.replyToComment(this.commentId, this.replyText).then(r =>
        {
            alert(r);
            this.discussionService.getCommentById(r.id).then(c => this.subcomments.push(c));
        }).catch(error =>
        {
            alert('ERROR');
            console.log(error);
        });
    }
}
