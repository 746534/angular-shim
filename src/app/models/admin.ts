export class Admin {
         uid: string;
         sapId: string;
         username: string;
         password: string;
         enabled: boolean = true;
         constructor(init: Partial<Admin>) {
           Object.assign(this, init);
         }

       }
