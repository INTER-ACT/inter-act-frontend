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
            val: 'aspect1',
            selected: false
        },
        {
            name: '=',
            forID: 'aspect-b',
            val: null,
            selected: true
        },
        {
            name: '-',
            forID: 'aspect-c',
            val: 'aspect2',
            selected: false
        }
    ]

    @bindable
    @observable
    selectedAspect = null;

    selectedAspect2 = null;

    @bindable changed = null;

    @bindable callbackThis = null;

    constructor(sequencer: Sequencer, discussionService: DiscussionService)
    {
        this.sequencer = sequencer;
        this.discussionService = discussionService;
    }

    selectedAspectChanged()
    {
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

            if (a.selected)
            {
                this.selectedAspect = a;
                this.selectedAspect2 = a;
            }
        });

        this.attachtivated = true;
    }

    submitVote()
    {
        if (!this.discussionService.authService.isLoggedIn())
        {
            alert('Nicht eingeloggt.'); // eslint-disable-line no-alert
            this.attachtivated = false;
            this.selectedAspect = this.aspect[1];
            this.attachtivated = true;
            return;
        }

        if (this.changed)
        {
            this.selectedAspect2 = this.selectedAspect;
            this.selectedAspect.selected = true;

            this.aspect.forEach(a =>
            {
                if (a !== this.selectedAspect)
                {
                    a.selected = false;
                }
            });

            this.changed();
        }
    }
}
