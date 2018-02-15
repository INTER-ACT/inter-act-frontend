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
}
