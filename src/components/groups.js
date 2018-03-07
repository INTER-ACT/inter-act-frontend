import { RouterConfiguration, Router } from 'aurelia-router';

export class Groups
{

    attached()
    {
        switch (this.router.currentInstruction.config.name.valueOf())
        {
        case 'groups-paragraphs':
        default:
            this.rdParagraphs.checked = true;
            break;

        case 'groups-tags':
            this.rdTags.checked = true;
            break;
        }
    }

    configureRouter(config: RouterConfiguration, router: Router)
    {
        config.options.pushState = true;

        config.map([
            {
                route: ['', 'default', 'paragraphs'],
                name: 'groups-paragraphs',
                moduleId: './groups/paragraphs',
                nav: true,
                title: 'Paragraphen'
            },
            {
                route: ['categories', 'tags'],
                name: 'groups-tags',
                moduleId: './groups/tags',
                nav: true,
                title: 'Kategorien'
            }
        ]);

        this.router = router;
        this.router.refreshNavigation();
    }

    submitShowParagraphs()
    {
        this.router.navigateToRoute('groups-paragraphs');
    }

    submitShowTags()
    {
        this.router.navigateToRoute('groups-tags');
    }
}
