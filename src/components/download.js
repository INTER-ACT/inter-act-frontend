import { inject } from 'aurelia-framework';
import { DiscussionService } from '../services/discussion-service';
import { UserService } from '../services/user-service';
import { Saver } from '../utils/saver';

@inject(Saver, DiscussionService, UserService)
export class Download
{
    startDate: string = '2016-12-31';
    endDate: string = '2017-12-31';

    isLoading: number = 0;

    constructor(saver: Saver, discussionService: DiscussionService, userService: UserService)
    {
        this.saver = saver;
        this.discussionService = discussionService;
        this.userService = userService;

        if (!this.userService.redirectIfNotScientist())
        {
            let now = new Date();
            this.endDate = now.getFullYear() + '-' + ((now.getMonth() < 10) ? '0' : '') + now.getMonth() + '-' + ((now.getDate() < 10) ? '0' : '') + now.getDate();
        }
    }

    saveStatsOverall()
    {
        ++this.isLoading;

        this.discussionService.getScientistStatsOverall(this.startDate, this.endDate).then(stats =>
        {
            this.saver.saveFile(stats, this.concatFilename('overall'));
            --this.isLoading;
        });
    }

    saveStatsUserActivity()
    {
        ++this.isLoading;

        this.discussionService.getScientistStatsUserActivity(this.startDate, this.endDate).then(stats =>
        {
            this.saver.saveFile(stats, this.concatFilename('user_activity'));
            --this.isLoading;
        });
    }

    saveStatsRatings()
    {
        ++this.isLoading;

        this.discussionService.getScientistStatsRatings(this.startDate, this.endDate).then(stats =>
        {
            this.saver.saveFile(stats, this.concatFilename('ratings'));
            --this.isLoading;
        });
    }

    saveStatsCommentRatings()
    {
        ++this.isLoading;

        this.discussionService.getScientistStatsCommentRatings(this.startDate, this.endDate).then(stats =>
        {
            this.saver.saveFile(stats, this.concatFilename('comment_ratings'));
            --this.isLoading;
        });
    }

    saveStatsObjectActivity()
    {
        ++this.isLoading;

        this.discussionService.getScientistStatsObjectActivity(this.startDate, this.endDate).then(stats =>
        {
            this.saver.saveFile(stats, this.concatFilename('object_activity'));
            --this.isLoading;
        });
    }

    concatFilename(suf: string): string
    {
        return this.startDate + '_' + this.endDate + '_' + suf + '.csv';
    }
}
