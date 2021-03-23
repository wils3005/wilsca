import * as Objection from "objection";
import { Entry } from "./entry";

class Service extends Objection.Model {
  static tableName = "services";

  static relationshipMappings(): unknown {
    return {
      entries: {
        relation: Objection.Model.HasManyRelation,
        modelClass: Entry,
        join: {
          from: "services.id",
          to: "entries.service_id",
        },
      },
    };
  }
}

export { Service };
