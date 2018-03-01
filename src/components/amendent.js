import { inject } from 'aurelia-framework';
import { DiscussionService } from '../services/discussion-service';

@inject(DiscussionService)
export class Amendent
{
    constructor(discussionService)
    {
        this.discussionService = discussionService;


        this.amendents = [
            {
                user: 'USERHans',
                titel: 'das ist ein Paragraphtitel',
                changes: 'Das ist ein Gesetzestext der verändert wurde xyz der die das Änderung123',
                explanation: 'Ich habe hatte werde mache weil wegen dem der die das'
            }
        ];

/*
        this.discussionService.getAmendents()().then(jsonResponse =>
        {
            jsonResponse.data.amendents.forEach(a =>
            {
                this.discussionService.getAmendentById(a.id).then(ams =>
                {
                    this.amendents.push(ams);
                });
            });
        });*/
    }
}
