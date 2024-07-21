export interface IWorkflow {
  id: string;
  addStep(props: AddStepProps): IWorkflowStep;
}

export interface IWorkflowStep {
  id: string;
}

export interface AddStepProps {
  id: string;
  actionId: string;
  actionConfig?: any;
}

export interface IWorkflowRegistry {
  add(action: IWorkflow);
  findAll(): IWorkflow[];
  findById(id: string): IWorkflow | null;
}
