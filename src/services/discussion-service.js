import { inject } from 'aurelia-framework';
import { BaseService } from './base-service';
import { AuthService } from './auth-service';

@inject(BaseService, AuthService)
export class DiscussionService
{
    _tags: Array = [];

    constructor(bsSrvc: BaseService, authService: AuthService)
    {
        this.bsSrvc = bsSrvc;
        this.authService = authService;
        this._fetchAndStoreAllTags().catch(error =>
        {
            alert('Schwerer Fehler :(\nTags konnten nicht geladen werden.\n\nDetails: siehe Console'); // eslint-disable-line no-alert
            console.log(error); // eslint-disable-line no-console
        });
    }

    getDiscussionById(id: number)
    {
        return this.bsSrvc.getIntoJSON('discussions/' + id);
    }

    getDiscussions()
    {
        return this.bsSrvc.getIntoJSON('discussions', { start: 0, count: 100 });
    }

    getAmendmentById(discussionID: number, amendmentID: number)
    {
        return this.bsSrvc.getIntoJSON('discussions/' + discussionID + '/amendments/' + amendmentID);
    }

    getAmendmentsByDiscussion(discussionID: number)
    {
        return this.bsSrvc.getIntoJSON('discussions/' + discussionID + '/amendments');
    }

    getAllTags(): Promise
    {
        return (this._tags.length > 0) ?
            Promise.resolve().then(() =>
            {
                return this._tags;
            }) :
            this._fetchAndStoreAllTags();
    }

    _fetchAllTags()
    {
        return this.bsSrvc.getIntoJSON('tags');
    }

    _fetchAndStoreAllTags()
    {
        return this._fetchAllTags().then(tags =>
        {
            this._tags = tags.tags;
            return this._tags;
        });
    }

    getCommentReplies(commentID: number)
    {
        return this.bsSrvc.getIntoJSON('comments/' + commentID + '/comments');
    }

    getCommentsByDiscussion(discussionID: number)
    {
        return this.bsSrvc.getIntoJSON('discussions/' + discussionID + '/comments');
    }

    getCommentById(id: number)
    {
        return this.bsSrvc.getIntoJSON('comments/' + id);
    }

    replyToComment(commentID: number, reply: string)
    {
        return this.bsSrvc.postIntoJSON('comments/' + commentID + '/comments', { content: reply, tags: [1] }, this.authService.createHeadersWithAccessToken());
    }

    commentDiscussion(discussionID: number, reply: string)
    {
        return this.bsSrvc.postIntoJSON('discussions/' + discussionID + '/comments', { content: reply, tags: [1] }, this.authService.createHeadersWithAccessToken());
    }

    createDiscussion(replyTitle: string, replyNumber: string, replyLaw: string, replyStatement: string)
    {
        return this.bsSrvc.postIntoJSON('discussions/', { title: replyTitle, law_number: replyNumber, law_text: replyLaw, law_explanation: replyStatement, tags: [1] }, this.authService.createHeadersWithAccessToken());
    }

    replyToAmendment(amendmentID: number, replyStatement: string, replyLaw: string)
    {
        return this.bsSrvc.postIntoJSON('discussions/' + amendmentID + '/amendments/', { explanation: replyStatement, updated_text: replyLaw, tags: [1] }, this.authService.createHeadersWithAccessToken());
    }
}
