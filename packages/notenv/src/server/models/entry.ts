import * as Objection from "objection";
import { Cluster, Environment, Name, Namespace, Service, Value } from ".";

class Entry extends Objection.Model {
  static tableName = "entries";

  static relationshipMappings(): unknown {
    return {
      cluster: {
        relation: Objection.Model.BelongsToOneRelation,
        modelClass: Cluster,
        join: {
          from: "entries.cluster_id",
          to: "clusters.id",
        },
      },

      environment: {
        relation: Objection.Model.BelongsToOneRelation,
        modelClass: Environment,
        join: {
          from: "entries.environment_id",
          to: "environments.id",
        },
      },

      name: {
        relation: Objection.Model.BelongsToOneRelation,
        modelClass: Name,
        join: {
          from: "entries.name_id",
          to: "names.id",
        },
      },

      namespace: {
        relation: Objection.Model.BelongsToOneRelation,
        modelClass: Namespace,
        join: {
          from: "entries.namespace_id",
          to: "namespaces.id",
        },
      },

      service: {
        relation: Objection.Model.BelongsToOneRelation,
        modelClass: Service,
        join: {
          from: "entries.service_id",
          to: "services.id",
        },
      },

      value: {
        relation: Objection.Model.BelongsToOneRelation,
        modelClass: Value,
        join: {
          from: "entries.value_id",
          to: "values.id",
        },
      },
    };
  }
}

export { Entry };
