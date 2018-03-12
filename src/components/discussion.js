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

    constructor(discussionService: DiscussionService)
    {
        this.discussionService = discussionService;

        /*this.discussions = [];

        this.comments = [
        {
            id: '7',
            user: 'HansiAusTirol123',
            content: 'Ich bin nicht dieser Meinung da wir in Tirol auch Kühe haben.'
        },
        {
            id: '8',
            user: 'Maxi4',
            content: 'Morgen soll es viel Schnee geben. Ich bin nicht dieser Meinung da wir in Tirol auch Kühe haben.'
        },
        {
            id: '10',
            user: 'DerDönerMann',
            content: 'Morgen soll es viel Schnee geben. Das ist eine wahre Katastophe wenn man bedenkt das es im Wladviertel -21°C hat'
        },
        {
            id: '9',
            user: 'User445566',
            content: 'Ich bin nicht dieser Meinung da wir in Tirol auch Kühe haben.Ich bin nicht dieser Meinung da wir in Tirol auch Kühe haben.Ich bin nicht dieser Meinung da wir in Tirol auch Kühe haben.'
        }];

        this.discussionService.getDiscussions().then(jsonResponse =>
        {
            jsonResponse.data.discussions.forEach(d =>
            {
                this.discussionService.getDiscussionById(d.id).then(dsc =>
                {
                    this.discussions.push(dsc);

                    /* this.discussionService.getComments().then(jsonResponse =>
                     {
                         jsonResponse.data.comments.forEach(c =>
                         {
                             this.discussionService.getCommentsById(c.id).then(com =>
                             {
                                 this.comments[d.id].push(com);

                             });
                         });
                     }); */
        /*
                        });
                    });
                });*/
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
