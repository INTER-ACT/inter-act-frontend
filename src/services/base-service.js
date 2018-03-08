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
                method: 'delete',
                headers: headers
            }
        );
    }

    deleteIntoJSON(target: string, headers: object = {})
    {
        return this.delete(target, headers).then(response => response.json());
    }

    get(target: string, getParams: object)
    {
        let targetWithParams = (getParams) ? target + '?' + $.param(getParams) : target;

        return this.http.fetch(
            targetWithParams,
            {
                method: 'get'
            }
        );
    }

    getIntoJSON(target: string, getParams: object)
    {
        return this.get(target, getParams).then(response => response.json());
    }

    patch(target: string, requestBody: object)
    {
        return this.sendBodyAsJSON(target, requestBody, 'patch');
    }

    patchIntoJSON(target: string, requestBody: object)
    {
        return this.patch(target, requestBody).then(response => response.json());
    }

    post(target: string, requestBody: object)
    {
        return this.sendBodyAsJSON(target, requestBody, 'post');
    }

    postFormData(target: string, requestFormData: FormData)
    {
        return this.sendBodyFormData(target, requestFormData, 'POST');
    }

    postFormDataIntoJSON(target: string, requestFormData: FormData)
    {
        return this.postFormData(target, requestFormData).then(response => response.json());
    }

    postIntoJSON(target: string, requestBody: object)
    {
        return this.post(target, requestBody).then(response => response.json());
    }

    put(target: string, requestBody: object)
    {
        return this.sendBodyAsJSON(target, requestBody, 'put');
    }

    putIntoJSON(target: string, requestBody: object)
    {
        return this.put(target, requestBody).then(response => response.json());
    }

    sendBodyAsJSON(target: string, requestBody: object, httpMethod: string)
    {
        return this.http.fetch(
            target,
            {
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
