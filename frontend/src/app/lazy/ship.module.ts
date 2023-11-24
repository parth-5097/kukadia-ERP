import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShipComponent } from '../pages/ship/ship.component';
import { NewshipComponent } from '../pages/newship/newship.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ShipComponent,
  },
  {
    path: 'new-ship',
    component: NewshipComponent,
  },
];

@NgModule({
  declarations: [ShipComponent, NewshipComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
  ],
})
export class ShipModule {}
