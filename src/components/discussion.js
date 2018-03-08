import { inject } from 'aurelia-framework';
import { DiscussionService } from '../services/discussion-service';

@inject(DiscussionService)
export class Discussion
{
    notFound: boolean = false;
    isReady: boolean = false;
    id: number;
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

        this.discussionService.getDiscussionById(id)
            .then(d =>
            {
                this.id = id;
                this.discussionData = d;
                this.notFound = false;
                this.isReady = true;
                return d;
            })
            .then(d =>
            {
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
            })
            .catch(error =>
            {
                if (error.status === 404)
                {
                    this.notFound = true;
                    this.isReady = true;
                }
            });
    }
}
