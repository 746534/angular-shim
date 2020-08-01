import { AboutComponent } from './about/about.component';
import { AdminUserComponent } from './admin/user/user.component';
import { SearchComponent } from './search/search.component';
import { AdminComponent } from './admin/admin.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: null,
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'clients',
        pathMatch: 'full',
        data: {
          breadcrumb: null,
        },
      },
      {
        path: 'clients',
        data: {
          breadcrumb: 'Clients',
        },
        loadChildren: () =>
          import('./clients/clients.routing.module').then(
            (m) => m.ClientsRoutingModule
          ),
      },
      {
        path: 'admins',
        data: {
          breadcrumb: 'Admins',
        },
        children: [
          {
            path: '',
            data: {
              breadcrumb: null,
            },
            component: AdminComponent,
          },
          {
            path: ':id',
            component: AdminUserComponent,
            data: {
              breadcrumb: 'Crete New Admin',
            },
            resolve: {
              admin: AdminService,
            },
          },
        ],
      },
      {
        path: 'search',
        data: {
          breadcrumb: 'Search',
        },
        component: SearchComponent,
      },
      {
        path: 'about',
        data: {
          breadcrumb: 'About',
        },
        component: AboutComponent,
      },
      {
        path: 'roles',
        data: {
          breadcrumb: 'Roles',
        },
        component: RolesComponent,
      },
    ],
  },
];

import { NgModule } from '@angular/core';
import { RolesComponent } from '../components/roles/roles.component';
import { AuthGuard } from '../services/auth.guard';
import { AdminService } from '../services/admin.service';

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class PagesRoutingModule {}
