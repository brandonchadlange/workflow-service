import { IActionRegistry } from "./action";
import { IWorker } from "./worker";
import { IWorkflowRegistry } from "./workflow";

export interface IEngine {
  actions: IActionRegistry;
  workflows: IWorkflowRegistry;
  worker: IWorker;

  run(workflowId: string, data: any): Promise<void>;
}
