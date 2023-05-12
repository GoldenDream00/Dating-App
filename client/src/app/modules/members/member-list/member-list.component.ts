import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AccountService } from 'src/app/services/account-data/account.service';
import { User } from 'src/app/services/account-data/models/user';
import { MembersService } from 'src/app/services/members-data/members.service';
import { Member } from 'src/app/services/members-data/models/member';
import { Pagination } from 'src/app/services/members-data/models/pagination';
import { UserParams } from 'src/app/services/members-data/models/userParams';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit{
  members: Member[] = [];
  pagination!: Pagination;
  userParams!: UserParams;
  user!: User;
  genderList = [
    {
      value: 'male',
      display: 'Males'
    },
    {
      value: 'female',
      display: 'Females'
    }
  ];

  constructor(private memberService: MembersService, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) {
          this.userParams = new UserParams(user);
          this.user = user;
        }
      }
    })
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    if (this.userParams){
      this.memberService.getMembers(this.userParams).subscribe({
        next: (response) => {
          if (response.result && response.pagination) {
            this.members = response.result;
            this.pagination = response.pagination;
          }            
        }     
      })
    }
  }

  resetFilters () {
    if (this.user) {
      this.userParams = new UserParams(this.user);
      this.loadMembers();
    }
  }

  pageChanged(event: any) {
    if (this.userParams.pageNumber !== event.page) {
      this.userParams.pageNumber = event.page;
      this.loadMembers();
    } 
  } 
}
