import { Users } from "./_data";

export default class UsersRepo {

  static findAll(search?: string) {
    if (!search) return Users;
    const searchStr = search.toLocaleLowerCase() as string;
    return Users.filter((u) =>
      u.lastName.toLocaleLowerCase().includes(searchStr) ||
      u.firstName.toLocaleLowerCase().includes(searchStr)
    );
  }

  static findOne(user_id: number) {
    // return {dd: 10000000}
    return Users.find((u, i) => i == user_id);
  }
}
