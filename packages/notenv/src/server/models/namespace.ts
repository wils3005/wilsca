import * as Objection from "objection";
import { Entry } from "./entry";

class Namespace extends Objection.Model {
  static tableName = "namespaces";

  static relationshipMappings(): unknown {
    return {
      entries: {
        relation: Objection.Model.HasManyRelation,
        modelClass: Entry,
        join: {
          from: "namespaces.id",
          to: "entries.namespace_id",
        },
      },
    };
  }
}

export { Namespace };
