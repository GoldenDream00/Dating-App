import { Component, Input } from '@angular/core';
import { Member } from 'src/app/services/members-data/models/member';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent {
  @Input()
  set member(member: Member){
   if (member) {
     this._member = member;
     console.log(this._member);
   }
  }
  get member(){
   return this._member;
  }

  _member!: Member;

  constructor() {
    this.imprime();
  }

  imprime(){
    
  }

  
  
}
