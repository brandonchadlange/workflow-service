import { Workflow } from "../models";

export const getDrivers = new Workflow("get-drivers");

getDrivers.addStep({
  id: "fetch-drivers-from-api",
  actionId: "http-request",
});

getDrivers.addStep({
  id: "transform-driver-response",
  actionId: "http-request",
});
