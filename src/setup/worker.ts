import { Queue, Worker, WorkerOptions } from "bullmq";
import { IWorker, IWorkerData } from "../interfaces";

interface InitialiseWorkerProps {}

const QUEUE_NAME = process.env.WORKER_QUEUE_NAME;

const options: WorkerOptions = {
  connection: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT as string),
  },
};

async function handleWorkerEvent(data: IWorkerData) {
  console.log("Running Job", data);
}

export function initialiseWorker(props?: InitialiseWorkerProps): IWorker {
  const queue = new Queue(QUEUE_NAME, options);

  new Worker<IWorkerData>(
    QUEUE_NAME,
    async (job) => {
      await handleWorkerEvent(job.data);
    },
    options
  );

  return {
    async addJob(name: string, data: IWorkerData) {
      await queue.add("job_id", data);
    },
  };
}
