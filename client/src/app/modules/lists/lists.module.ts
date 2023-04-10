import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListsComponent } from './lists.component';



@NgModule({
  declarations: [
    ListsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ListsComponent
  ]
})
export class ListsModule { }
