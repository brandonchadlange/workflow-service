import {
  IEngine,
  IActionRegistry,
  IWorkflowRegistry,
  IWorker,
} from "../interfaces";

interface EngineProps {
  actions: IActionRegistry;
  workflows: IWorkflowRegistry;
  worker: IWorker;
}

export class Engine implements IEngine {
  actions: IActionRegistry;
  workflows: IWorkflowRegistry;
  worker: IWorker;

  constructor(props: EngineProps) {
    this.actions = props.actions;
    this.workflows = props.workflows;
    this.worker = props.worker;
  }

  async run(workflowId: string, data: any) {
    const workflow = this.workflows.findById(workflowId);
    // get first step
    console.log("Running Workflow!!!", workflow.id);
  }
}
