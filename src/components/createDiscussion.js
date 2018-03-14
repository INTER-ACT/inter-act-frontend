import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AuthService } from '../services/auth-service';
import { DiscussionService } from '../services/discussion-service';
import { UserService } from '../services/user-service';

@inject(Router, AuthService, DiscussionService, UserService)
export class CreateDiscussion
{
    dTitle: string = '';
    dExplanation: string = '';
    dLaw: string = '';
    dNumber: string = '';

    lawTexts: Array = [];
    lawTextsAPIfinished = false;
    lawTextsSelection = null;

    constructor(router: Router, authService: AuthService, discussionService: DiscussionService, userService: UserService)
    {
        this.authService = authService;
        this.router = router;
        this.discussionService = discussionService;
        this.userService = userService;

        if (!this.userService.redirectIfNotAdmin())
        {
            this.fetchLawTexts();
        }
    }

    newDiscussion()
    {
        this.discussionService.createDiscussion(this.replyTitle, this.replyNumber, this.replyLaw, this.replyStatement).then(r =>
        {
            this.replyTitle = '';
            this.replyLaw = '';
            this.replyStatement = '';
        }).catch(error =>
        {
            alert('ERROR');
            console.log(error);
        });
    }

    newDiscussionCancel()
    {
        this.replyTitle = '';
        this.replyLaw = '';
        this.replyStatement = '';
    }

    fetchLawTexts()
    {
        this.discussionService.getLawTexts().then(law =>
        {
            law.data.law_texts.forEach(txt =>
            {
                this.lawTexts.push(txt);
            });
            this.lawTextsAPIfinished = true;
        });
    }

    submitInsert()
    {
        this.discussionService.getLawTextByID(this.lawTextsSelection).then(law =>
        {
            this.dTitle = law.title;
            let p = document.createElement('p');

            p.innerHTML = law.content;
            this.dLaw = p.innerText;
        });
    }
}
