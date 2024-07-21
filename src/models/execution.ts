import { randomUUID } from "crypto";
import { IExecution, IWorkflow } from "../interfaces";

interface ExecutionProps {
  workflow: IWorkflow;
}

export class Execution implements IExecution {
  private _id: string;

  constructor(props: ExecutionProps) {
    this._id = `${props.workflow.id}-${randomUUID()}`;
  }

  get id() {
    return this._id;
  }
}
