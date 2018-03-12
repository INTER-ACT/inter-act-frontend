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

    getAmendentById(id: number)
    {
        return this.bsSrvc.getIntoJSON('amendents/' + id);
    }

    getAmendents()
    {
        return this.bsSrvc.getIntoJSON('amendents', { start: 0, count: 100 });
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
}
