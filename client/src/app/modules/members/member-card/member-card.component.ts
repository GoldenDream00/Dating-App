import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MembersService } from 'src/app/services/members-data/members.service';
import { Member } from 'src/app/services/members-data/models/member';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent {
  @Input()
  set member(member: Member) {
    if (member) {
      this._member = member;
    }
  }

  get member() {
    return this._member;
  }

  _member!: Member;

  constructor(private membersService: MembersService, private toastr: ToastrService) { }

  addLike(member: Member) {
    this.membersService.addLike(member.userName).subscribe({
      next: () => this.toastr.success("You've liked " + member.knownAs)
    })
  }

}
