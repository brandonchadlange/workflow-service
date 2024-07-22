import { IWorkflow, IWorkflowStep, IWorkflowTransition } from "../interfaces";

interface AddStepProps {
  id: string;
  actionId: string;
  nextStepId?: string;
  actionConfig?: any;
}

interface AddTransitionProps {
  fromStepId?: string;
  actionStatus?: string;
  toStepId?: string;
}

export class Workflow implements IWorkflow {
  private _id: string;
  private _steps: IWorkflowStep[] = [];
  private _transitions: IWorkflowTransition[] = [];

  constructor(id: string) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  get steps() {
    return this._steps;
  }

  get transitions() {
    return this._transitions;
  }

  addStep(props: AddStepProps): Step {
    const step = new Step({
      ...props,
      workflow: this,
    });
    this._steps.push(step);
    return step;
  }

  addTransition(props: AddTransitionProps) {
    const transition = new Transition({
      ...props,
      workflow: this,
    });
    this._transitions.push(transition);
    return transition;
  }

  getInitialStep() {
    const initialTransition = this._transitions.find(
      (e) => e.fromStepId === undefined
    );

    const initialStep = this._steps.find(
      (e) => e.id === initialTransition.toStepId
    );

    return initialStep;
  }
}

export class Step implements IWorkflowStep {
  private _id: string;
  private _actionId: string;
  private _nextStepId?: string;
  private _actionConfig?: any;
  private _workflow?: Workflow;

  constructor(props: AddStepProps & { workflow: Workflow }) {
    this._id = props.id;
    this._actionId = props.actionId;
    this._nextStepId = props.nextStepId;
    this._actionConfig = props.actionConfig;
    this._workflow = props.workflow;
  }

  get id() {
    return this._id;
  }

  get actionId() {
    return this._actionId;
  }

  get nextStepId() {
    return this._nextStepId;
  }

  get actionConfig() {
    return this._actionConfig;
  }

  on(status: string, transitionTo?: string) {
    this._workflow.addTransition({
      fromStepId: this.id,
      actionStatus: status,
      toStepId: transitionTo,
    });
  }
}

export class Transition implements IWorkflowTransition {
  private _fromStepId: string;
  private _actionStatus: string;
  private _toStepId: string | undefined;

  constructor(props: AddTransitionProps & { workflow: Workflow }) {
    this._actionStatus = props.actionStatus;
    this._fromStepId = props.fromStepId;
    this._toStepId = props.toStepId;
  }

  get fromStepId() {
    return this._fromStepId;
  }

  get actionStatus() {
    return this._actionStatus;
  }

  get toStepId() {
    return this._toStepId;
  }
}
