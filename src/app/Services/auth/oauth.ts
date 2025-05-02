import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  //Exemplo de autenticação no protheus

  constructor() { }

  #http = inject(HttpClient)
  #router = inject(Router)
  
  public sendLogin(username: string, password: string): Observable<any> {
    let urlLogin: string = `${environment.auth}?grant_type=password&username=${username}&password=${password}`
    return this.#http.post<any>(urlLogin, null)
  }
}
