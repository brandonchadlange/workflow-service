import dotenv from "dotenv";
dotenv.config();

import { actionRegistry } from "./actions";
import { workflowRegistry } from "./workflows";
import { Engine } from "./models";
import { initialiseWorker, setupApi } from "./setup";

const worker = initialiseWorker();

const engine = new Engine({
  actions: actionRegistry, // can be imported from a directory ?
  workflows: workflowRegistry, // can be imported from a directory ?
  worker,
});

setupApi({
  engine,
});
