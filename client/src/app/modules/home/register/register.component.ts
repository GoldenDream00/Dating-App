import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  formGroup: FormGroup = new FormGroup({});
  maxDate: Date = new Date();
  validationErrors!: string[];

  get username() {
    return this.formGroup.get('username');
  }

  get password() {
    return this.formGroup.get('password');
  }

  get confirmPassword() {
    return this.formGroup.get('confirmPassword');
  }
  
  get gender() {
    return this.formGroup.get('gender');
  }
  
  get knownAs() {
    return this.formGroup.get('knownAs');
  }

  get dateOfBirth() {
    return this.formGroup.get('dateOfBirth');
  }

  get city() {
    return this.formGroup.get('city');
  }

  get country() {
    return this.formGroup.get('country');
  }

  constructor(private formBuilder: FormBuilder, 
    private accountService: AccountService, 
    private toastr: ToastrService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.initializeFormGroup();    
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  initializeFormGroup() {
    this.formGroup = this.formBuilder.group({
      gender: [{value: 'male', disabled:false}, Validators.required],
      username: [{value: null, disabled:false}, Validators.required],
      knownAs: [{value: null, disabled:false}, Validators.required],
      dateOfBirth: [{value: null, disabled:false}, Validators.required],
      city: [{value: null, disabled:false}, Validators.required],
      country: [{value: null, disabled:false}, Validators.required],
      password: [{value: null, disabled:false}, [Validators.required, Validators.minLength(8)]],
      confirmPassword : [{value: null, disabled:false}, [Validators.required, this.comparePasswords()]],
    });
    this.password?.valueChanges.subscribe({
      next: () => this.formGroup.get('confirmPassword')?.updateValueAndValidity()
    })   
  }

  register() {
    const dob = this.getDateOnly(this.dateOfBirth?.value);
    const values = {...this.formGroup.value, dateOfBirth: dob};
    this.accountService.register(values).subscribe({
      next: () => this.router.navigateByUrl('/members'),
      error: (error) => {
        this.validationErrors = error;
      }
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

  private getDateOnly(dob: string | undefined) {
    if (!dob) return;
    let newDob = new Date(dob);
    return new Date(newDob.setMinutes(newDob.getMinutes()-newDob.getTimezoneOffset()))
    .toISOString().slice(0,10);
  }
}
 

