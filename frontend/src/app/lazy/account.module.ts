/**
 * @author [Parthiv Akbari]
 * @email [parthiv@rentechdigital.com]
 * @create date 2021-02-24 16:36:06
 * @modify date 2021-02-24 16:36:06
 * @desc [lazy --> account loading]
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChartOfAccountComponent } from '../pages/chart-of-account/chart-of-account.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoanAccountComponent } from '../pages/loan-account/loan-account.component';

const accountRoutes: Routes = [
  {
    path: 'chart-of-account',
    component: ChartOfAccountComponent,
  },
  {
    path: 'loan-account',
    component: LoanAccountComponent,
  },
];

@NgModule({
  declarations: [ChartOfAccountComponent, LoanAccountComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(accountRoutes),
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
  ],
})
export class AccountModule {}
