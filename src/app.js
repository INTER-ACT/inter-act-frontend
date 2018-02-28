export class App
{
    constructor()
    {
    }

    attached()
    {
        $(document).foundation();
    }

    configureRouter(config, router)
    {
        config.title = 'INTER!ACT';
        config.options.pushState = true;

        config.map([
            {
                route: ['demo', 'example'],
                name: 'demo',
                moduleId: './components/example',
                nav: true,
                title: 'Demo Page'
            },
            {
                route: ['discussions', 'paragraphs'],
                name: 'discussions',
                moduleId: './components/paragraph',
                nav: true,
                title: 'Diskussionen'
            },
            {
                route: ['tags', 'categories'],
                name: 'tags',
                moduleId: './components/tag',
                nav: true,
                title: 'Kategorien'
            },
            {
                route: ['discussion', 'discuss'],
                name: 'discussion',
                moduleId: './components/discussion',
                nav: true,
                title: 'Diskussion'
            },
            {
                route: ['startscreen', 'start'],
                name: 'startscreen',
                moduleId: './components/startscreen',
                nav: true,
                title: 'Startseite'
            },
            {
                route: ['agb', 'agbs'],
                name: 'agb',
                moduleId: './components/agb',
                nav: true,
                title: 'AGB'
            },
            {
                route: ['impressum', 'imp'],
                name: 'impressum',
                moduleId: './components/impressum',
                nav: true,
                title: 'Impressum'
            },
            {
                route: ['createDiscussion', 'create'],
                name: 'createDiscussion',
                moduleId: './components/createDiscussion',
                nav: true,
                title: 'Erstellen'
            }
        ]);

        const handleUnknownRoutes = (instruction) =>
        {
            return {
                route: 'not-found',
                moduleId: './components/not-found',
                title: 'Page not found'
            };
        };
        config.mapUnknownRoutes(handleUnknownRoutes);

        this.router = router;
    }
}
