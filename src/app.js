import { RouterConfiguration, Router } from 'aurelia-router';

export class App
{
    constructor()
    {}

    attached()
    {
        $(document).foundation();
    }

    configureRouter(config: RouterConfiguration, router: Router)
    {
        config.title = 'INTER!ACT';
        config.options.pushState = true;

        config.map([
            {
                route: ['home', 'default', 'index', ''],
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
                route: ['auth'],
                name: 'auth',
                moduleId: './components/auth',
                nav: true
            },
            {
                route: 'groups',
                name: 'groups',
                moduleId: './components/groups',
                nav: true
            },
            {
                route: ['tags', 'categories'],
                name: 'tags',
                moduleId: './components/tag',
                nav: true,
                title: 'Kategorien'
            },
            {
                route: 'discussion/:id',
                name: 'discussion',
                moduleId: './components/discussion',
                nav: true,
                href: '#discussion',
                title: 'Diskussion'
            },
            {
                route: 'dashboard',
                name: 'dashboard',
                moduleId: './components/changeView',
                nav: true,
                href: 'Dashboard'
            },
            {
                route: 'user/:id',
                name: 'user',
                moduleId: './components/user',
                nav: true,
                href: '#user'
            },
            {
                route: 'settings',
                name: 'settings',
                moduleId: './components/settings',
                nav: true,
                title: 'Einstellungen'
            },
            {
                route: ['startscreen', 'start'],
                name: 'startscreen',
                moduleId: './components/startscreen',
                nav: true,
                title: 'Startseite'
            },
            {
                route: ['terms-of-service', 'tos'],
                name: 'terms-of-service',
                moduleId: './components/terms-of-service',
                nav: true,
                title: 'Nutzungsbedingungen'
            },
            {
                route: 'imprint',
                name: 'imprint',
                moduleId: './components/imprint',
                nav: true,
                title: 'Impressum'
            },
            {
                route: 'elevate',
                name: 'elevate',
                moduleId: './components/elevate',
                nav: true,
                title: 'Rechteverwaltung'
            },


            {
                route: 'create',
                name: 'create',
                moduleId: './components/createDiscussion',
                nav: true,
                title: 'Erstellen'
            },
            {
                route: ['comment', 'com'],
                name: 'comment',
                moduleId: './components/comment',
                nav: true,
                title: 'Kommentar'
            },
            {
                route: ['amendment'],
                name: 'amendment',
                moduleId: './components/amendment',
                nav: true,
                title: 'Änderungsvorschlag'
            },
            {
                route: ['guide', 'manual', 'help'],
                name: 'guide',
                moduleId: './components/guide',
                nav: true,
                title: 'Hilfe'
            },
            {
                route: ['ams'],
                name: 'ams',
                moduleId: './components/ams',
                nav: true,
                title: 'Änderungsvorschlag'
            },
            {
                route: ['download'],
                name: 'download',
                moduleId: './components/download',
                nav: true,
                title: 'Download'
            },
            {
                route: 'privacy',
                name: 'privacy',
                moduleId: './components/privacy',
                nav: true,
                title: 'Datenschutz-Download'
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
