import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './clients.component';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: null,
    },
    children: [
      {
        path: '',
        data: {
          breadcrumb: null,
        },
        component: ClientsComponent,
      },
      {
        path: ':id',
        data: {
          breadcrumb: 'Client Detail',
        },
        loadChildren: () =>
          import('../client/client.routing.module').then((m) => m.ClientModule),
        resolve: {
          client: ClientService,
        },
      },
    ],
  },
];

import { NgModule } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class ClientsRoutingModule {}
