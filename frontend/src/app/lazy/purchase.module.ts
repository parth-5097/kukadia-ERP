/**
 * @author [Parthiv Akbari]
 * @email [parthiv@rentechdigital.com]
 * @create date 2021-02-24 16:35:12
 * @modify date 2021-02-24 16:35:12
 * @desc [lazy --> purchase loading]
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PurchaseComponent } from '../pages/purchase/purchase.component';
import { InnerPurchaseComponent } from '../pages/inner-purchase/inner-purchase.component';
import { IntraStateBillComponent } from '../pages/intra-state-bill/intra-state-bill.component';
import { ImportBillComponent } from '../pages/import-bill/import-bill.component';
import { LocalBillComponent } from '../pages/local-bill/local-bill.component';
import { PaybillComponent } from '../pages/paybill/paybill.component';
import { VenderListComponent } from '../pages/vender-list/vender-list.component';
import { DataTablesModule } from 'angular-datatables';
import { PurchaseOrderComponent } from '../pages/purchase-order/purchase-order.component';

const purchaseRoutes: Routes = [
  {
    path: '',
    component: PurchaseComponent,
  },
  {
    path: 'vendor-list',
    component: VenderListComponent,
  },
  {
    path: 'local-bills',
    component: LocalBillComponent,
  },
  {
    path: 'intra-state-bills',
    component: IntraStateBillComponent,
  },
  {
    path: 'import-bills',
    component: ImportBillComponent,
  },
  {
    path: 'pay-bills',
    component: PaybillComponent,
  },
  {
    path: 'purchase-order',
    component: PurchaseOrderComponent,
  },
];

@NgModule({
  declarations: [
    PurchaseComponent,
    InnerPurchaseComponent,
    IntraStateBillComponent,
    ImportBillComponent,
    LocalBillComponent,
    PaybillComponent,
    VenderListComponent,
    PurchaseOrderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(purchaseRoutes),
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
  ],
})
export class PurchaseModule {}
