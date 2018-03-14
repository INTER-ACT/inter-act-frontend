import { inject } from 'aurelia-framework';
import { Saver } from '../utils/saver';

@inject(Saver)
export class Download
{
    constructor(saver: Saver)
    {
        this.saver = saver;
    }

    saveStats()
    {
        this.saver.saveFile('lorem', 'stats.csv');
    }
}
