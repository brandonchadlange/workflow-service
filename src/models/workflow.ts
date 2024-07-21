import { IWorkflow } from "../interfaces";

export abstract class Workflow implements IWorkflow {
  abstract id: string;
}
