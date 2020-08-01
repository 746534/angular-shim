import { UserService } from './../../services/user.service';
import { DetailComponent } from './detail/detail.component';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { ClientComponent } from './client.component';
import { ClientUserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: null,
    },
    component: ClientComponent,
    children: [
      {
        path: '',
        data: {
          breadcrumb: null,
        },
        redirectTo: 'detail',
      },
      {
        path: 'detail',
        data: {
          breadcrumb: 'Detail',
        },
        component: DetailComponent,
      },
      {
        path: 'users',
        data: {
          breadcrumb: 'Users',
        },
        children: [
          {
            path: '',
            data: {
              breadcrumb: null,
            },
            children: [
              {
                path: '',
                component: UsersComponent,
                data: {
                  breadcrumb: null,
                },
              },
              {
                path: ':id',
                data: {
                  breadcrumb: 'User Detail',
                },
                component: ClientUserComponent,
                resolve: {
                  user: UserService,
                },
              },
            ],
          },
        ],
      },
    ],
  },
];

import { NgModule } from '@angular/core';

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class ClientModule {}
