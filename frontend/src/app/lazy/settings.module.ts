/**
 * @author [Parthiv Akbari]
 * @email [parthiv@rentechdigital.com]
 * @create date 2021-02-24 16:34:34
 * @modify date 2021-02-24 16:34:34
 * @desc [lazy --> settings loading]
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from '../pages/settings/settings.component';
import { ItemListComponent } from '../pages/item-list/item-list.component';
import { EmployeeListComponent } from '../pages/employee-list/employee-list.component';
import { TermListComponent } from '../pages/term-list/term-list.component';
import { DataTablesModule } from 'angular-datatables';

const settingsRoutes: Routes = [
  {
    path: '',
    component: SettingsComponent,
  },
  {
    path: 'company',
    loadChildren: () =>
      import('./company.module')
        .then((m) => m.CompanyModule)
        .catch((err) => console.error(err)),
  },
  {
    path: 'item-list',
    component: ItemListComponent,
  },
  {
    path: 'term-list',
    component: TermListComponent,
  },
  {
    path: 'employee-list',
    component: EmployeeListComponent,
  },
];

@NgModule({
  declarations: [
    SettingsComponent,
    ItemListComponent,
    EmployeeListComponent,
    TermListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(settingsRoutes),
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
  ],
})
export class SettingsModule {}
