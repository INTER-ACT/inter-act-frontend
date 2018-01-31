export class App
{
    constructor()
    {
    }

    configureRouter(config, router)
    {
        config.title = 'HTL Krems';
        config.options.pushState = false;

        config.map([
            {
                route: ['demo'],
                name: 'demo',
                moduleId: './components/demo',
                nav: true,
                title: 'Demo Page'
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
