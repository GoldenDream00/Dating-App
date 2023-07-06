import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListsComponent } from './lists.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MemberCardComponent } from '../members/member-card/member-card.component';
import { MembersModule } from '../members/members.module';



@NgModule({
  declarations: [
    ListsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MembersModule
  ],
  exports: [
    ListsComponent
  ]
})
export class ListsModule { }
