import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EditCompanySettingsComponent } from '../pages/edit-company-settings/edit-company-settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const editCompanyRoutes: Routes = [
  {
    path: '',
    component: EditCompanySettingsComponent,
  },
];

@NgModule({
  declarations: [EditCompanySettingsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(editCompanyRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class EditCompanyModule {}
