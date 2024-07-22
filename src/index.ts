import dotenv from "dotenv";
dotenv.config();

import { actionRegistry } from "./actions";
import { workflowRegistry } from "./workflows";
import { initialiseWorker, setupApi } from "./setup";

const worker = initialiseWorker({
  actions: actionRegistry,
  workflows: workflowRegistry,
});

setupApi({
  actions: actionRegistry,
  workflows: workflowRegistry,
  worker,
});
