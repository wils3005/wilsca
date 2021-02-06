import { Model } from "objection";

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

export default User;
