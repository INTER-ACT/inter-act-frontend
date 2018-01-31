export class Example
{
    constructor()
    {
        // Simple variable
        this.someText = 'asdf';

        // Array
        this.someElements = [
            '1234',
            '5678',
            'abcd'
        ];

        // Input Value
        this.someInputTextDefaultValue = 'default';
        this.someInputText = this.someInputTextDefaultValue;


        // Interval
        let _this = this; // 'this' would be undefined inside the interval function
        window.setInterval(function()
        {
            if (_this.someInputText !== _this.someInputTextDefaultValue)
            {
                alert(_this.someInputText);
                _this.someInputText = _this.someInputTextDefaultValue;
            }
        }, 2000);
    }
}
