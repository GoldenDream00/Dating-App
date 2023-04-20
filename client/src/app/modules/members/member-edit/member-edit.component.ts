import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { AccountService } from 'src/app/services/account-data/account.service';
import { User } from 'src/app/services/account-data/models/user';
import { MembersService } from 'src/app/services/members-data/members.service';
import { Member } from 'src/app/services/members-data/models/member';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm')
  editForm!: NgForm;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotication($event: any) {
    if (this.formGroup.dirty) {
      $event.returnValue = true;
    }
  }

  member!: Member;
  user!: User | null;
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private accountService: AccountService, private memberService: MembersService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => this.user = user,
    })
  }

  ngOnInit() {
    this.loadMember();
  }

  initializeFormGroup() {
    return this.formBuilder.group(this.member)
  }

  loadMember() {
    if (!this.user) return;
    this.memberService.getMember(this.user.username).subscribe({
      next: member => {
        if (member) {
          this.member = member;
          this.formGroup = this.initializeFormGroup();
        }
      }
    })
  }

  updateMember() {
    this.member = this.formGroup.value; 
    if (this.member !== this.formGroup.value){
      this.member = this.formGroup.value;
      this.memberService.updateMember(this.member).subscribe({
        next: _ => {
          this.toastr.success("Profile Updated!")
          this.formGroup.reset(this.member);
        }
      })
    } else this.toastr.error("Nothing Changed!")
  }
}
