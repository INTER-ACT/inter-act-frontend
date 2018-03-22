import { bindable, inject } from 'aurelia-framework';
import { DiscussionService } from '../../services/discussion-service';

@inject(DiscussionService)
export class MultiaspectCustomElement
{
    aspects = [];

    isReady: boolean = false;

    /**
     * discussionID
     */
    @bindable discussion: number;

    @bindable resourceHref: string = '';

    constructor(discussionService: DiscussionService)
    {
        this.discussionService = discussionService;
        this.this = this;
    }

    attached()
    {
        this.discussionService.getMultiAspectRating(this.resourceHref).then(mar =>
        {
            console.log(mar);
            this.discussionService.getAspectCount().then(count =>
            {
                this.loadAspect(1, count, mar).then(() =>
                {
                    this.isReady = true;
                });
            });
        });
    }

    loadAspect(i: number, count: number, mar: object)
    {
        let aspect = {
            aspect: [
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
        };

        return this.discussionService.getAspectName('aspect' + i).then(name =>
        {
            aspect.aspect[0].val = 'aspect' + i;
            aspect.aspect[0].name = name;
            aspect.aspect[0].count = mar.total_rating['aspect' + i];

            aspect.aspect[1].val = null;
            aspect.aspect[1].name = 'neutral';

            return this.discussionService.getAspectName('aspect' + (++i)).then(name2 =>
            {
                aspect.aspect[2].val = 'aspect' + i;
                aspect.aspect[2].name = name2;
                aspect.aspect[2].count = mar.total_rating['aspect' + i];

                this.aspects.push(aspect);

                return (i < count) ? this.loadAspect(++i, count, mar) : Promise.resolve();
            });
        });
    }

    aspectChanged()
    {
        let s = {};

        this.callbackThis.aspects.forEach(a =>
        {
            a.aspect.forEach(a2 =>
            {
                if (a2.val !== null)
                {
                    s[a2.val] = a2.selected;
                }
            });
        });

        this.discussionService.submitMultiAspectRating(this.callbackThis.resourceHref, s);
    }
}
