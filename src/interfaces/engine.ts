import { IActionRegistry } from "./action";
import { IWorkflowRegistry } from "./workflow";

export interface IEngine {
  actions: IActionRegistry;
  workflows: IWorkflowRegistry;
}
