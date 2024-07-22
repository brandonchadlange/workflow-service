export interface IWorker {
  addJob(name: string, data: IWorkerData): Promise<void>;
}

export interface IWorkerData {
  workflowId: string;
  stepId: string;
  state: any;
}
