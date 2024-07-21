import dotenv from "dotenv";
dotenv.config();

import { actionRegistry } from "./actions";
import { workflowRegistry } from "./workflows";
import { Engine } from "./models";

const workflowEngine = new Engine({
  actions: actionRegistry, // can be imported from a directory ?
  workflows: workflowRegistry, // can be imported from a directory ?
});

import { setupApi } from "./setup";

setupApi({
  engine: workflowEngine,
});
