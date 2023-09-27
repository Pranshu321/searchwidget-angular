import { Injectable } from '@angular/core';
import { ApiProps } from '../models/serviceFunctionInterfaces';

@Injectable({
  providedIn: 'root',
})
export class apiService {
  constructor() {}
  fetchData = async ({
    headers,
    body,
    url,
    method,
    cache,
  }: ApiProps): Promise<any> => {
    const response = await fetch(url, {
      headers: headers,
      body: body,
      method: method === undefined || method === null ? 'GET' : method,
      cache: cache,
    });
    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    return response.json();
  };
}
