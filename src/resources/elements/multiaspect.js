import { bindable } from 'aurelia-framework';

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

    sync()
    {
        alert(this.selectedG1 + ' ' + this.selectedG2);
    }
}
