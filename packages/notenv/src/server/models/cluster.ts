import * as Objection from "objection";
import { Entry } from "./entry";

class Cluster extends Objection.Model {
  static tableName = "clusters";

  static relationshipMappings(): unknown {
    return {
      entries: {
        relation: Objection.Model.HasManyRelation,
        modelClass: Entry,
        join: {
          from: "clusters.id",
          to: "entries.cluster_id",
        },
      },
    };
  }
}

export { Cluster };
