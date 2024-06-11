class User {
  email: string;
  name: string;
  password: string;
  phone: number;
  constructor(name: string, email: string, password: string, phone: number) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
  }
}

class Login {
  email: string;
  password: string;
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export { User, Login };
