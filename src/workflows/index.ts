import { WorkflowRegistry } from "../registry/workflow.registry";
import { getDrivers } from "./get-drivers";

export const workflowRegistry = new WorkflowRegistry();
workflowRegistry.add(getDrivers);
