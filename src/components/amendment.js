import { inject } from 'aurelia-framework';
import { DiscussionService } from '../services/discussion-service';
import { UserService } from "../services/user-service";

@inject(DiscussionService, UserService)
export class Amendent
{
    amendments: Array = [];
    comments: Array = [];
    amendmentData = {
        changes: [],
        explanation: ''
    };


    constructor(discussionService: DiscussionService, userService: UserService)
    {
        this.discussionService = discussionService;
        this.userService = userService;
    }

    activate(args: object)
    {
        let did = Number.parseInt(args.did, 10);

        if (Number.isNaN(did) || did < 0)
        {
            this.did = args.did;
            this.notFound = true;
            this.isReady = true;
            return;
        }

        this.did = did;

        let aid = Number.parseInt(args.aid, 10);

        if (Number.isNaN(aid) || aid < 0)
        {
            this.aid = args.aid;
            this.notFound = true;
            this.isReady = true;
            return;
        }

        this.aid = aid;

        this.notFound = false;

        this.discussionService.getAmendmentById(did, aid).then(am =>
        {
            this.amendmentData = am;
            this.amendmentData.parentDiscussion = this.did;

            Promise.all([
                this.discussionService.getCommentsByAmendment(did, aid).then(cs =>
                {
                    cs.data.comments.forEach(c =>
                    {
                        this.discussionService.getCommentById(c.id).then(cc =>
                        {
                            this.comments.push(cc);
                        });
                    });
                }),

                this.discussionService.getSubamendmentsByAmendment(did, aid).then(ams =>
                {
                    ams.data.subamendments.forEach(a =>
                    {
                        this.discussionService.getSubAmendmentById(did, aid, a.id).then(aa =>
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
                })
            ]).then(() =>
            {
                this.isReady = true;
            });
        });
    }
}
