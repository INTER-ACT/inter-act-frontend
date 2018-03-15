import { inject } from 'aurelia-framework';
import { DiscussionService } from '../services/discussion-service';
import { UsernameService } from '../services/username-service';

@inject(DiscussionService, UsernameService)
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

    constructor(discussionService: DiscussionService, usernameService: UsernameService)
    {
        this.discussionService = discussionService;
        this.usernameService = usernameService;
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
                this.discussionService.getAmendmentsByDiscussion(d.id).then(ams =>
                {
                    ams.data.amendments.forEach(a =>
                    {
                        //console.log(d.id + ' - ' + a.id);
                        // seems like API delivers the wrong results
                        this.discussionService.getAmendmentById(d.id, a.id).then(aa =>
                        {
                            this.usernameService.getUsername(aa.author.id).then(username =>
                            {
                                aa.author.username = username;
                                aa.author.name = username;
                                this.amendments.push(aa);
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
            });
    }
}
