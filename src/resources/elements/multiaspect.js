import { bindable } from 'aurelia-framework';

export class MultiaspectCustomElement
{
    aspects = [];


    /**
     * discussionID
     */
    @bindable discussion: number;
}
