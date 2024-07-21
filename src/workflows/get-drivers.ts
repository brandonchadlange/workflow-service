import { Workflow } from "../models";

class GetDriversWorkflow implements Workflow {
  id: string = "get-drivers";
}

export const getDrivers = new GetDriversWorkflow();
