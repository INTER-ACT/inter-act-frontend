import { inject } from 'aurelia-framework';
import { DiscussionService } from '../services/discussion-service';
import { UserService } from '../services/user-service';
import { UsernameService } from '../services/username-service';

@inject(DiscussionService, UserService, UsernameService)
export class Reports
{
    loadingFinished: boolean = false;

    reportedComments = [];
    reportedAmendments = [];

    constructor(discussionService: DiscussionService, userService: UserService, usernameService: UsernameService)
    {
        this.discussionService = discussionService;
        this.userService = userService;
        this.usernameService = usernameService;

        this.userService.redirectIfNotAdmin();
    }

    activate()
    {
        Promise.all([
            this.fetchComments(),
            this.fetchAmendments()
        ]).then(() =>
        {
            this.loadingFinished = true;
        });
    }

    fetchComments()
    {
        return this.discussionService.getReportedComments().then(cs =>
        {
            let pms = [];

            cs.data.reports.forEach(r =>
            {
                let v = {
                    reportID: r.id
                };
                let pr = this.discussionService.getReportByID(r.id).then(rc =>
                {
                    v.reason = rc.description;
                    v.itemID = rc.reported_item.id;
                    v.reportedBy = {
                        id: rc.user.id
                    };

                    return this.usernameService.getUsername(rc.user.id).then(reporterName =>
                    {
                        v.reportedBy.username = reporterName;

                        return this.discussionService.getCommentById(rc.reported_item.id).then(cm =>
                        {
                            v.content = cm.content;
                            v.author = {
                                id: cm.author.id
                            };

                            return this.usernameService.getUsername(cm.author.id).then(authorName =>
                            {
                                v.author.username = authorName;

                                this.reportedComments.push(v);
                            });
                        });
                    });
                });

                pms.push(pr);
            });

            return Promise.all(pms);
        });
    }

    fetchAmendments()
    {
        return this.discussionService.getReportedAmendments().then(ams =>
        {
            let pms = [];

            ams.data.reports.forEach(r =>
            {
                let v = {
                    reportID: r.id
                };
                let pr = this.discussionService.getReportByID(r.id).then(rc =>
                {
                    v.reason = rc.description;
                    v.itemID = rc.reported_item.id;
                    v.reportedBy = {
                        id: rc.user.id
                    };

                    let href: string = rc.reported_item.href;
                    href = href.replace('http://', 'https://');
                    v.href = href;

                    return this.discussionService.bsSrvc.getIntoJSON(
                        href,
                        null,
                        this.discussionService.authService.createHeadersWithAccessToken()
                    ).then(amsi =>
                    {
                        v.changes = amsi.changes;
                        v.explanation = amsi.explanation;
                        v.author = {
                            id: amsi.author.id
                        };

                        return this.usernameService.getUsername(rc.user.id).then(reporterName =>
                        {
                            v.reportedBy.username = reporterName;

                            return this.usernameService.getUsername(amsi.author.id).then(authorName =>
                            {
                                v.author.username = authorName;

                                this.reportedAmendments.push(v);
                            });
                        });
                    });
                });

                pms.push(pr);
            });

            return Promise.all(pms);
        });
    }

    discardReport(reportID: number)
    {
        alert('Dies wird vom Backend leider nicht unterstützt.');
    }

    removeSpam(reportID: number, type: string, itemID: number)
    {
        if (type === 'comment')
        {
            this.discussionService.deleteComment(itemID).then(() =>
            {
                let idx = -1;
                this.reportedComments.forEach(c =>
                {
                    if (c.reportID === reportID)
                    {
                        idx = this.reportedComments.indexOf(c);
                    }
                });

                this.reportedComments.splice(idx, 1);
            });
        }
        else if (type === 'amendment')
        {
            this.discussionService.bsSrvc.delete(itemID, this.discussionService.authService.createHeadersWithAccessToken()).then(() =>
            {
                let idx = -1;
                this.reportedAmendments.forEach(c =>
                {
                    if (c.reportID === reportID)
                    {
                        idx = this.reportedAmendments.indexOf(c);
                    }
                });

                this.reportedAmendments.splice(idx, 1);
            }).catch(error =>
            {
                if (error.status >= 500 && error.status <= 599)
                {
                    alert('Fataler Backend-Error :/');
                    console.log(error);
                    error.text().then(txt => console.log(txt));
                }
                else
                {
                    alert('Unbekannter Fehler: ' + error.status + '\n' + error.statusText);
                }
            });
        }
    }
}
