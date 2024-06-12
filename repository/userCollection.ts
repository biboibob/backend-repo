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
  name: string;
  phone: number;
  id: string;
  constructor(id:string, email: string, name: string, phone: number) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.phone = phone;
  }
}

export { User, Login };
