import Objection from "objection";
import { knex } from ".";

Objection.Model.knex(knex);

class User extends Objection.Model {
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

export default User;
