import { bindable } from 'aurelia-framework';
import { Author } from '../../models/author';

export class CommentCustomElement
{
    @bindable author: Author;
    @bindable content: string;

    hasCommentateBoxOpen: boolean = false;

    commentateBegin()
    {
        this.hasCommentateBoxOpen = true;
    }

    report()
    {
        alert('not implemented yet');
    }
}
