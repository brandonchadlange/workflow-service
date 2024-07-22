import { ICollection } from "./collection";

export interface IAction<Input = any> {
  id: string;
  handle(input: Input): Promise<IActionResponse>;
}

export interface IActionResponse<Status = any, Data = any> {
  status: Status;
  data: Data;
}

export interface IActionRegistry extends ICollection<IAction> {}
