import { inject } from 'aurelia-framework';
import { DiscussionService } from '../services/discussion-service';

@inject(DiscussionService)
export class Discussion
{
    notFound: boolean = false;
    notPermitted: boolean = false;
    isReady: boolean = false;
    id;
    discussionData:
    {
        title: '...',
        law_text: '...',
        law_explanation: '...'
    };
    comments: Array = [];
    amendments: Array = [];

    constructor(discussionService: DiscussionService)
    {
        this.discussionService = discussionService;
    }

    activate(args)
    {
        let id = Number.parseInt(args.id, 10);

        if (Number.isNaN(id) || id < 0)
        {
            this.id = args.id;
            this.notFound = true;
            this.isReady = true;
            return;
        }

        this.id = id;

        this.discussionService.getDiscussionById(id)
            .then(d =>
            {
                this.discussionData = d;
                this.notFound = false;
                this.isReady = true;

                this.discussionService.getCommentsByDiscussion(d.id).then(cs =>
                {
                    cs.data.comments.forEach(c =>
                    {
                        this.discussionService.getCommentById(c.id).then(cc =>
                        {
                            this.comments.push(cc);
                        });
                    });
                });
                this.discussionService.getAmendmentsByDiscussion(this.id).then(ams =>
                {
                    console.log(ams);
                    ams.data.amendments.forEach(a =>
                    {
                        this.discussionService.getAmendmentById(this.id, a.id).then(aa =>
                        {
                            this.amendments.push(aa);
                            console.log(aa);
                        });
                    });
                });
            }, error =>
            {
                error.json().then(ej =>
                {
                    if (ej.code == 0) // eslint-disable-line eqeqeq
                    {
                        this.notFound = true;
                        this.isReady = true;
                    }
                    else if (ej.code == 7) // eslint-disable-line eqeqeq
                    {
                        this.notPermitted = true;
                        this.isReady = true;
                    }
                    else
                    {
                        alert('Fehler: ' + ej.message);
                        console.log(ej);
                    }
                });
            });
    }
}
