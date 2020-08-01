export class Role {
         name: string;
         deletable?: boolean;
         constructor(init: Partial<Role>) {
           Object.assign(this, init);
         }
       }
