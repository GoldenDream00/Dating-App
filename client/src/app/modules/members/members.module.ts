import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';


@NgModule({
  declarations: [
    MemberListComponent,
    MemberDetailComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MemberDetailComponent,
    MemberListComponent
  ]
})
export class MembersModule { }
