export interface IWorker {
  addJob(name: string, data: IWorkerData): Promise<void>;
}

export interface IWorkerData {
  executionId: string;
  workflowId: string;
  state: any;
}
