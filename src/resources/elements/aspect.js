import { bindable } from 'aurelia-framework';

export class AspectCustomElement
{
    @bindable negativCount: number;
    @bindable positivCount: number;
    @bindable negativName: string;
    @bindable positivName: string;
}
