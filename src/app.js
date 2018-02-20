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
                route: ['home', ''],
                name: 'home',
                moduleId: './components/home',
                nav: true
            },
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
                route: ['auth', 'login'],
                name: 'login',
                moduleId: './components/login',
                nav: true,
                title: 'Login'
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
