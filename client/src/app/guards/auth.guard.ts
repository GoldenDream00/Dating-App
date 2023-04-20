import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { map } from 'rxjs';
import { AccountService } from '../services/account-data/account.service';
import { ToastrService } from 'ngx-toastr';

export const isLoggedIn: CanActivateFn = () => {
  const accountService = inject(AccountService)
  const toastr = inject(ToastrService) 

    return accountService.currentUser$.pipe(
      map(user => {
        if(user) return true;
        else {
          toastr.error("You must be logged to do this!");
          return false;
        }
      }) 
    ); 
}
