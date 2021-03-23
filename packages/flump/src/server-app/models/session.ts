import * as Objection from "objection";

class Session extends Objection.Model {
  static tableName = "sessions";
}

export { Session };
