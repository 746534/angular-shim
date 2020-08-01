import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TabMenuModule } from 'primeng/tabmenu';
import { ComponentModule } from '../components/component.module';

import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { SearchComponent } from './search/search.component';
import { AboutComponent } from './about/about.component';
// import { ClientUserComponent } from './client/user/user.component';
import { AdminUserComponent } from './admin/user/user.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientComponent } from './client/client.component';
import { DetailComponent } from './client/detail/detail.component';
import { UsersComponent } from './client/users/users.component';
import { ClientUserComponent } from './client/user/user.component';

@NgModule({
  imports: [CommonModule, TabMenuModule, ComponentModule],
  exports: [
    ClientsComponent,
    DetailComponent,
    ClientComponent,
    UsersComponent,
    AdminComponent,
    SearchComponent,
    AboutComponent,
    ClientUserComponent,
    AdminUserComponent,
    LoginComponent,
    AboutComponent,
  ],
  declarations: [
    ClientsComponent,
    DetailComponent,
    ClientComponent,
    UsersComponent,
    AdminComponent,
    SearchComponent,
    AboutComponent,
    ClientUserComponent,
    AdminUserComponent,
    LoginComponent,
    AboutComponent,
  ],
  providers: [],
})
export class PagesModule {}
