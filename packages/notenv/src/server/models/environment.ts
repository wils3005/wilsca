import * as Objection from "objection";
import { Entry } from "./entry";

class Environment extends Objection.Model {
  static tableName = "environments";

  static relationshipMappings(): unknown {
    return {
      entries: {
        relation: Objection.Model.HasManyRelation,
        modelClass: Entry,
        join: {
          from: "environments.id",
          to: "entries.environment_id",
        },
      },
    };
  }
}

export { Environment };
