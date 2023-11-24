/**
 * @author [Parthiv Akbari]
 * @email [parthiv@rentechdigital.com]
 * @create date 2021-02-24 16:35:36
 * @modify date 2021-02-24 16:35:36
 * @desc [lazy --> profile loading]
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from '../pages/profile/profile.component';
import { EditProfileComponent } from '../pages/edit-profile/edit-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const profileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
  },
  {
    path: 'edit',
    component: EditProfileComponent,
  },
];

@NgModule({
  declarations: [ProfileComponent, EditProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(profileRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProfileModule {}
