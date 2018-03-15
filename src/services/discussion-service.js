import { inject } from 'aurelia-framework';
import { BaseService } from './base-service';
import { AuthService } from './auth-service';

@inject(BaseService, AuthService)
export class DiscussionService
{
    _tags: Array = [];

    constructor(bsSrvc: BaseService, authService: AuthService)
    {
        this.bsSrvc = bsSrvc;
        this.authService = authService;
        this._fetchAndStoreAllTags().catch(error =>
        {
            alert('Schwerer Fehler :(\nTags konnten nicht geladen werden.\n\nDetails: siehe Console'); // eslint-disable-line no-alert
            console.log(error); // eslint-disable-line no-console
        });
    }

    getDiscussionById(id: number)
    {
        return this.bsSrvc.getIntoJSON('discussions/' + id);
    }

    getDiscussions()
    {
        return this.bsSrvc.getIntoJSON('discussions', { start: 0, count: 100 });
    }

    getAmendmentById(discussionID: number, amendmentID: number)
    {
        return this.bsSrvc.getIntoJSON('discussions/' + discussionID + '/amendments/' + amendmentID);
    }

    getAmendmentsByDiscussion(discussionID: number)
    {
        return this.bsSrvc.getIntoJSON('discussions/' + discussionID + '/amendments');
    }

    getAllTags(): Promise
    {
        return (this._tags.length > 0) ?
            Promise.resolve().then(() =>
            {
                return this._tags;
            }) :
            this._fetchAndStoreAllTags();
    }

    _fetchAllTags()
    {
        return this.bsSrvc.getIntoJSON('tags');
    }

    _fetchAndStoreAllTags()
    {
        return this._fetchAllTags().then(tags =>
        {
            this._tags = tags.tags;
            return this._tags;
        });
    }

    getCommentReplies(commentID: number)
    {
        return this.bsSrvc.getIntoJSON('comments/' + commentID + '/comments');
    }

    getCommentsByDiscussion(discussionID: number)
    {
        return this.bsSrvc.getIntoJSON('discussions/' + discussionID + '/comments');
    }

    getCommentById(id: number)
    {
        return this.bsSrvc.getIntoJSON('comments/' + id);
    }

    replyToComment(commentID: number, reply: string)
    {
        return this.bsSrvc.postIntoJSON('comments/' + commentID + '/comments', { content: reply, tags: [1] }, this.authService.createHeadersWithAccessToken());
    }

    commentDiscussion(discussionID: number, reply: string)
    {
        return this.bsSrvc.postIntoJSON('discussions/' + discussionID + '/comments', { content: reply, tags: [1] }, this.authService.createHeadersWithAccessToken());
    }

    createDiscussion(lawTitle: string, lawNumber: string, lawText: string, explanation: string, tags: Array)
    {
        return this.bsSrvc.post(
            'discussions',
            {
                title: lawTitle,
                law_number: lawNumber,
                law_text: lawText,
                law_explanation: explanation,
                tags: tags
            }, this.authService.createHeadersWithAccessToken());
    }

    replyToAmendment(amendmentID: number, replyStatement: string, replyLaw: string)
    {
        return this.bsSrvc.postIntoJSON('discussions/' + amendmentID + '/amendments/', { explanation: replyStatement, updated_text: replyLaw, tags: [1] }, this.authService.createHeadersWithAccessToken());
    }

    getLawTexts()
    {
        return this.bsSrvc.getIntoJSON('law_texts', null, this.authService.createHeadersWithAccessToken());
    }

    getLawTextByID(id: string)
    {
        return this.bsSrvc.getIntoJSON('law_texts/' + id, null, this.authService.createHeadersWithAccessToken());
    }

    getRelevantDiscussions(userID: number)
    {
        return this.bsSrvc.getIntoJSON('users/' + userID + '/relevant', null, this.authService.createHeadersWithAccessToken());
    }

    getReportedComments()
    {
        return this.bsSrvc.getIntoJSON('reports', { type: 'comments' }, this.authService.createHeadersWithAccessToken());
    }

    getReportedAmendments()
    {
        return this.bsSrvc.getIntoJSON('reports', { type: 'amendments' }, this.authService.createHeadersWithAccessToken());
    }

    getReportedSubamendments()
    {
        return this.bsSrvc.getIntoJSON('reports', { type: 'subamendments' }, this.authService.createHeadersWithAccessToken());
    }

    getReportByID(reportID: number)
    {
        return this.bsSrvc.getIntoJSON('reports/' + reportID, null, this.authService.createHeadersWithAccessToken());
    }

    _getScientistStats(uri: string, begin: string, end: string)
    {
        return this.bsSrvc.get(uri, { begin: begin, end: end }, this.authService.createHeadersWithAccessToken()).then(response =>
        {
            return response.text();
        });
    }

    getScientistStatsOverall(begin: string, end: string)
    {
        return this._getScientistStats('statistics', begin, end);
    }

    getScientistStatsUserActivity(begin: string, end: string)
    {
        return this._getScientistStats('statistics/user_activity', begin, end);
    }

    getScientistStatsRatings(begin: string, end: string)
    {
        return this._getScientistStats('statistics/ratings', begin, end);
    }

    getScientistStatsCommentRatings(begin: string, end: string)
    {
        return this._getScientistStats('statistics/comment_ratings', begin, end);
    }

    getScientistStatsObjectActivity(begin: string, end: string)
    {
        return this._getScientistStats('statistics/object_activity', begin, end);
    }

    _searchFor(term: string, type: string)
    {
        return this.bsSrvc.getIntoJSON(
            'search',
            {
                search_term: term,
                content_type: type
            });
    }

    searchForDiscussions(term: string)
    {
        return this._searchFor(term, 'discussions', );
    }

    getDiscussionsByTagID(tagID: number)
    {
        return this.bsSrvc.getIntoJSON('discussions', { tag_id: tagID });
    }
}
