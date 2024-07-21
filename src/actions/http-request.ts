import { Action } from "../models";

import axios from "axios";

const id = "http-request";

interface HttpRequestInput {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
}

export interface RegisterHttpRequestAction {
  id: typeof id;
  data: HttpRequestInput;
}

interface HttpActionResponse {
  status: number;
  data: any;
}

export class HttpRequestHandler
  implements Action<HttpRequestInput, HttpActionResponse>
{
  get id() {
    return id;
  }

  async handle(data: HttpRequestInput) {
    const httpResponse = await axios.request({
      method: data.method,
      url: data.url,
    });

    return {
      status: httpResponse.status,
      data: httpResponse.data,
    };
  }
}

new HttpRequestHandler();
