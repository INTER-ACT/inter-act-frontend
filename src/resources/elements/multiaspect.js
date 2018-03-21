import { bindable, inject } from 'aurelia-framework';
import { DiscussionService } from '../../services/discussion-service';

@inject(DiscussionService)
export class MultiaspectCustomElement
{
    aspects = [];

    selectedG1a = false;
    selectedG1b = true;
    selectedG1c = false;

    selectedG2a = false;
    selectedG2b = true;
    selectedG2c = false;

    /**
     * discussionID
     */
    @bindable discussion: number;

    @bindable disucssionHref: string = '';

    constructor(discussionService: DiscussionService)
    {
        this.discussionService = discussionService;
    }

    attached()
    {
        this.discussionService.getAspectCount().then(count =>
        {
            console.log(count);
            //let cnt = count / 2;

            for (let i = 1; i < count; ++i)
            {
                let aspect = {
                    aspect: [
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
                };

                this.discussionService.getAspectName('aspect' + i).then(name =>
                {
                    aspect.aspect[0].val = 'aspect' + i;
                    aspect.aspect[0].name = name;
                });

                aspect.aspect[1].val = null;
                aspect.aspect[1].name = 'neutral';

                this.discussionService.getAspectName('aspect' + (++i)).then(name =>
                {
                    aspect.aspect[2].val = 'aspect' + i;
                    aspect.aspect[2].name = name;
                });

                this.aspects.push(aspect);
            }

            /*let n = 1;
            this.aspects.forEach(aspect =>
            {
                this.discussionService.getAspectName('aspect' + n++).then(name =>
                {
                    aspect.aspect[0].name = name;
                });

                aspect.aspect[1].name = 'neutral';

                this.discussionService.getAspectName('aspect' + n++).then(name =>
                {
                    aspect.aspect[2].name = name;
                });
            });*/
        });
    }

    aspectChanged()
    {
        console.log('detect child change');
    }
}
