import { Objection } from "@wilsjs/dependencies";
import knex from "./knex";

Objection.Model.knex(knex);

interface User {
  id: string;
  username: string;
  password: string;
}

// const zodObject = z.object({
//   id: z.string(),
//   username: z.string(),
//   password: z.string()
// });

class User extends Objection.Model {
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
