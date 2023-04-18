import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MembersService } from 'src/app/services/members-data/members.service';
import { Member } from 'src/app/services/members-data/models/member';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member!: Member;
  hasSocials = false;

  constructor(private memberService: MembersService, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    const username = this.route.snapshot.paramMap.get('username');
    if(!username) return
    this.memberService.getMember(username).subscribe({
      next: member => {
        this.member = member;
        this.hasSocials = !!member.instagramUrl || !!member.linkedInUrl || !!member.twitterUrl || !!member.facebookUrl;

      }
    })
  }
  
}
