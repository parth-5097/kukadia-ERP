/**
 * @author [Parthiv Akbari]
 * @email [parthiv@rentechdigital.com]
 * @create date 2021-02-24 16:44:55
 * @modify date 2021-02-24 16:44:55
 * @desc [lazy --> transaction loading]
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TransactionComponent } from '../pages/transaction/transaction.component';
import { ReceivablePaymentComponent } from '../pages/receivable-payment/receivable-payment.component';
import { FundsTransferComponent } from '../pages/funds-transfer/funds-transfer.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const transactionRoutes: Routes = [
  {
    path: '',
    component: TransactionComponent,
  },
  {
    path: 'funds-transfer',
    component: FundsTransferComponent,
  },
  {
    path: 'receive-payment',
    component: ReceivablePaymentComponent,
  },
];

@NgModule({
  declarations: [
    TransactionComponent,
    ReceivablePaymentComponent,
    FundsTransferComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(transactionRoutes),
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
  ],
})
export class TransactionModule {}
