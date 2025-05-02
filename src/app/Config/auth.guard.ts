import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AllUsers } from '../Services/users/AllUsers.service';

export const authGuard: CanActivateFn = (route, state) => {
  const profile = sessionStorage.getItem('profile')

  console.log('AuthGuard', route, state)
  let url = state.url
  let router = inject(Router)

  if(url !== '/login'){
    if(!sessionStorage.getItem('username') || !sessionStorage.getItem('password') ) {
      router.navigate(['/', 'login'])
      sessionStorage.setItem('url', url)
      return false;
    }
  }

  return true;
};
