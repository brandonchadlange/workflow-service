export interface IAction<Input = any, Output = any> {
  id: string;
  handle: (input: Input) => Promise<Output>;
}

export interface IActionRegistry {
  add(action: IAction);
  findAll(): IAction[];
}
