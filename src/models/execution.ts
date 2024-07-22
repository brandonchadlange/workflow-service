import { randomUUID } from "crypto";
import { IExecution, IWorkflow } from "../interfaces";

interface ExecutionProps {
  workflow: IWorkflow;
}

// execution should be responsible for getting/setting state

export class Execution implements IExecution {
  private _id: string;
  private _workflowId: string;
  private _currentStepId: string;
  private _state = {
    workflow: {},
    actions: {},
  };

  constructor(props: ExecutionProps) {
    this._id = randomUUID();
    this._workflowId = props.workflow.id;
  }

  get id() {
    return `${this._workflowId}-${this._id}`;
  }

  get workflowId() {
    return this._workflowId;
  }

  get currentStepId() {
    return this._currentStepId;
  }

  setCurrentStepId(stepId: string) {
    this._currentStepId = stepId;
  }
}
