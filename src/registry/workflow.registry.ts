import { IWorkflow, IWorkflowRegistry } from "../interfaces";

export class WorkflowRegistry implements IWorkflowRegistry {
  private _store = new Map<string, IWorkflow>();

  add(workflow: IWorkflow) {
    this._store.set(workflow.id, workflow);
  }

  findAll(): IWorkflow[] {
    const workflows = Array.from(this._store.values());
    return workflows;
  }

  findById(id: string): IWorkflow | null {
    if (!this._store.has(id)) {
      return null;
    }

    return this._store.get(id);
  }
}

export const workflowRegistry = new WorkflowRegistry();
