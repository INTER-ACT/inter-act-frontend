import { inject } from 'aurelia-framework';
import { DiscussionService } from '../services/discussion-service';

@inject(DiscussionService)
export class Search
{
    discussions: Array = [];
    searchTerm: string = '';
    isReady: boolean = false;

    constructor(discussionService)
    {
        this.discussionService = discussionService;
    }

    activate(args: object)
    {
        this.discussions = [];
        this.searchTerm = args.term;

        this.discussionService.searchForDiscussions(this.searchTerm).then(jsonResponse =>
        {
            jsonResponse.data.search_results.forEach(d =>
            {
                this.discussionService.getDiscussionById(d.id).then(dsc =>
                {
                    this.discussions.push(dsc);
                });
            });
            this.isReady = true;
        });
    }
}
