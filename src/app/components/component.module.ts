import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginFormComponent } from './login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BreadCrumbsComponent } from './bread-crumbs/bread-crumbs.component';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { RolesPickComponent } from './roles-pick/roles-pick.component';
import { PickListModule } from 'primeng/picklist';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormComponent } from './form/form.component';
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';
import { NavComponent } from './nav/nav.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { RolesComponent } from './roles/roles.component';
import { FormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatGridListModule,
    SelectButtonModule,
    TableModule,
    PickListModule,
    ButtonModule,
    InputTextModule,
    TabViewModule,
    CheckboxModule,
    TabMenuModule,
    FormsModule,
    BreadcrumbModule,
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatGridListModule,
    SelectButtonModule,
    TableModule,
    PickListModule,
    ButtonModule,
    InputTextModule,
    TabViewModule,
    CheckboxModule,
    TabMenuModule,
    TableComponent,
    LoginFormComponent,
    BreadCrumbsComponent,
    RolesPickComponent,
    FormComponent,
    NavComponent,
    RolesComponent,
    FormsModule,
  ],
  declarations: [
    LoginFormComponent,
    BreadCrumbsComponent,
    TableComponent,
    RolesPickComponent,
    FormComponent,
    NavComponent,
    RolesComponent,
  ],
  providers: [],
})
export class ComponentModule {}
