import * as Objection from "objection";
import { Entry } from "./entry";

class Value extends Objection.Model {
  static tableName = "values";

  static relationshipMappings(): unknown {
    return {
      entries: {
        relation: Objection.Model.HasManyRelation,
        modelClass: Entry,
        join: {
          from: "values.id",
          to: "entries.value_id",
        },
      },
    };
  }
}

export { Value };
