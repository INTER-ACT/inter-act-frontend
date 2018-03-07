import { RouterConfiguration, Router } from 'aurelia-router';

export class Auth
{
    attached()
    {
        switch (this.router.currentInstruction.config.name.valueOf())
        {
        case 'auth-signup':
            this.rdSignup.checked = true;
            break;

        case 'auth-login':
        default:
            this.rdLogin.checked = true;
            break;
        }
    }

    configureRouter(config: RouterConfiguration, router: Router)
    {
        config.options.pushState = true;

        config.map([
            {
                route: ['', 'default', 'login'],
                name: 'auth-login',
                moduleId: './auth/login',
                nav: true,
                title: 'Login'
            },
            {
                route: ['register', 'signup'],
                name: 'auth-signup',
                moduleId: './auth/signup',
                nav: true,
                title: 'Registrierung'
            }
        ]);

        this.router = router;
        this.router.refreshNavigation();
    }

    submitShowLogin()
    {
        this.router.navigateToRoute('auth-login');
    }

    submitShowSignup()
    {
        this.router.navigateToRoute('auth-signup');
    }
}
