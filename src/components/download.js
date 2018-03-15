import { inject } from 'aurelia-framework';
import { DiscussionService } from '../services/discussion-service';
import { Saver } from '../utils/saver';

@inject(Saver, DiscussionService)
export class Download
{
    startDate: string = '2016-12-31';
    endDate: string = '2017-12-31';

    isLoading: number = 0;


    constructor(saver: Saver, discussionService: DiscussionService)
    {
        this.saver = saver;
        this.discussionService = discussionService;

        let now = new Date();
        this.endDate = now.getFullYear() + '-' + ((now.getMonth() < 10) ? '0' : '') + now.getMonth() + '-' + ((now.getDate() < 10) ? '0' : '') + now.getDate();
    }

    saveStatsOverall()
    {
        ++this.isLoading;

        this.discussionService.getScientistStatsOverall(this.startDate, this.endDate).then(stats =>
        {
            this.saver.saveFile(stats,  this.concatFilename('overall'));
            --this.isLoading;
        });
    }

    concatFilename(suf: string): string
    {
        return this.startDate + '_' + this.endDate + '_' + suf + '.csv';
    }
}
