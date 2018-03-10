export class User
{
    notFound = false;
    isReady = false;
    id;

    activate(args: object)
    {
        let id = Number.parseInt(args.id, 10);

        if (Number.isNaN(id) || id < 0)
        {
            this.id = args.id;
            this.notFound = true;
            this.isReady = true;
            return;
        }

        this.id = id;
        this.isReady = true;
    }
}
