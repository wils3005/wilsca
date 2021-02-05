import { Model } from "objection";
import { knex } from "./knex";

class User extends Model {
  id: number;
  username: string;
  password: string;

  static tableName = "users";

  constructor() {
    super();
    this.id = 0;
    this.username = "";
    this.password = "";
  }
}

User.knex(knex);

export { User };
