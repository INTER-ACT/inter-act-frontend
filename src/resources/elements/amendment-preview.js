import { bindable, inject } from 'aurelia-framework';
import { DiscussionService } from '../../services/discussion-service';

@inject(DiscussionService)
export class AmendmentPreview
{
    @bindable amendmentId = -1;
    @bindable discussionId = -1;

    @bindable isSubamendment: boolean = false;
    @bindable parentAmendmentId = -1;

    @bindable acceptBox: boolean = false;

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
        /* eslint-disable no-alert, no-console */
        let reason = prompt('Warum möchten Sie diesen Beitrag melden?\nBitte geben Sie eine kurze Begründung ein:');
        if (reason.length > 0)
        {
            let p = (this.isSubamendment) ?
                this.discussionService.reportSubamendment(this.amendmentId, reason) :
                this.discussionService.reportAmendment(this.amendmentId, reason);

            p.then(() =>
            {
                alert('Meldung gesendeet.\nDanke für deine Mithilfe.');
            }).catch(error =>
            {
                alert('Es ist ein Fehler aufgetreten: ' + error.statusText);
                console.log(error);
            });
        }
        /* eslint-enable no-alert, no-console */
    }

    accept()
    {
        /* eslint-disable no-alert, no-console */
        this.discussionService.acceptSubamendment(this.discussionId, this.parentAmendmentId, this.amendmentId).then(() =>
        {
            alert('Vorschlag erfolgreich angenommen.');
            window.location.reload();
        }).catch(error =>
        {
            alert('Es ist ein Fehler aufgetreten: ' + error.statusText);
            console.log(error);
        });
        /* eslint-enable no-alert, no-console */
    }

    reject()
    {
        /* eslint-disable no-alert, no-console */
        let reason = prompt('Warum möchten Sie diesen Änderungsvorschlag ablehnen?\nBitte geben Sie eine kurze Begründung ein:');
        if (reason.length > 0)
        {
            this.discussionService.rejectSubamendment(this.discussionId, this.parentAmendmentId, this.amendmentId, reason).then(() =>
            {
                alert('Vorschlag abgelehnt.');
            }).catch(error =>
            {
                alert('Es ist ein Fehler aufgetreten: ' + error.statusText);
                console.log(error);
            });
        }
        /* eslint-enable no-alert, no-console */
    }
}
