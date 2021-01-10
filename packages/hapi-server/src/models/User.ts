import Objection from "objection";

class Model extends Objection.Model {
  id?: string;
  username?: string;
  password?: string;

  static tableName = "users";

  // static relationMappings = {
  //   children: {
  //     relation: o.Model.HasManyRelation,
  //     modelClass: Patient,
  //     join: {
  //       from: "persons.id",
  //       to: "persons.parentId",
  //     },
  //   },
  // };
}

export { Model };
