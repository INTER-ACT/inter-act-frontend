import { inject } from 'aurelia-framework';
import { DiscussionService } from '../../../services/discussion-service';

@inject(DiscussionService)
export class CommentInner
{
    isReady: boolean = false;

    constructor(discussionService: DiscussionService)
    {
        this.discussionService = discussionService;
    }
}
