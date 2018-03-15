import { inject } from 'aurelia-framework';
import { UserService } from '../services/user-service';

@inject(UserService)
export class User
{
    notFound = false;
    isReady = false;

    id: number;
    userData: object;

    statistics: object = {
        comments: -1,
        amendments: -1
    };

    constructor(userService: UserService)
    {
        this.userService = userService;
    }

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
        this.fetchUserInfo();
    }

    fetchUserInfo()
    {
        this.userService.getUserInfoByID(this.id).then(userInfo =>
        {
            this.userData = userInfo;
            this.fetchUserStats().then(() => this.isReady = true);
        }).catch(error =>
        {
            if (error.status === 404)
            {
                this.notFound = true;
                this.isReady = true;
            }
            else
            {
                alert('Fataler Error.');
                console.log(error);
            }
        });
    }

    fetchUserStats()
    {
        return Promise.all([
            this.userService.getCountCommentsByUser(this.id).then(count => this.statistics.comments = count),
            this.userService.getCountAmendmentsByUser(this.id).then(count => this.statistics.amendments = count)
        ]);
    }

    startReport()
    {
        alert('Benutzer können nicht gemeldet werden.\nBei Bedarf kontaktieren Sie bitte den Betreiber.');
    }
}
