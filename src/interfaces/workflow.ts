import { ICollection } from "./collection";

export interface IWorkflow {
  id: string;
  steps: ICollection<IWorkflowStep>;
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

export interface IWorkflowRegistry extends ICollection<IWorkflow> {}
