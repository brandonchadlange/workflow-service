import { IAction, IActionResponse } from "../interfaces";
import axios from "axios";

const ACTION_ID = "http-request";
interface HttpRequestInput {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
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
  id = ACTION_ID;

  async handle(data: HttpRequestInput): Promise<HttpResponse> {
    try {
      const httpResponse = await axios.request({
        method: data.method,
        url: data.url,
      });

      console.log("HTTP SUCCESS");

      return {
        status: "success",
        data: {
          status: httpResponse.status,
          data: httpResponse.data,
        },
      };
    } catch (err) {
      console.log("HTTP ERROR");

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
