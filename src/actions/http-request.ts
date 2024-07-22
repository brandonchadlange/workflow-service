import { IAction, IActionResponse } from "../interfaces";
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

interface HttpSuccessResponse {
  status: number;
  data: any;
}

interface HttpErrorResponse {
  message: any;
}

type SuccessResponse = IActionResponse<"success", HttpSuccessResponse>;
type ErrorResponse = IActionResponse<"error", HttpErrorResponse>;

type HttpResponse = SuccessResponse | ErrorResponse;

class HttpRequestHandler implements IAction<HttpRequestInput> {
  get id() {
    return id;
  }

  async handle(data: HttpRequestInput): Promise<HttpResponse> {
    try {
      const httpResponse = await axios.request({
        method: data.method,
        url: data.url,
      });

      return {
        status: "success",
        data: {
          status: httpResponse.status,
          data: httpResponse.data,
        },
      };
    } catch (err) {
      return {
        status: "error",
        data: {
          message: err.message,
        },
      };
    }
  }
}

export const httpRequestHandler = new HttpRequestHandler();
