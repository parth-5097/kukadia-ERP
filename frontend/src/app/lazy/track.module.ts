import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TrackComponent } from '../pages/track/track.component';
import { MessageComponent } from '../pages/message/message.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: TrackComponent,
  },
  {
    path: 'message',
    component: MessageComponent,
  },
];

@NgModule({
  declarations: [TrackComponent, MessageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
  ],
})
export class TrackModule {}
