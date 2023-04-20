import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account-data/account.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
  model: any = {};
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, public accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.formGroup = this.initializeFormGroup();
  }

  initializeFormGroup() {
    return this.formBuilder.group({
      username: [{value: null, disabled:false}],
      password: [{value: null, disabled:false}]
    })
  }

  login(){
    this.model.password = this.formGroup.get("password")?.value;
    this.model.username = this.formGroup.get("username")?.value;
    this.accountService.login(this.model).subscribe({
      next: _ => this.router.navigateByUrl('/members')
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/')
  }

}
