export type EntityWithId<Entity> = { id: string } & Entity;

export interface ICollection<DataType> {
  add(entity: EntityWithId<DataType>);
  findAll(): DataType[];
  findById(id: string): DataType;
}
