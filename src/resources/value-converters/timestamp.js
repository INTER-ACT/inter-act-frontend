export class TimestampValueConverter
{
    toView(value)
    {
        let v = value.split('T');
        let t = v[1].split('+');
        let d = t[0].split(':');
        return v[0] + ' - ' + d[0] + ':' + d[1];
    }
}
