import { bindable } from 'aurelia-framework';
import { Author } from '../../models/author';

export class CommentCustomElement
{
    @bindable author: Author;
    @bindable content: string;

    commentateBegin()
    {
        alert('not implemented yet');
    }

    report()
    {
        alert('not implemented yet');
    }
}
