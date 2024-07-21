export interface IWorkflow {
  id: string;
}

export interface IWorkflowRegistry {
  add(action: IWorkflow);
  findAll(): IWorkflow[];
}
