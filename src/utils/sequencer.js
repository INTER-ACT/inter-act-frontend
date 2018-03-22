export class Sequencer
{
    _counter = 0;
    _init = 0;
    _step = 1;

    current()
    {
        return this._counter;
    }

    next()
    {
        return (this._counter += this._step);
    }

    previous()
    {
        return (this._counter - step);
    }

    reset()
    {
        this._counter = this._init;
    }
}
