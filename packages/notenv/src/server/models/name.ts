import * as Objection from "objection";
import { Entry } from "./entry";

class Name extends Objection.Model {
  static tableName = "names";

  static relationshipMappings(): unknown {
    return {
      entries: {
        relation: Objection.Model.HasManyRelation,
        modelClass: Entry,
        join: {
          from: "names.id",
          to: "entries.name_id",
        },
      },
    };
  }
}

export { Name };
