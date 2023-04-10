import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account-data/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  @Output()
  cancelRegister = new EventEmitter();

  model:any ={}
  formGroup: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.formGroup = this.initializeFormGroup();
  }

  initializeFormGroup() {
    return this.formBuilder.group({
      username: [{value: null, disabled:false}],
      password: [{value: null, disabled:false}]
    })
  }

  register() {
    this.model.username = this.formGroup.get("username")?.value;
    this.model.password = this.formGroup.get("password")?.value;
    this.accountService.register(this.model).subscribe({
      next: (response) => {
        console.log(response);
        this.cancel();
      },
      error: (error) => this.toastr.error(error.error)
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
