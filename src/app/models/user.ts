import { Role } from './role';

export class User {
  uid: string;
  sapId: string;
  name: string;
  username: string;
  password: string;
  clientId: string;
  enabled: boolean = true;
  address?: string;
  email?: string;
  roles?: Role[];

  constructor(init: Partial<User>) {
    Object.assign(this, init);
  }
  hasKeyWord(key: string) {
    return (
      this.uid.includes(key) ||
      this.sapId.includes(key) ||
      this.name.includes(key) ||
      this.username.includes(key) ||
      this.email.includes(key) ||
      this.address.includes(key)
    );
  }
}
