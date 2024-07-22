import { EntityWithId, ICollection } from "../interfaces/collection";

export class Collection<Type> implements ICollection<Type> {
  private _store = new Map<string, EntityWithId<Type>>();

  add(entity: EntityWithId<Type>) {
    this._store.set(entity.id, entity);
  }

  findAll(): Type[] {
    return Array.from(this._store.values());
  }

  findById(id: string): EntityWithId<Type> {
    return this._store.get(id);
  }
}
