import { bindable, inject } from 'aurelia-framework';
import { DiscussionService } from '../../services/discussion-service';

@inject(DiscussionService)
export class AmendmentPreview
{
    @bindable amendmentId = -1;
    @bindable author = {
        id: -1,
        username: 'nobody'
    }
    @bindable changes = [];
    @bindable reason = '';

    constructor(discussionService: DiscussionService)
    {
        this.discussionService = discussionService;
    }

    report()
    {
        let reason = prompt('Warum möchten Sie diesen Beitrag melden?\nBitte geben Sie eine kurze Begründung ein:');
        if (reason.length > 0)
        {
            this.discussionService.reportAmendment(this.amendmentId, reason).then(() =>
            {
                alert('Meldung gesendeet.\nDanke für deine Mithilfe.');
            }).catch(error =>
            {
                alert('Es ist ein Fehler aufgetreten: ' + error.statusText);
                console.log(error);
            });
        }
    }
}
