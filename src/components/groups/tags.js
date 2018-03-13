import {inject} from 'aurelia-framework';
import {DiscussionService} from '../../services/discussion-service';

@inject(DiscussionService)
<<<<<<< HEAD
export class Tag {
    constructor(discussionService) {
        this.discussionService = discussionService;

        this.tags = [];

=======
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
>>>>>>> dev-design

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

<<<<<<< HEAD
=======
        /*this.discussionService.getDiscussions().then(jsonResponse =>
        {
            jsonResponse.data.discussions.forEach(d =>
            {
                this.discussionService.getDiscussionById(d.id).then(dsc =>
                {
                    this.discussions.push(dsc);
>>>>>>> dev-design

        this.discussionService.getTags().then(jsonResponse2 => {
            console.log(jsonResponse2);
            jsonResponse2.tags.forEach(t => {
                this.discussionService.getTagById(t.id).then(tag => {
                    this.tags.push(tag);
                });
            });
        });*/
    }
}
