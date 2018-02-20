import environment from './environment';
import { HttpClient } from 'aurelia-fetch-client';

export function configure(aurelia)
{
    aurelia.use
        .standardConfiguration()
        .feature('resources');

    if (environment.debug)
    {
        aurelia.use.developmentLogging();
    }

    if (environment.testing)
    {
        aurelia.use.plugin('aurelia-testing');
    }

    let container = aurelia.container;

    let http = new HttpClient();
    http.configure(config =>
    {
        config
            .useStandardConfiguration()
            .withBaseUrl('https://api.inter-act.net/');
    });
    container.registerInstance(HttpClient, http);

    aurelia.start().then(() =>
    {
        aurelia.setRoot();
    });
}
