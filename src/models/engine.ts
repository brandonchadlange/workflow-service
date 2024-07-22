import {
  IEngine,
  IActionRegistry,
  IWorkflowRegistry,
  IWorker,
} from "../interfaces";
import { Execution } from "./execution";

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

    const execution = new Execution({
      workflow: workflow,
    });

    const job = execution.getNextJob();

    await this.worker.addJob(execution.id, {
      executionId: execution.id,
      state: data,
      workflowId,
    });
  }
}
