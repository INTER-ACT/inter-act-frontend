import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

@inject(HttpClient)
export class BaseService
{
    constructor(http)
    {
        this.http = http;
    }

    get(target, requestParams)
    {
        let encodedGetParams = (requestParams) ? $.param(requestParams) : '';

        return this.http.fetch(
            target + '?' + encodedGetParams,
            {
                method: 'get'
            }
        );
    }

    getJSON(target, requestParams)
    {
        return get(target, requestParams).then(response => response.json());
    }
}
