export interface IAction<Input = any, Output = any> {
  id: string;
  handle: (input: Input) => Promise<Output>;
}
