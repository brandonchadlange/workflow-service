import { IAction } from "../interfaces";

export abstract class Action<Input, Output> implements IAction {
  abstract id: string;
  abstract handle: (input: Input) => Promise<Output>;
}
