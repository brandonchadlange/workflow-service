export interface IWorkflow {
  id: string;
  steps: IWorkflowStep[];
  transitions: IWorkflowTransition[];
  getInitialStep(): IWorkflowStep;
}

export interface IWorkflowStep {
  id: string;
  actionId: string;
  nextStepId?: string;
  actionConfig?: any;
}

export interface IWorkflowTransition {
  fromStepId?: string;
  actionStatus?: string;
  toStepId?: string;
}

export interface AddStepProps {
  id: string;
  actionId: string;
  nextStepId?: string;
  actionConfig?: any;
}

export interface IWorkflowRegistry {
  add(action: IWorkflow);
  findAll(): IWorkflow[];
  findById(id: string): IWorkflow | null;
}
