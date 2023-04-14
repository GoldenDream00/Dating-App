import { Component, OnInit } from '@angular/core';
import { MembersService } from 'src/app/services/members-data/members.service';
import { Member } from 'src/app/services/members-data/models/member';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit{
  members: Member[] = [];

  constructor(private memberService: MembersService) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers().subscribe({
      next: (members) => this.members = members
    })
  }

}
