export class SortValueConverter
{
    toView(array, property, direction)
    {
        /* eslint-disable */
        if (!array)
            return array;
        let pname = property;
        let factor = direction.match(/^desc*/i) ? 1 : -1;
        var retvalue = array.sort((a, b) =>
        {
            if (!(a[property] && b[property]))
            {
                console.log('Sort error:');
                console.log(a);
                console.log(b);
                return 0;
            }

            var textA = a[property].toUpperCase ? a[property].toUpperCase() : a[property];
            var textB = b[property].toUpperCase ? b[property].toUpperCase() : b[property];
            return (textA < textB) ? factor : (textA > textB) ? -factor : 0;
        });
        return retvalue;
        /* eslint-enable */
    }
}
