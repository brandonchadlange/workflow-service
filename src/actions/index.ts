import { ActionRegistry } from "../registry/action.registry";
import { httpRequestHandler } from "./http-request";

export const actionRegistry = new ActionRegistry();
actionRegistry.add(httpRequestHandler);

export * from "./http-request";
