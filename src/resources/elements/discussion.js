import { bindable } from 'aurelia-framework';

export class DiscussionCustomElement
{
    @bindable rdata: object;
    @bindable comments: Array;

    /**
     * DiscussionID
     */
    @bindable resourceid = '';
}
