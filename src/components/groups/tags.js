import {inject} from 'aurelia-framework';
import {DiscussionService} from '../../services/discussion-service';

@inject(DiscussionService)
export class Tag {
    constructor(discussionService) {
        this.discussionService = discussionService;

        this.tags = [];


        /*this.discussionService.getTags().then(jsonResponse =>
        {
            jsonResponse.data.tags.forEach(d =>
            {
                this.discussionService.getTagById(d.id).then(t =>
                {
                    this.tags.push(t);
                });
            });
        });*/


        this.discussionService.getTags().then(jsonResponse2 => {
            console.log(jsonResponse2);
            jsonResponse2.tags.forEach(t => {
                this.discussionService.getTagById(t.id).then(tag => {
                    this.tags.push(tag);
                });
            });
        });
    }
}
