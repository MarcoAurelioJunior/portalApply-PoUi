import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashBoard {

  constructor() { }

  #http = inject(HttpClient)

  public getUpTime(): Observable<any>{
    return this.#http.get(environment.upTime)
  }

  
}
