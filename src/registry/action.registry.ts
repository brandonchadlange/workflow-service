import { IAction, IActionRegistry } from "../interfaces";

export class ActionRegistry implements IActionRegistry {
  private _store = new Map<string, IAction>();

  add(action: IAction) {
    this._store.set(action.id, action);
  }

  findAll(): IAction[] {
    const actions = Array.from(this._store.values());
    return actions;
  }
}
