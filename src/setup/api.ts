import express, { NextFunction, Request, Response } from "express";
import { IActionRegistry, IWorker, IWorkflowRegistry } from "../interfaces";

interface SetupApiProps {
  actions: IActionRegistry;
  workflows: IWorkflowRegistry;
  worker: IWorker;
}

const PORT = process.env.PORT || 3000;

export function setupApi(props: SetupApiProps) {
  const app = express();
  app.use(express.json());

  // WORKFLOWS
  app.get("/workflows", (req, res) => {
    const workflows = props.workflows.findAll();

    const workflowsAsJson = workflows.map((workflow) => ({
      id: workflow.id,
      steps: workflow.steps.findAll().map((step) => ({
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
    const workflow = props.workflows.findById(workflowId);

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
    const actions = props.actions.findAll();
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
    // const workflow = this.workflows.findById(workflowId);
    // const initialStep = workflow.getInitialStep();
    // const jobId = `${initialStep.id}-${randomUUID()}`;

    // const execution = new Execution({
    //   workflow,
    // });

    // execution.setCurrentStepId(initialStep.id);

    // await this.worker.addJob(jobId, {
    //   workflowId,
    //   stepId: initialStep.id,
    //   state: data,
    // });
    res.send(true);
  });

  app.listen(PORT, () => {
    console.log(`Api listening at http://localhost:${PORT}`);
  });
}
