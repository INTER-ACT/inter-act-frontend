import {inject} from 'aurelia-framework';
import {DiscussionService} from '../../services/discussion-service';

@inject(DiscussionService)
export class Tag
{
    isReady: boolean = false;
    tags: Array = [];

    constructor(discussionService: DiscussionService)
    {
        this.discussionService = discussionService;

        let a = this.discussionService.getAllTags();
        a.then(tags =>
        {
            this.tags = tags;
            this.isReady = true;
        });
    }
}
