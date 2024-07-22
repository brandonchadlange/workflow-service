import { Queue, Worker, WorkerOptions } from "bullmq";
import {
  IActionRegistry,
  IWorker,
  IWorkerData,
  IWorkflowRegistry,
} from "../interfaces";
import { randomUUID } from "crypto";

interface InitialiseWorkerProps {
  workflows: IWorkflowRegistry;
  actions: IActionRegistry;
}

const QUEUE_NAME = process.env.WORKER_QUEUE_NAME;

const options: WorkerOptions = {
  connection: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT as string),
  },
};

export function initialiseWorker({
  actions,
  workflows,
}: InitialiseWorkerProps): IWorker {
  const queue = new Queue(QUEUE_NAME, options);

  async function addJob(name: string, data: IWorkerData) {
    await queue.add("job_id", data);
  }

  async function handleWorkerEvent(data: IWorkerData) {
    const workflow = workflows.findById(data.workflowId);
    const step = workflow.steps.findById(data.stepId);
    const action = actions.findById(step.actionId);
    const actionResponse = await action.handle(step.actionConfig);
    // transform response based on step config

    const transition = workflow.transitions.find(
      (transition) =>
        transition.fromStepId === step.id &&
        transition.actionStatus === actionResponse.status
    ); // TODO: convert steps to a list element

    if (transition.toStepId === undefined) {
      console.log("workflow complete");
      return;
    }

    const nextStep = workflow.steps.findById(transition.toStepId);

    // transform state based on step config

    const jobId = `${nextStep.id}-${randomUUID()}`;
    await addJob(jobId, nextStep.actionConfig);
  }

  new Worker<IWorkerData>(
    QUEUE_NAME,
    async (job) => {
      await handleWorkerEvent(job.data);
    },
    options
  );

  return {
    addJob,
  };
}
