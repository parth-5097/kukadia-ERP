import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CompanySettingsComponent } from '../pages/company-settings/company-settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const companyRoutes: Routes = [
  {
    path: '',
    component: CompanySettingsComponent,
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('./edit-company.module')
        .then((m) => m.EditCompanyModule)
        .catch((err) => console.error(err)),
  },
];

@NgModule({
  declarations: [CompanySettingsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(companyRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CompanyModule {}
