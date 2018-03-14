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

    tags: Array = [];

    constructor(router: Router, authService: AuthService, discussionService: DiscussionService, userService: UserService)
    {
        this.authService = authService;
        this.router = router;
        this.discussionService = discussionService;
        this.userService = userService;

        if (!this.userService.redirectIfNotAdmin())
        {
            this.discussionService.getAllTags().then(ts =>
            {
                ts.forEach(tag =>
                {
                    tag.isSeleted = false;
                    this.tags.push(tag);
                });
            });

            this.fetchLawTexts();
        }
    }

    submitNew()
    {
        let ts = [];

        this.tags.forEach(t =>
        {
            if (t.isSelected)
            {
                ts.push(t.id);
            }
        });

        this.discussionService.createDiscussion(this.dTitle, this.dNumber, this.dLaw, this.dExplanation, ts).then(r =>
        {
            alert('Angelegt.');
            window.location.reload();
        }).catch(error =>
        {
            error.json().then(js =>
            {
                alert('ERROR\n' + js.details);
                console.log(error);
            });
        });
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
