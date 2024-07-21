import express from "express";
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
    }));
    res.send(workflowsAsJson);
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
  app.get("/executions", (req, res) => {});

  app.listen(PORT, () => {
    console.log(`Api listening at http://localhost:${PORT}`);
  });
}
