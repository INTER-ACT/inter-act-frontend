import { inject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(HttpClient)
export class BaseService
{
    constructor(http: HttpClient)
    {
        this.http = http;
    }

    delete(target: string, headers: object = {})
    {
        return this.http.fetch(
            target,
            {
                method: 'DELETE',
                headers: headers
            }
        );
    }

    deleteIntoJSON(target: string, headers: object = {})
    {
        return this.delete(target, headers).then(response => response.json());
    }

    get(target: string, getParams: object, headers: object = {})
    {
        let targetWithParams = (getParams) ? target + '?' + $.param(getParams) : target;

        return this.http.fetch(
            targetWithParams,
            {
                headers: headers,
                method: 'GET'
            }
        );
    }

    getIntoJSON(target: string, getParams: object, headers: object = {})
    {
        return this.get(target, getParams, headers).then(response => response.json());
    }

    patch(target: string, requestBody: object, headers: object = {})
    {
        return this.sendBodyAsJSON(target, requestBody, 'PATCH', headers);
    }

    patchIntoJSON(target: string, requestBody: object, headers: object = {})
    {
        return this.patch(target, requestBody, headers).then(response => response.json());
    }

    post(target: string, requestBody: object, headers: object = {})
    {
        return this.sendBodyAsJSON(target, requestBody, 'POST', headers);
    }

    postFormData(target: string, requestFormData: FormData)
    {
        return this.sendBodyFormData(target, requestFormData, 'POST');
    }

    postFormDataIntoJSON(target: string, requestFormData: FormData)
    {
        return this.postFormData(target, requestFormData).then(response => response.json());
    }

    postIntoJSON(target: string, requestBody: object, headers: object = {})
    {
        return this.post(target, requestBody, headers).then(response => response.json());
    }

    put(target: string, requestBody: object, headers: object = {})
    {
        return this.sendBodyAsJSON(target, requestBody, 'PUT', headers);
    }

    putIntoJSON(target: string, requestBody: object, headers: object = {})
    {
        return this.put(target, requestBody, headers).then(response => response.json());
    }

    sendBodyAsJSON(target: string, requestBody: object, httpMethod: string, headers: object = {})
    {
        return this.http.fetch(
            target,
            {
                headers: headers,
                method: httpMethod,
                body: json(requestBody)
            }
        );
    }

    sendBodyFormData(target: string, requestBody: FormData, httpMethod: string)
    {
        return this.http.fetch(
            target,
            {
                method: httpMethod,
                body: requestBody
            }
        );
    }
}
