import { IEngine, IActionRegistry, IWorkflowRegistry } from "../interfaces";

interface EngineProps {
  actions: IActionRegistry;
  workflows: IWorkflowRegistry;
}

export class Engine implements IEngine {
  actions: IActionRegistry;
  workflows: IWorkflowRegistry;

  constructor(props: EngineProps) {
    this.actions = props.actions;
    this.workflows = props.workflows;
  }
}
