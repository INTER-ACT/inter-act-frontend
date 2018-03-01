import { inject } from 'aurelia-framework';
import { DiscussionService } from '../services/discussion-service';

@inject(DiscussionService)
export class Discussion
{
    constructor(discussionService)
    {
        this.discussionService = discussionService;


        this.discussions = [];

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
            }
        ];



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
                });
            });
        });
    }
}
