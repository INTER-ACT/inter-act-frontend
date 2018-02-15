import { DiscussionService } from '../services/discussion-service';

@inject(DiscussionService)
export class Paragraph
{
    constructor(discussionService)
    {
        this.discussionService = discussionService;
    }
}
