/**
 * @author [Parthiv Akbari]
 * @email [parthiv@rentechdigital.com]
 * @create date 2021-02-24 16:34:07
 * @modify date 2021-02-24 16:34:07
 * @desc [Lazy --> invoice loading]
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceComponent } from '../pages/invoice/invoice.component';
import { LocalInvoiceComponent } from '../pages/local-invoice/local-invoice.component';
import { IntraStateInvoiceComponent } from '../pages/intra-state-invoice/intra-state-invoice.component';
import { ExportInvoiceComponent } from '../pages/export-invoice/export-invoice.component';
import { CustomerListComponent } from '../pages/customer-list/customer-list.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SalesOrderComponent } from '../pages/sales-order/sales-order.component';
import { CreateInvoiceComponent } from '../pages/create-invoice/create-invoice.component';
import { InvoiceEditComponent } from '../pages/invoice-edit/invoice-edit.component';
import { SalesGuard } from '../guard/sales.guard';

const invoiceRoutes: Routes = [
  {
    path: '',
    component: InvoiceComponent,
  },
  {
    path: 'edit/:id',
    component: InvoiceEditComponent,
  },
  {
    path: 'create',
    component: CreateInvoiceComponent,
  },
  {
    path: 'customer-list',
    component: CustomerListComponent,
  },
  {
    path: 'local-invoice',
    component: LocalInvoiceComponent,
  },
  {
    path: 'intra-state-invoice',
    component: IntraStateInvoiceComponent,
  },
  {
    path: 'export-invoice',
    component: ExportInvoiceComponent,
  },
  {
    path: 'sales-order',
    component: SalesOrderComponent,
    canActivate: [SalesGuard],
  },
];

@NgModule({
  declarations: [
    InvoiceComponent,
    LocalInvoiceComponent,
    IntraStateInvoiceComponent,
    ExportInvoiceComponent,
    CustomerListComponent,
    SalesOrderComponent,
    InvoiceEditComponent,
    CreateInvoiceComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(invoiceRoutes),
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
  ],
})
export class InvoiceModule {}
