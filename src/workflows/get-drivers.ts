import { Workflow } from "../models";

export const getDrivers = new Workflow("get-drivers");

const fetchDriverFromApi = getDrivers.addStep({
  id: "fetch-drivers-from-api",
  actionId: "http-request",
  nextStepId: "transform-driver-response",
  actionConfig: {
    method: "GET",
    url: "https://api.openf1.org/v1/drivers?driver_number=1&session_key=9158",
  },
});

const transformDriver = getDrivers.addStep({
  id: "transform-driver-response",
  actionId: "transform",
  actionConfig: {
    transformer: "driver",
  },
});

getDrivers.addTransition({
  toStepId: fetchDriverFromApi.id,
});

fetchDriverFromApi.on("success", transformDriver.id);
fetchDriverFromApi.on("error", null);

transformDriver.on("success", null);
transformDriver.on("error", null);
