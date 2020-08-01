import { User } from './user';
export class Client {
  uid: string;
  sapId: string;
  name: string;
  shortName?: string;
  enabled: boolean = true;
  address?: string;
  email?: string;
  users?: User[];

  constructor(init: Partial<Client>) {
    Object.assign(this, init);
    //TODO 根据情况将服务端的 contact 信息转化为 email或address
  }

  hasKeyWord(key: string) {
    return (
      this.uid.includes(key) ||
      this.sapId.includes(key) ||
      this.name.includes(key) ||
      this.shortName?.includes(key) ||
      this.email?.includes(key) ||
      this.address?.includes(key)
    );
  }
}
