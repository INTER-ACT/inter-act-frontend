import { bindable, observable, inject } from 'aurelia-framework';
import { Sequencer } from '../../utils/sequencer';
import { DiscussionService } from '../../services/discussion-service';

@inject(Sequencer, DiscussionService)
export class MultiaspectAspect
{
    attachtivated: boolean = false;

    @bindable
    aspect = [
        {
            name: '+',
            forID: 'aspect-a',
            val: 'aspect1'
        },
        {
            name: '=',
            forID: 'aspect-b',
            val: null
        },
        {
            name: '-',
            forID: 'aspect-c',
            val: 'aspect2'
        }
    ]

    @bindable
    @observable
    selectedAspect = null;

    @bindable changed = null;

    constructor(sequencer: Sequencer, discussionService: DiscussionService)
    {
        this.sequencer = sequencer;
        this.discussionService = discussionService;
    }

    selectedAspectChanged()
    {
        console.log(this.selectedAspect);
        console.log(this.selectedAspect.val);

        if (this.attachtivated)
        {
            this.submitVote();
        }
    }

    attached()
    {
        this.aspect.forEach(a =>
        {
            a.forID = 'aspect-r-' + this.sequencer.next();
        });

        this.attachtivated = true;
    }

    submitVote()
    {
        if (!this.discussionService.authService.isLoggedIn())
        {
            alert('Nicht eingeloggt.');
            return;
        }

        if (this.attachtivated && this.changed)
        {
            this.changed();
        }
    }
}
