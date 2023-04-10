import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/account-data/account.service';
import { User } from './services/account-data/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating App';
  users: any;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');

    if (userString) {
      const user: User = JSON.parse(userString);
      this.accountService.setCurrentUser(user);
    }

  }

}
