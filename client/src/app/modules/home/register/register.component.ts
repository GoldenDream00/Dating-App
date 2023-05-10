import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
    this.password?.valueChanges.subscribe({
      next: () => this.formGroup.get('confirmPassword')?.updateValueAndValidity()
    })
  }

  initializeFormGroup() {
    return this.formBuilder.group({
      username: [{value: null, disabled:false}, Validators.required],
      password: [{value: null, disabled:false}, [Validators.required, Validators.minLength(8)]],
      confirmPassword : [{value: null, disabled:false}, [Validators.required, this.comparePasswords()]],
    })   
  }

  get username() {
    return this.formGroup.get('username');
  }

  get password() {
    return this.formGroup.get('password');
  }

  get confirmPassword() {
    return this.formGroup.get('confirmPassword');
  }

  register() {
    this.model.username = this.username?.value;
    this.model.password = this.password?.value;
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

  comparePasswords(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const equals = this.password?.value == control.value;
      return equals ? null : {notMatching: true};
    };    
  }
}
 

