import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { MemberCardComponent } from './member-card/member-card.component';


@NgModule({
  declarations: [
    MemberListComponent,
    MemberDetailComponent,
    MemberCardComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MemberDetailComponent,
    MemberListComponent,
  ]
})
export class MembersModule { }
