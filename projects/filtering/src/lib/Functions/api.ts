import { apiProps } from '../Interfaces/Service_Function_Interfaces';

export const fetchData = async ({
  headers,
  body,
  url,
  method,
  cache,
}: apiProps): Promise<any> => {
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
