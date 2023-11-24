import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BranchComponent } from '../pages/branch/branch.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

const branchRoute: Routes = [
  {
    path: '',
    component: BranchComponent,
  },
];

@NgModule({
  declarations: [BranchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(branchRoute),
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
  ],
})
export class BranchModule {}
