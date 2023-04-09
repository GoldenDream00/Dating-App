import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AccountService } from '../services/account-data/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../services/account-data/models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  model: any = {}

  navForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(public accountService: AccountService) {}

  ngOnInit(): void {

  }

  login(){
    this.model.password = this.navForm.get("password")?.value;
    this.model.username = this.navForm.get("username")?.value;
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => console.log(error.error)
    })
  }

  logout() {
    this.accountService.logout();
  }

}
