import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  console.log('AuthGuard', route, state)
  let url = state.url
  let router = inject(Router)

  if(url !== '/login'){
    if(!sessionStorage.getItem('Login') ) {
      router.navigate(['/', 'login'])
      sessionStorage.setItem('url', url)
      return false;
    }
  }
  return true;
};
