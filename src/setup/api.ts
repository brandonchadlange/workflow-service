import express, { NextFunction, Request, Response } from "express";
import { IEngine } from "../interfaces";

interface SetupApiProps {
  engine: IEngine;
}

const PORT = process.env.PORT || 3000;

export function setupApi({ engine }: SetupApiProps) {
  const app = express();
  app.use(express.json());

  // WORKFLOWS
  app.get("/workflows", (req, res) => {
    const workflows = engine.workflows.findAll();
    const workflowsAsJson = workflows.map((workflow) => ({
      id: workflow.id,
      steps: workflow.steps.map((step) => ({
        id: step.id,
        actionId: step.actionId,
        config: step.actionConfig,
      })),
      transitions: workflow.transitions.map((transition) => ({
        fromStepId: transition.fromStepId,
        onStatus: transition.actionStatus,
        toStepId: transition.toStepId,
      })),
    }));
    res.send(workflowsAsJson);
  });

  app.get("/workflows/:id", (req, res) => {
    const workflowId = req.params.id;
    const workflow = engine.workflows.findById(workflowId);

    if (workflow === null) {
      res.status(404).send("Workflow not found");
      return;
    }

    const workflowAsJson = {
      id: workflow.id,
    };

    res.send(workflowAsJson);
  });

  // ACTIONS
  app.get("/actions", (req, res) => {
    const actions = engine.actions.findAll();
    const actionsAsJson = actions.map((action) => ({
      id: action.id,
    }));
    res.send(actionsAsJson);
  });

  // EXECUTIONS
  function validateRequestBody(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const body = req.body;

    if (!body.workflowId) {
      res.status(400).send("workflowId is required");
      return;
    }

    next();
  }

  app.post("/executions", validateRequestBody, (req, res) => {
    engine.run("get-drivers", {});
    res.send(true);
  });

  app.listen(PORT, () => {
    console.log(`Api listening at http://localhost:${PORT}`);
  });
}
