export class Saver
{
    saveFile(data: string, filename: string)
    {
        let blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, filename);
    }
}
