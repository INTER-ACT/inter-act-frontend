import { inject } from 'aurelia-framework';
import { BaseService } from './base-service';
import { AuthService } from './auth-service';

@inject(BaseService, AuthService)
export class DiscussionService
{
    constructor(bsSrvc: BaseService, authService: AuthService)
    {
        this.bsSrvc = bsSrvc;
        this.authService = authService;
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

    getTags()
    {
        return this.bsSrvc.getIntoJSON('tags');
    }

    getTagById(id: number)
    {
        return this.bsSrvc.getIntoJSON('tags/' + id);
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
        return this.bsSrvc.postIntoJSON('comments/' + commentID + '/comments', { content: reply, tags: [ 1 ] }, this.authService.createHeadersWithAccessToken());
    }

    commentDiscussion(discussionID: number, reply: string)
    {
        return this.bsSrvc.postIntoJSON('discussions/' + discussionID + '/comments', { content: reply, tags: [ 1 ] }, this.authService.createHeadersWithAccessToken());
    }
}
