import { AddStepProps, IWorkflow, IWorkflowStep } from "../interfaces";

export class Workflow implements IWorkflow {
  private _id: string;

  constructor(id: string) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  addStep(props: AddStepProps): IWorkflowStep {
    return {
      id: props.id,
    };
  }
}
