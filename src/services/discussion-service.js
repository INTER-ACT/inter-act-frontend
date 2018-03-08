import { inject } from 'aurelia-framework';
import { BaseService } from './base-service';

@inject(BaseService)
export class DiscussionService
{
    constructor(bsSrvc: BaseService)
    {
        this.bsSrvc = bsSrvc;
    }

    getDiscussionById(id: number)
    {
        return this.bsSrvc.getIntoJSON('discussions/' + id);
    }

    getDiscussions()
    {
        return this.bsSrvc.getIntoJSON('discussions', {start: 0, count: 100});
    }

    getAmendentById(id: number)
    {
        return this.bsSrvc.getIntoJSON('amendents/' + id);
    }

    getAmendents()
    {
        return this.bsSrvc.getIntoJSON('amendents', {start: 0, count: 100});
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
}
