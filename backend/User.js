import { createUser, fetchUser } from "./database.js";
export class User {
  constructor(username, email, password, phone) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.id = this.generateId();
  }

  async registerUser() {
    return await createUser({
      id: this.id,
      username: this.username,
      email: this.email,
      phone: this.phone,
      password: this.password,
    });
  }
  generateId() {
    return Math.random().toString(36).substring(2, 20);
  }
}
