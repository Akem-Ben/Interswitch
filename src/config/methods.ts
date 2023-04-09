import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';

dotenv.config()

export const makeApiPostRequests = async (httpMethod: string, resourceUrl: string, headers:any, info?: any): Promise<any> => {
const response: AxiosResponse<any> = await axios({
    method: httpMethod,
    url: resourceUrl,
    headers: headers,
    data: info,
  })
return response
}

export const makeApiGetRequests = async (httpMethod: string, resourceUrl: string, headers?: any, params?:any, info?:any) => {
    const response = await axios({
        method: httpMethod,
        url: resourceUrl,
        headers: headers,
        params: params,
        data: info
      })
      return response
}
