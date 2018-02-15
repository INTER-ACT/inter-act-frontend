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
