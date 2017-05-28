/**
 * Created by Natanael on 22. 05. 2017.
 */
export class User {
  username: string;
  password: string;
  name: string;
  surname: string;
  email: string;
  location: string;
  birthDate: string;

  constructor(username: string, password: string, name?: string, surname?: string, email?: string, location?: string, birthDate?: string) {
    this.username = username;
    this.password = password;
  }
}
