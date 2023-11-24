import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { InventoryComponent } from '../pages/inventory/inventory.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';

const inventoryRoutes: Routes = [
  {
    path: '',
    component: InventoryComponent,
  },
];

@NgModule({
  declarations: [InventoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(inventoryRoutes),
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    DataTablesModule,
  ],
})
export class InventoryModule {}
